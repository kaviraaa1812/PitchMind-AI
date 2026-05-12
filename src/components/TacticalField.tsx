'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMatch } from '@/context/MatchContext';


export const initialFielders = [
  { id: 1, name: 'Slip 1', x: 200, y: 150, type: 'Aggressive' },
  { id: 2, name: 'Gully', x: 150, y: 180, type: 'Aggressive' },
  { id: 3, name: 'Point', x: 100, y: 300, type: 'Standard' },
  { id: 4, name: 'Cover', x: 150, y: 400, type: 'Standard' },
  { id: 5, name: 'Mid Off', x: 250, y: 500, type: 'Defensive' },
  { id: 6, name: 'Mid On', x: 450, y: 500, type: 'Defensive' },
  { id: 7, name: 'Mid Wicket', x: 550, y: 400, type: 'Standard' },
  { id: 8, name: 'Square Leg', x: 600, y: 300, type: 'Standard' },
  { id: 9, name: 'Fine Leg', x: 550, y: 180, type: 'Standard' },
];


export const TacticalField = () => {
  const [activeFielder, setActiveFielder] = useState<number | null>(null);
  const [selectedFielder, setSelectedFielder] = useState<number | null>(null);
  const { state, autoAlignField, applyTactics } = useMatch();

  return (
    <div className="relative w-full aspect-square glass-panel neon-border rounded-3xl overflow-hidden p-4">
      {/* Tactical Analysis Overlay */}
      {state.loading && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-20 bg-cyan-500/5 backdrop-blur-[2px] flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-cyan-400 font-black tracking-[0.3em] text-xs animate-pulse">ANALYZING TRAJECTORIES...</span>
          </div>
        </motion.div>
      )}

      {/* Field Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full border-[2px] border-cyan-500/30 rounded-full scale-95" />
        <div className="w-full h-full border-[1px] border-cyan-500/20 rounded-full scale-75" />
        <div className="w-full h-full border-[1px] border-cyan-500/10 rounded-full scale-50" />
      </div>

      {/* The Pitch */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-48 bg-zinc-800/80 border border-zinc-700 rounded-sm shadow-[0_0_20px_rgba(34,211,238,0.1)]">
        <div className="absolute top-4 left-0 w-full h-[1px] bg-white/20" />
        <div className="absolute bottom-4 left-0 w-full h-[1px] bg-white/20" />
      </div>
      {/* Fielder Dots */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 700 700">
        <AnimatePresence>
          {state.fieldPositioning.map((f: any) => (
            <motion.g
              key={f.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2 }}
              layout // Smooth transition for repositioning
              className="cursor-pointer"
              onMouseEnter={() => setActiveFielder(f.id)}
              onMouseLeave={() => setActiveFielder(null)}
              onClick={() => setSelectedFielder(f.id === selectedFielder ? null : f.id)}
            >
              <circle
                cx={f.x}
                cy={f.y}
                r={selectedFielder === f.id ? "14" : "10"}
                fill={selectedFielder === f.id ? '#ffffff' : f.type === 'Aggressive' ? '#ef4444' : f.type === 'Defensive' ? '#22c55e' : '#3b82f6'}
                className={`filter transition-all duration-300 ${selectedFielder === f.id ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]'}`}
              />
              {selectedFielder === f.id && (
                <motion.circle 
                  cx={f.x} cy={f.y} r="20" 
                  stroke="#22d3ee" strokeWidth="2" fill="none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              <circle
                cx={f.x}
                cy={f.y}
                r="15"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.2"
              />
              {activeFielder === f.id && (
                <motion.text
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  x={f.x}
                  y={f.y - 20}
                  textAnchor="middle"
                  className="fill-white text-[12px] font-bold pointer-events-none"
                >
                  {f.name}
                </motion.text>
              )}
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Batsman & Bowler */}
        <circle cx="350" cy="380" r="12" fill="#ffffff" className="animate-pulse" />
        <circle cx="350" cy="120" r="12" fill="#22d3ee" />
      </svg>

      {/* Overlays */}
      <div className="absolute bottom-6 left-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-[10px] font-bold text-zinc-400">AGGRESSIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" />
          <span className="text-[10px] font-bold text-zinc-400">STANDARD</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-[10px] font-bold text-zinc-400">DEFENSIVE</span>
        </div>
      </div>

      <div className="absolute top-6 right-6 flex gap-4">
        <button 
          onClick={autoAlignField}
          className="px-4 py-2 glass-panel neon-border text-[10px] font-black tracking-widest rounded-full hover:bg-cyan-500/20 transition-all active:scale-95"
        >
          AUTO-ALIGN
        </button>
        <button 
          onClick={applyTactics}
          disabled={state.loading}
          className={`px-4 py-2 text-black text-[10px] font-black tracking-widest rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all active:scale-95 ${state.loading ? 'bg-zinc-800' : 'bg-cyan-500'}`}
        >
          {state.loading ? 'PROCESSING...' : 'APPLY TACTICS'}
        </button>
      </div>
    </div>
  );
};
