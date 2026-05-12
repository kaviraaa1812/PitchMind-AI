'use client';

import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Target, Activity } from 'lucide-react';

const radarData = [
  { subject: 'Aggression', A: 120, fullMark: 150 },
  { subject: 'Defense', A: 98, fullMark: 150 },
  { subject: 'Efficiency', A: 86, fullMark: 150 },
  { subject: 'IQ', A: 99, fullMark: 150 },
  { subject: 'Risk', A: 85, fullMark: 150 },
  { subject: 'Adaptation', A: 65, fullMark: 150 },
];

const momentumData = [
  { time: '12', score: 40 },
  { time: '13', score: 45 },
  { time: '14', score: 30 },
  { time: '15', score: 70 },
  { time: '16', score: 85 },
  { time: '17', score: 65 },
];

export const AnalyticsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className="glass-panel rounded-3xl p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Target size={20} className="text-purple-400" />
          </div>
          <h3 className="font-black tracking-widest text-sm uppercase">Tactical Profile</h3>
        </div>
        
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#27272a" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#71717a', fontSize: 10 }} />
              <Radar
                name="You"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <p className="text-[10px] text-zinc-500 leading-relaxed uppercase font-bold text-center">
            Your style matches: <span className="text-blue-400">ROHIT SHARMA</span>
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <h3 className="font-black tracking-widest text-sm uppercase">Match Momentum</h3>
          </div>
          <div className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded">+12.4%</div>
        </div>

        <div className="flex-1 min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={momentumData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '10px' }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#22d3ee" 
                fillOpacity={1} 
                fill="url(#colorScore)" 
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Wickets Projection</span>
            <span className="text-xl font-black">2.4 <span className="text-sm text-zinc-600">/ 5ov</span></span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 uppercase font-bold">Pressure Index</span>
            <span className="text-xl font-black text-red-500">HIGH</span>
          </div>
        </div>
      </div>
    </div>
  );
};
