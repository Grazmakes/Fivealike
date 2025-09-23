'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { VoteBroadcastPayload } from '@/context/RealTimeVotesContext';

export interface VoteEvent {
  listId: number;
  voteType: 'up' | 'down';
  userId: string;
  userName: string;
  timestamp: number;
}

export interface VoteUpdate {
  listId: number;
  upvotes: number;
  downvotes: number;
  votes: number;
  isRejected?: boolean;
  latestVoteEvent?: VoteEvent;
}

// Simulate other users voting in real-time
const MOCK_USERS = [
  { id: 'user_1', name: 'MusicLover92' },
  { id: 'user_2', name: 'BookWorm' },
  { id: 'user_3', name: 'MovieBuff' },
  { id: 'user_4', name: 'TechGuru' },
  { id: 'user_5', name: 'FoodieExplorer' },
  { id: 'user_6', name: 'TravelAddict' },
  { id: 'user_7', name: 'GameMaster' },
  { id: 'user_8', name: 'ArtEnthusiast' }
];

export function useRealTimeVotes() {
  const [voteUpdates, setVoteUpdates] = useState<Map<number, VoteUpdate>>(new Map());
  const [recentVoteEvents, setRecentVoteEvents] = useState<VoteEvent[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(true);

  // Generate random vote activity from other users
  const simulateRandomVote = useCallback(() => {
    if (!isActiveRef.current) return;

    // Random chance of a vote occurring (30% per interval)
    if (Math.random() > 0.3) return;

    // Pick a random list ID (between 1-100, representing visible lists)
    const listId = Math.floor(Math.random() * 100) + 1;
    
    // Pick a random user
    const user = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
    
    // Pick random vote type (70% upvotes, 30% downvotes - more realistic)
    const voteType: 'up' | 'down' = Math.random() > 0.3 ? 'up' : 'down';
    
    const voteEvent: VoteEvent = {
      listId,
      voteType,
      userId: user.id,
      userName: user.name,
      timestamp: Date.now()
    };

    // Update vote counts
    setVoteUpdates(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(listId);
      
      if (existing) {
        const newUpdate: VoteUpdate = {
          ...existing,
          upvotes: voteType === 'up' ? existing.upvotes + 1 : existing.upvotes,
          downvotes: voteType === 'down' ? existing.downvotes + 1 : existing.downvotes,
          latestVoteEvent: voteEvent
        };
        newUpdate.votes = newUpdate.upvotes - newUpdate.downvotes;
        
        // Check if should be rejected
        const totalVotes = newUpdate.upvotes + newUpdate.downvotes;
        const downvoteRatio = totalVotes > 0 ? (newUpdate.downvotes / totalVotes) : 0;
        newUpdate.isRejected = totalVotes >= 10 && downvoteRatio >= 0.7;
        
        newMap.set(listId, newUpdate);
      } else {
        // Initialize new vote tracking for this list
        const newUpdate: VoteUpdate = {
          listId,
          upvotes: voteType === 'up' ? 1 : 0,
          downvotes: voteType === 'down' ? 1 : 0,
          votes: voteType === 'up' ? 1 : -1,
          latestVoteEvent: voteEvent
        };
        newMap.set(listId, newUpdate);
      }
      
      return newMap;
    });

    // Add to recent events (keep only last 50)
    setRecentVoteEvents(prev => {
      const newEvents = [voteEvent, ...prev].slice(0, 50);
      return newEvents;
    });
  }, []);

  // Broadcast a user's vote to the real-time system
  const broadcastVote = useCallback((listId: number, payload: VoteBroadcastPayload) => {
    const { voteType, upDelta, downDelta } = payload;

    if (upDelta === 0 && downDelta === 0) {
      return;
    }

    const latestVoteEvent: VoteEvent = {
      listId,
      voteType,
      userId: 'current_user',
      userName: 'You',
      timestamp: Date.now()
    };

    setVoteUpdates(prev => {
      const newMap = new Map(prev);
      const existing = newMap.get(listId);

      const applyDeltas = (update: VoteUpdate): VoteUpdate => {
        const nextUpvotes = Math.max(0, update.upvotes + upDelta);
        const nextDownvotes = Math.max(0, update.downvotes + downDelta);
        const totalVotes = nextUpvotes + nextDownvotes;
        const downvoteRatio = totalVotes > 0 ? (nextDownvotes / totalVotes) : 0;

        return {
          ...update,
          upvotes: nextUpvotes,
          downvotes: nextDownvotes,
          votes: nextUpvotes - nextDownvotes,
          isRejected: totalVotes >= 10 && downvoteRatio >= 0.7,
          latestVoteEvent
        };
      };

      if (existing) {
        newMap.set(listId, applyDeltas(existing));
      } else {
        const baseUpdate: VoteUpdate = {
          listId,
          upvotes: Math.max(0, upDelta),
          downvotes: Math.max(0, downDelta),
          votes: Math.max(0, upDelta) - Math.max(0, downDelta),
          latestVoteEvent
        };

        const totalVotes = baseUpdate.upvotes + baseUpdate.downvotes;
        const downvoteRatio = totalVotes > 0 ? (baseUpdate.downvotes / totalVotes) : 0;
        baseUpdate.isRejected = totalVotes >= 10 && downvoteRatio >= 0.7;

        newMap.set(listId, baseUpdate);
      }

      return newMap;
    });

    if (upDelta > 0 || downDelta > 0) {
      setRecentVoteEvents(prev => [latestVoteEvent, ...prev].slice(0, 50));
    }
  }, []);

  // Get vote updates for a specific list
  const getVoteUpdate = useCallback((listId: number): VoteUpdate | null => {
    return voteUpdates.get(listId) || null;
  }, [voteUpdates]);

  // Get recent vote activity
  const getRecentVoteActivity = useCallback((limit: number = 10) => {
    return recentVoteEvents.slice(0, limit);
  }, [recentVoteEvents]);

  // Initialize real-time simulation
  useEffect(() => {
    isActiveRef.current = true;
    
    // Start simulation with random intervals (2-8 seconds)
    const startSimulation = () => {
      const randomInterval = 2000 + Math.random() * 6000;
      intervalRef.current = setTimeout(() => {
        simulateRandomVote();
        startSimulation(); // Schedule next vote
      }, randomInterval);
    };

    startSimulation();

    return () => {
      isActiveRef.current = false;
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [simulateRandomVote]);

  return {
    voteUpdates,
    recentVoteEvents,
    broadcastVote,
    getVoteUpdate,
    getRecentVoteActivity
  };
}
