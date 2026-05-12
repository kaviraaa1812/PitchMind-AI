'use client';

import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { time: '17.2', type: 'WICKET', text: 'OUT! Ravindra Jadeja c Rohit b Bumrah. The yorker strikes again!' },
  { time: '17.1', type: 'RUNS', text: '1 run. Pushed towards long-on for a single.' },
  { time: '16.6', type: 'BOUNDARY', text: 'FOUR! Dhoni dances down and lofts it over extra cover.' },
  { time: '16.5', type: 'DOT', text: 'No run. Beaten by the slower ball.' },
];

export const CommentaryFeed = () => {
  return (
    <div className="w-full glass-panel border-t border-zinc-800 p-4 h-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 px-4 py-1 rounded-full text-[8px] font-black tracking-widest text-zinc-500 uppercase z-10">
        Live Commentary
      </div>
      
      <div className="flex flex-col gap-2 animate-scroll-up">
        {events.map((e, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-4 items-center whitespace-nowrap"
          >
            <span className="text-[10px] font-mono text-cyan-400 font-bold">[{e.time}]</span>
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
              e.type === 'WICKET' ? 'bg-red-500/20 text-red-500' : 
              e.type === 'BOUNDARY' ? 'bg-green-500/20 text-green-500' : 
              'bg-zinc-800 text-zinc-400'
            }`}>
              {e.type}
            </span>
            <span className="text-xs text-zinc-300 font-medium">{e.text}</span>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
