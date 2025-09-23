'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useRealTimeVotes, VoteEvent, VoteUpdate } from '@/hooks/useRealTimeVotes';

interface VoteBroadcastPayload {
  voteType: 'up' | 'down';
  upDelta: number;
  downDelta: number;
}

interface RealTimeVotesContextType {
  voteUpdates: Map<number, VoteUpdate>;
  recentVoteEvents: VoteEvent[];
  broadcastVote: (listId: number, payload: VoteBroadcastPayload) => void;
  getVoteUpdate: (listId: number) => VoteUpdate | null;
  getRecentVoteActivity: (limit?: number) => VoteEvent[];
}

const RealTimeVotesContext = createContext<RealTimeVotesContextType | undefined>(undefined);

export function RealTimeVotesProvider({ children }: { children: ReactNode }) {
  const realTimeVotes = useRealTimeVotes();

  return (
    <RealTimeVotesContext.Provider value={realTimeVotes}>
      {children}
    </RealTimeVotesContext.Provider>
  );
}

export function useRealTimeVotesContext() {
  const context = useContext(RealTimeVotesContext);
  if (context === undefined) {
    // Return a safe fallback instead of throwing
    return {
      voteUpdates: new Map(),
      recentVoteEvents: [],
      broadcastVote: () => {},
      getVoteUpdate: () => null,
      getRecentVoteActivity: () => []
    };
  }
  return context;
}

export type { VoteBroadcastPayload };
