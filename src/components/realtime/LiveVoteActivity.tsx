'use client';

import { useRealTimeVotesContext } from '@/context/RealTimeVotesContext';
import { ChevronUp, ChevronDown, Activity } from 'lucide-react';
import { useState } from 'react';

export default function LiveVoteActivity() {
  const { getRecentVoteActivity } = useRealTimeVotesContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const recentActivity = getRecentVoteActivity(10);
  
  if (recentActivity.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-20 right-4 z-40 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
        {/* Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div className="flex items-center space-x-2">
            <Activity size={16} className="text-green-500" />
            <span>Live Activity</span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full text-xs">
              {recentActivity.length}
            </span>
          </div>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        
        {/* Activity List */}
        {isExpanded && (
          <div className="max-h-64 overflow-y-auto">
            {recentActivity.map((event, index) => (
              <div
                key={`${event.listId}-${event.timestamp}`}
                className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    event.voteType === 'up' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{event.userName}</span> voted{' '}
                    <span className={event.voteType === 'up' ? 'text-green-600' : 'text-red-600'}>
                      {event.voteType === 'up' ? '↑' : '↓'}
                    </span>{' '}
                    on List #{event.listId}
                  </span>
                </div>
                <span className="text-gray-400 text-xs">
                  {Math.floor((Date.now() - event.timestamp) / 1000)}s ago
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}