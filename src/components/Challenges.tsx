'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sword, Shield, Zap, Flame } from 'lucide-react';
import { matchSituations } from '@/data/matchData';

export const Challenges = () => {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-orange-500/20 rounded-lg">
          <Sword size={20} className="text-orange-400" />
        </div>
        <h3 className="font-black tracking-widest text-sm uppercase">Tactical Challenges</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {matchSituations.map((scenario) => (
          <motion.div 
            key={scenario.id}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500/30 transition-all flex justify-between items-center"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white">{scenario.title}</span>
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded ${
                  scenario.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {scenario.difficulty.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 max-w-[200px] leading-tight">
                {scenario.description}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((star) => (
                  <Flame key={star} size={12} className={star <= 2 ? 'text-orange-500' : 'text-zinc-800'} />
                ))}
              </div>
              <button className="px-4 py-1.5 bg-orange-500 text-black text-[10px] font-black tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                START
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-2xl bg-zinc-900/20 border border-zinc-800/50">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-zinc-500 uppercase">
          <Zap size={12} className="text-yellow-500" />
          <span>Daily Mission</span>
        </div>
        <p className="text-[11px] font-medium text-zinc-300">"Defeat CSK using only spin attack in middle overs."</p>
        <div className="mt-3 flex justify-between items-center text-[10px]">
          <span className="text-zinc-500">Reward: 500 XP</span>
          <span className="text-cyan-400 font-bold">20% COMPLETE</span>
        </div>
        <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
          <div className="w-[20%] h-full bg-cyan-500" />
        </div>
      </div>
    </div>
  );
};
