'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ShieldAlert, ChevronRight } from 'lucide-react';
import { useMatch } from '@/context/MatchContext';

export const AICoach = () => {
  const { state, setManualInput } = useMatch();
  const [showFeed, setShowFeed] = React.useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Coach Card */}
      <div className="glass-panel neon-border rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Brain size={80} className="text-cyan-400" />
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Brain size={20} className="text-cyan-400" />
          </div>
          <h3 className="font-black tracking-widest text-sm uppercase">AI Tactical Assistant</h3>
        </div>

        <div className="space-y-4">
          <motion.div 
            key={state.lastFeedback}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3 items-start"
          >
            <div className="w-1 h-12 bg-cyan-500 rounded-full shrink-0" />
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              "{state.lastFeedback}"
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <div className="flex items-center gap-2 mb-1 text-[10px] text-cyan-400 font-bold">
                <Zap size={12} />
                <span>CONFIDENCE</span>
              </div>
              <span className="text-xl font-black tracking-tighter">94%</span>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-3 border border-zinc-800">
              <div className="flex items-center gap-2 mb-1 text-[10px] text-orange-400 font-bold">
                <ShieldAlert size={12} />
                <span>RISK FACTOR</span>
              </div>
              <span className="text-xl font-black tracking-tighter">LOW</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setManualInput(state.lastFeedback)}
          className="w-full mt-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-xs font-black tracking-[0.2em] uppercase hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-95"
        >
          EXECUTE AI STRATEGY
        </button>
      </div>

      {/* Coach's Tactical Feed (Collapsible) */}
      <div className="glass-panel border-zinc-800 rounded-2xl p-4 flex flex-col transition-all duration-500">
        <button 
          onClick={() => setShowFeed(!showFeed)}
          className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex justify-between items-center w-full"
        >
          Coach's Tactical Feed
          <div className="flex items-center gap-2">
            <span className="text-[8px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">HISTORY</span>
            <ChevronRight className={`transition-transform duration-300 ${showFeed ? 'rotate-90' : ''}`} size={14} />
          </div>
        </button>
        
        {showFeed && (
          <div className="mt-4 space-y-3 overflow-y-auto custom-scrollbar pr-2 max-h-[300px] animate-in fade-in slide-in-from-top-2">
            {state.coachSuggestions.map((suggestion, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setManualInput(suggestion)}
                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-white/10 transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span className="text-[8px] font-bold text-zinc-500 uppercase">Suggestion T-{i+1}</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-relaxed font-medium">
                  {suggestion}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

