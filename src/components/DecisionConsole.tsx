'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Terminal, Activity } from 'lucide-react';
import { useMatch } from '@/context/MatchContext';


export const DecisionConsole = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { state, submitTacticalMove, setManualInput } = useMatch();

  const handleChipClick = (chip: string) => {
    setManualInput(state.manualInput ? `${state.manualInput}, ${chip}` : chip);
    inputRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!state.manualInput || state.loading) return;
    await submitTacticalMove(state.manualInput);
  };

  return (
    <div className="glass-panel neon-border rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <Terminal size={20} className="text-blue-400" />
        </div>
        <div>
          <h3 className="font-black tracking-widest text-sm uppercase">Command Console</h3>
          <p className="text-[10px] text-zinc-500 font-mono">TACTICAL INPUT SYSTEM V2.4</p>
        </div>
      </div>

      <div className="relative group">
        <input 
          ref={inputRef}
          type="text"
          value={state.manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder={state.loading ? "Analyzing..." : "Suggest your tactical move..."}
          className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-6 pr-24 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-zinc-700 disabled:opacity-50"
          disabled={state.loading}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <button className="p-2 text-zinc-500 hover:text-cyan-400 transition-colors">
            <Mic size={18} />
          </button>
          <button 
            onClick={handleSubmit}
            className={`p-2 rounded-xl transition-all ${state.loading ? 'bg-zinc-800 text-zinc-500' : 'bg-cyan-500 text-black hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.5)]'}`}
            disabled={state.loading}
          >
            {state.loading ? <Activity size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {['Deep Mid-Wicket', 'Off-Spin Attack', 'Yorker Length', 'Slower Bouncer'].map((chip, i) => (
          <button 
            key={i} 
            onClick={() => handleChipClick(chip)}
            className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-all active:scale-95"
          >
            + {chip}
          </button>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-zinc-800/50">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Tactical Score</span>
          <span className="text-xl font-black text-cyan-400">IQ: {state.tacticalIQ}</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(state.tacticalIQ / 160) * 100}%` }}
            className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
          />
        </div>
        <p className="text-[10px] text-zinc-500 mt-2 text-center uppercase tracking-tighter">Your tactical accuracy is in the TOP 2%</p>
      </div>
    </div>
  );
};
