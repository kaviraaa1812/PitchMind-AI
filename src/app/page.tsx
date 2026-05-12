'use client';

import React from 'react';
import { LiveHeader } from '@/components/LiveHeader';
import { TacticalField } from '@/components/TacticalField';
import { AICoach } from '@/components/AICoach';
import { DecisionConsole } from '@/components/DecisionConsole';
import { AnalyticsDashboard } from '@/components/AnalyticsDashboard';
import { Sidebar } from '@/components/Sidebar';
import { Challenges } from '@/components/Challenges';
import { CommentaryFeed } from '@/components/CommentaryFeed';
import { Brain } from 'lucide-react';
import { useMatch } from '@/context/MatchContext';

export default function Home() {
  const { state, setManualInput } = useMatch();
  const [activeTab, setActiveTab] = React.useState<'tactical' | 'analytics' | 'challenges'>('tactical');

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="stadium-glow opacity-30" />
      
      {/* Fixed Header */}
      <div className="p-4 z-50">
        <LiveHeader />
      </div>

      {/* View Switcher Bar */}
      <div className="px-8 pb-2 flex justify-center z-40">
        <div className="flex gap-2 p-1 bg-zinc-900/80 border border-zinc-800 rounded-2xl backdrop-blur-xl">
          {[
            { id: 'tactical', label: 'TACTICAL CENTER' },
            { id: 'analytics', label: 'STRATEGIC ANALYTICS' },
            { id: 'challenges', label: 'MISSION CONTROL' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase ${activeTab === tab.id ? 'bg-cyan-500 text-black shadow-[0_0_25px_rgba(34,211,238,0.4)]' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-12 gap-8 px-8 py-4 overflow-hidden min-h-0">
        
        {/* Left Column: Context Sensitive Content */}
        <div className="col-span-12 lg:col-span-9 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-4">
          {activeTab === 'tactical' && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="aspect-[16/9] lg:aspect-auto lg:h-[550px]">
                <TacticalField />
              </div>
              
              {/* Coach's Briefing Box */}
              <div className="glass-panel border-cyan-500/30 bg-cyan-500/5 rounded-3xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Brain size={20} className="text-cyan-400" />
                  </div>
                  <h3 className="font-black tracking-[0.2em] text-xs uppercase text-cyan-400">Coach's Immediate Briefing</h3>
                </div>
                <p className="text-sm md:text-base text-zinc-200 leading-relaxed font-medium italic">
                  "{state.lastFeedback}"
                </p>
                <div className="mt-4 flex gap-3">
                  <button 
                    onClick={() => setManualInput(state.lastFeedback)}
                    className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:underline"
                  >
                    APPLY TO CONSOLE
                  </button>
                </div>
              </div>

              <DecisionConsole />
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <AnalyticsDashboard />
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <Challenges />
            </div>
          )}
        </div>

        {/* Right Sidebar: Persistent AI & Squad */}
        <div className="col-span-3 h-full overflow-y-auto hidden lg:flex flex-col gap-6 custom-scrollbar">
          <AICoach />
          <Sidebar />
        </div>

      </div>

      {/* Bottom Commentary Feed */}
      <div className="p-4 z-50">
        <CommentaryFeed />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.3);
        }
      `}</style>
    </main>
  );
}

