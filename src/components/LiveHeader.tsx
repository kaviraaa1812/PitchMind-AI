'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Trophy } from 'lucide-react';
import { useMatch } from '@/context/MatchContext';


export const LiveHeader = () => {
  const { state, setActiveTeam } = useMatch();

  return (
    <div className="w-full glass-panel neon-border rounded-b-3xl px-8 py-4 flex items-center justify-between z-10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pr-6 border-r border-zinc-800">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center border border-zinc-700">
              <User size={20} className="text-zinc-400" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${state.rank === 'Gold' ? 'bg-yellow-500' : state.rank === 'Silver' ? 'bg-zinc-400' : 'bg-orange-700'}`}>
              <Trophy size={10} className="text-black" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Strategist</span>
            <span className={`text-xs font-black uppercase ${state.rank === 'Gold' ? 'text-yellow-500' : 'text-zinc-400'}`}>{state.rank} RANK</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full live-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <span className="text-red-500 font-bold tracking-widest text-sm">LIVE</span>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tighter neon-text">MI <span className="text-zinc-500">vs</span> CSK</h2>
          <span className="text-xs text-zinc-400 font-mono">WANKHEDE STADIUM, MUMBAI</span>
        </div>
      </div>

      <div 
        onClick={() => setActiveTeam(state.activeTeam === 'MI' ? 'CSK' : 'MI')}
        className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform group"
        title="Switch Team View"
      >
        <div className="text-4xl font-black tracking-widest flex gap-4 items-baseline group-hover:text-cyan-400 transition-colors">
          <span>{state.score}</span>
          <span className="text-lg text-zinc-400 font-medium">({state.overs})</span>
        </div>
        <div className="flex gap-4 text-xs font-bold text-cyan-400 tracking-wider mt-1 opacity-60 group-hover:opacity-100">
          <span>ACTIVE VIEW: {state.activeTeam}</span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 w-64">
        <div className="flex justify-between w-full text-[10px] font-bold tracking-tighter">
          <span className="text-blue-400">MI {state.winProb.mi}%</span>
          <span className="text-yellow-500">CSK {state.winProb.csk}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${state.winProb.mi}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          />
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${state.winProb.csk}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]" 
          />
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">MATCH MOMENTUM: MI RISING</span>
      </div>
    </div>
  );
};
