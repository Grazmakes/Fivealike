'use client';

import { TrendingTab, List, ItemVotes } from '@/types';
import { TrendingUp } from 'lucide-react';
import ListCard from '@/components/lists/ListCard';

interface TrendingListsProps {
  selectedTrendingTab: TrendingTab;
  setSelectedTrendingTab: (tab: TrendingTab) => void;
  allLists: List[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onCategoryClick?: (category: string) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  antiSocialMode?: boolean;
}

const trendingTabs = [
  { id: 'votes' as TrendingTab, label: 'Most Votes' },
  { id: 'comments' as TrendingTab, label: 'Most Comments' },
  { id: 'saved' as TrendingTab, label: 'Most Saved' },
];

export default function TrendingLists({
  selectedTrendingTab,
  setSelectedTrendingTab,
  allLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onCategoryClick,
  onTitleClick,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  savedLists,
  setSavedLists,
  antiSocialMode = false
}: TrendingListsProps) {
  
  const getFilteredLists = () => {
    // Filter out rejected lists (70%+ downvotes)
    const nonRejectedLists = allLists.filter(list => !list.isRejected);
    
    switch (selectedTrendingTab) {
      case 'votes':
        return [...nonRejectedLists].sort((a, b) => b.votes - a.votes);
      case 'comments':
        return [...nonRejectedLists].sort((a, b) => b.comments.length - a.comments.length);
      case 'saved':
        return [...nonRejectedLists].sort((a, b) => b.saves - a.saves);
      default:
        return nonRejectedLists;
    }
  };

  const filteredLists = getFilteredLists();

  const handleSaveList = (listId: number) => {
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <TrendingUp className="text-green-500 mr-2" size={28} />
          Trending Lists
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Most popular recommendations this week
        </p>
        
        {/* Trending Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {trendingTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTrendingTab(tab.id)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                selectedTrendingTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lists */}
      <div className="space-y-6">
        {filteredLists.map(list => (
          <ListCard
            key={list.id}
            list={list}
            itemVotes={itemVotes[list.id.toString()] || {}}
            onListVote={onListVote}
            onItemVote={onItemVote}
            onHighFive={onHighFive}
            onCategoryClick={onCategoryClick}
            onTitleClick={onTitleClick}
            onAuthorClick={onAuthorClick}
            onMessage={onMessage}
            onItemBookmark={onItemBookmark}
            bookmarkState={bookmarkState}
            onSaveList={handleSaveList}
            isSaved={savedLists.includes(list.id)}
            antiSocialMode={antiSocialMode}
          />
        ))}
      </div>
    </div>
  );
}