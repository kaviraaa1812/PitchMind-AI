'use client';

import React from 'react';
import { Users, Trophy, ChevronRight, User } from 'lucide-react';
import { useMatch } from '@/context/MatchContext';

const leaderboard = [
  { rank: 1, name: 'TacticMaster', score: 2840 },
  { rank: 2, name: 'CricketBrain', score: 2710 },
  { rank: 3, name: 'IplGenius', score: 2650 },
];


export const Sidebar = () => {
  const { state, setActiveTeam } = useMatch();
  const activeSquad = state.activeTeam === 'MI' ? state.miSquad : state.cskSquad;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Squad Builder Section */}
      <div className="glass-panel rounded-3xl p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-blue-400" />
              <h3 className="font-black tracking-widest text-sm uppercase">Active Squad</h3>
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              {state.activeTeam} - 11 Players
            </span>
          </div>

          {/* Team Switcher */}
          <div className="flex p-1 bg-zinc-900 rounded-xl gap-1">
            <button 
              onClick={() => setActiveTeam('MI')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${state.activeTeam === 'MI' ? 'bg-blue-600 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              MI SQUAD
            </button>
            <button 
              onClick={() => setActiveTeam('CSK')}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-black transition-all ${state.activeTeam === 'CSK' ? 'bg-yellow-600 text-black shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              CSK SQUAD
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
          {activeSquad.map((p, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-800/50 hover:border-blue-500/30 transition-all cursor-pointer group active:scale-[0.98]"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[10px] ${state.activeTeam === 'MI' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-500'} group-hover:scale-110 transition-transform`}>
                {p.img}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate">{p.name}</p>
                <p className="text-[9px] text-zinc-500 uppercase">{p.role}</p>
              </div>
              <div className={`text-[8px] font-black px-1.5 py-0.5 rounded ${p.form === 'EXCELLENT' || p.form === 'PEAK' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-400'}`}>
                {p.form}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard Section */}
      <div className="glass-panel rounded-3xl p-6 flex-1">
        <div className="flex items-center gap-3 mb-6">
          <Trophy size={20} className="text-yellow-500" />
          <h3 className="font-black tracking-widest text-sm uppercase">Top Strategists</h3>
        </div>

        <div className="space-y-3">
          {leaderboard.map((u, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black ${u.rank === 1 ? 'text-yellow-500' : 'text-zinc-500'}`}>#0{u.rank}</span>
                <span className="text-xs font-medium">{u.name}</span>
              </div>
              <span className="text-xs font-black text-zinc-400">{u.score}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <User size={16} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase">Your Rank</p>
              <p className="text-xs font-black">#124 (Top 2%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
