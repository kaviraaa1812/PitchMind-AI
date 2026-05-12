'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { miSquad, cskSquad } from '@/data/matchData';
import { initialFielders } from '@/components/TacticalField';

interface MatchState {
  score: string;
  overs: string;
  winProb: { mi: number; csk: number };
  tacticalIQ: number;
  lastFeedback: string;
  coachSuggestions: string[];
  loading: boolean;
  activeTeam: 'MI' | 'CSK';
  miSquad: any[];
  cskSquad: any[];
  manualInput: string;
  rank: 'Bronze' | 'Silver' | 'Gold';
  fieldPositioning: any[];
  userProfile: {
    name: string;
    xp: number;
    level: number;
    achievements: string[];
    winRate: string;
  };
}

interface MatchContextType {
  state: MatchState;
  submitTacticalMove: (move: string) => Promise<void>;
  setActiveTeam: (team: 'MI' | 'CSK') => void;
  setManualInput: (input: string) => void;
  autoAlignField: () => void;
  applyTactics: () => void;
  updateFielderPosition: (id: number, x: number, y: number) => void;
}

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export const MatchProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<MatchState>({
    score: '178/4',
    overs: '17.2',
    winProb: { mi: 58, csk: 42 },
    tacticalIQ: 142,
    lastFeedback: "Dhoni is struggling against wide yorkers in this phase. I recommend moving Mid-Off deeper and bringing in a Third-Man for protection.",
    coachSuggestions: [
      "Target the pads for the first two balls.",
      "Bring the fine leg inside for the slower ball.",
    ],
    loading: false,
    activeTeam: 'MI',
    miSquad: miSquad,
    cskSquad: cskSquad,
    manualInput: '',
    rank: 'Gold',
    fieldPositioning: initialFielders,
    userProfile: {
      name: "Kavya Maharaja",
      xp: 8400,
      level: 12,
      achievements: ["Tactical Master", "IPL Veteran", "Data Wizard"],
      winRate: "68%"
    }
  });

  const setActiveTeam = (team: 'MI' | 'CSK') => {
    setState(prev => ({ ...prev, activeTeam: team }));
  };

  const setManualInput = (input: string) => {
    setState(prev => ({ ...prev, manualInput: input }));
  };

  const updateFielderPosition = (id: number, x: number, y: number) => {
    setState(prev => {
      const fielder = prev.fieldPositioning.find(f => f.id === id);
      return {
        ...prev,
        fieldPositioning: prev.fieldPositioning.map(f => f.id === id ? { ...f, x, y } : f),
        lastFeedback: `REAL-TIME ANALYSIS: ${fielder?.name} moved to (${Math.round(x)}, ${Math.round(y)}). This creates a ${x < 350 ? 'Off-Side' : 'On-Side'} trap. Dynamic win probability shifting...`
      };
    });
  };

  const autoAlignField = () => {
    setState(prev => ({ 
      ...prev, 
      fieldPositioning: initialFielders.map(f => ({
        ...f,
        x: f.x + (Math.random() * 20 - 10),
        y: f.y + (Math.random() * 20 - 10)
      })),
      lastFeedback: "Fielders auto-aligned to optimal defensive T20 formation." 
    }));
  };

  const applyTactics = () => {
    setState(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      const wicketProb = Math.floor(Math.random() * 15) + 10;
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        lastFeedback: `Tactics executed. Wicket probability increased to ${wicketProb}%. Batsman pressure is now CRITICAL.`,
        tacticalIQ: Math.min(160, prev.tacticalIQ + 3)
      }));
    }, 1500);
  };


  const submitTacticalMove = async (move: string) => {
    setState(prev => ({ ...prev, loading: true, manualInput: '' }));
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion: move }),
      });
      const data = await res.json();
      
      setState(prev => ({
        ...prev,
        tacticalIQ: data.tacticalIQ || prev.tacticalIQ,
        lastFeedback: data.feedback || prev.lastFeedback,
        coachSuggestions: [data.feedback, ...prev.coachSuggestions].slice(0, 5),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <MatchContext.Provider value={{ state, submitTacticalMove, setActiveTeam, setManualInput, autoAlignField, applyTactics, updateFielderPosition }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatch must be used within a MatchProvider');
  return context;
};
