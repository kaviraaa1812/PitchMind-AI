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
}

interface MatchContextType {
  state: MatchState;
  submitTacticalMove: (move: string) => Promise<void>;
  setActiveTeam: (team: 'MI' | 'CSK') => void;
  setManualInput: (input: string) => void;
  autoAlignField: () => void;
  applyTactics: () => void;
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
  });

  const setActiveTeam = (team: 'MI' | 'CSK') => {
    setState(prev => ({ ...prev, activeTeam: team }));
  };

  const setManualInput = (input: string) => {
    setState(prev => ({ ...prev, manualInput: input }));
  };

  const autoAlignField = () => {
    setState(prev => ({ 
      ...prev, 
      fieldPositioning: prev.fieldPositioning.map(f => ({
        ...f,
        x: f.x + (Math.random() * 40 - 20),
        y: f.y + (Math.random() * 40 - 20)
      })),
      lastFeedback: "Fielders auto-aligned to standard T20 Powerplay formation." 
    }));
  };


  const applyTactics = () => {
    setState(prev => ({ ...prev, loading: true }));
    setTimeout(() => {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        lastFeedback: "Tactics applied successfully. Pressure index increased by 15%.",
        tacticalIQ: Math.min(160, prev.tacticalIQ + 2)
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
    <MatchContext.Provider value={{ state, submitTacticalMove, setActiveTeam, setManualInput, autoAlignField, applyTactics }}>
      {children}
    </MatchContext.Provider>
  );
};

export const useMatch = () => {
  const context = useContext(MatchContext);
  if (!context) throw new Error('useMatch must be used within a MatchProvider');
  return context;
};
