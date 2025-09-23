'use client';

import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { List, ItemVotes } from '@/types';
import { categories, categoryEmojis } from '@/data/mockData';
import ListCard from '@/components/lists/ListCard';

interface SavedListsProps {
  allLists: List[];
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
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
}

export default function SavedLists({
  allLists,
  savedLists,
  setSavedLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onCategoryClick,
  onTitleClick,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {}
}: SavedListsProps) {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  
  const savedListsData = allLists.filter(list => savedLists.includes(list.id) && !list.isRejected);
  const filteredSavedLists = selectedGenre 
    ? savedListsData.filter(list => list.category === selectedGenre)
    : savedListsData;

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Saved Lists
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your bookmarked recommendations
        </p>
        
        {savedListsData.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Filter by Genre
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre('')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedGenre === ''
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                All Lists ({savedListsData.length})
              </button>
              {categories.map(category => {
                const categoryCount = savedListsData.filter(list => list.category === category).length;
                if (categoryCount === 0) return null;
                
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedGenre(category)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      selectedGenre === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    <span className="mr-1">{categoryEmojis[category]}</span>
                    {category} ({categoryCount})
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {filteredSavedLists.length > 0 ? (
        <div className="space-y-6">
          {filteredSavedLists.map(list => (
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
              isSaved={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Bookmark size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
            {savedListsData.length === 0 ? 'No saved lists yet' : `No saved ${selectedGenre} lists`}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {savedListsData.length === 0 
              ? 'Start saving lists you find interesting by clicking the bookmark icon'
              : `You haven't saved any ${selectedGenre} lists yet`
            }
          </p>
          {savedListsData.length === 0 ? (
            <button className="btn-primary">
              Browse Lists
            </button>
          ) : (
            <button 
              onClick={() => setSelectedGenre('')}
              className="btn-secondary"
            >
              Show All Saved Lists
            </button>
          )}
        </div>
      )}
    </div>
  );
}