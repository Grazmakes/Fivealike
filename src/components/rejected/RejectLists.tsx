'use client';

import { useState, useMemo } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { List, ItemVotes } from '@/types';
import { categories, categoryEmojis } from '@/data/mockData';
import ListCard from '@/components/lists/ListCard';

interface RejectListsProps {
  allLists: List[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  onBackClick?: () => void;
  antiSocialMode?: boolean;
}

type SortOption = 'mostDownvotes' | 'worstRatio' | 'recent';

export default function RejectLists({
  allLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onTitleClick,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  savedLists,
  setSavedLists,
  onBackClick,
  antiSocialMode = false
}: RejectListsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('worstRatio');

  const filteredLists = useMemo(() => {
    // Only show rejected lists (70%+ downvotes)
    let filtered = allLists.filter(list => list.isRejected);

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(list =>
        list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())) ||
        list.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(list => list.category === selectedCategory);
    }

    // Sort lists
    const sortedFiltered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'mostDownvotes':
          return b.downvotes - a.downvotes;
        case 'worstRatio':
          const ratioA = a.downvotes / (a.upvotes + a.downvotes);
          const ratioB = b.downvotes / (b.upvotes + b.downvotes);
          return ratioB - ratioA;
        case 'recent':
        default:
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
      }
    });

    return sortedFiltered;
  }, [allLists, searchQuery, selectedCategory, sortBy]);

  const handleSaveList = (listId: number) => {
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('worstRatio');
  };

  return (
    <div className="space-y-6">
      <div>
        {/* Header */}
        <div className="flex items-center mb-6">
          {onBackClick && (
            <button
              onClick={onBackClick}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Back to search"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
              🏝️ Island of Reject Lists
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Lists that received 70% or more downvotes and have been rejected by the community
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rejected lists..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 10).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
                className={`px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-1">{categoryEmojis[category]}</span>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSortBy('worstRatio')}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'worstRatio'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
            }`}
          >
            Worst Ratio
          </button>
          <button
            onClick={() => setSortBy('mostDownvotes')}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'mostDownvotes'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
            }`}
          >
            Most Downvotes
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              sortBy === 'recent'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
            }`}
          >
            Most Recent
          </button>
        </div>

        {/* Search Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {searchQuery || selectedCategory ? (
              <>
                Found {filteredLists.length} rejected list{filteredLists.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </>
            ) : (
              `Showing all ${filteredLists.length} rejected lists`
            )}
          </p>
          
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearSearch}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {filteredLists.length > 0 ? (
          filteredLists.map(list => (
            <div key={list.id} className="relative">
              <ListCard
                list={list}
                itemVotes={itemVotes[list.id.toString()] || {}}
                onListVote={onListVote}
                onItemVote={onItemVote}
                onHighFive={onHighFive}
                onTitleClick={onTitleClick}
                onAuthorClick={onAuthorClick}
                onMessage={onMessage}
                onItemBookmark={onItemBookmark}
                bookmarkState={bookmarkState}
                onSaveList={handleSaveList}
                isSaved={savedLists.includes(list.id)}
                antiSocialMode={antiSocialMode}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-8xl mb-4">🏝️</div>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No rejected lists found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery || selectedCategory ? (
                <>Try adjusting your search terms or category filters</>
              ) : (
                <>No lists have been rejected by the community yet</>
              )}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearSearch}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                Show all rejected lists
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}