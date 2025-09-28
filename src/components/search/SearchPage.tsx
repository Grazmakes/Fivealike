'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { List, ItemVotes } from '@/types';
import { categories, categoryEmojis } from '@/data/mockData';
import ListCard from '@/components/lists/ListCard';

type SearchSettings = {
  category: string;
  sortBy: SortOption;
  viewMode: 'grid' | 'list';
  showRecommended?: boolean;
  showPopular?: boolean;
  minVotes?: number;
  dateRange?: 'all' | 'week' | 'month' | 'year';
};

interface SearchPageProps {
  allLists: List[];
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onItemVote: (listId: number, itemIndex: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onTitleClick?: (title: string) => void;
  onAddComment?: (listId: number, comment: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  initialCategory?: string;
  initialQuery?: string;
  onRejectListsClick?: () => void;
  onClearSearch?: () => void;
  antiSocialMode?: boolean;
  searchSettings?: SearchSettings;
  randomTrigger?: number;
}

type SortOption = 'mostLikes' | 'bestOverall' | 'mostHighFives' | 'mostComments' | 'recent';

export default function SearchPage({
  allLists,
  itemVotes,
  onListVote,
  onItemVote,
  onHighFive,
  onTitleClick,
  onAddComment,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  savedLists,
  setSavedLists,
  initialCategory = '',
  initialQuery = '',
  onRejectListsClick,
  onClearSearch,
  antiSocialMode = false,
  searchSettings,
  randomTrigger
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [forceRandomList, setForceRandomList] = useState<List | null>(null);

  // Use search settings from props or fallback to local state
  const selectedCategory = searchSettings?.category || initialCategory;
  const sortBy = searchSettings?.sortBy || 'recent';

  // Update selectedCategory when initialCategory changes
  useEffect(() => {
    console.log('SearchPage: initialCategory changed from', selectedCategory, 'to', initialCategory);
    // Note: selectedCategory is derived from searchSettings or initialCategory, no need to set it
  }, [initialCategory, selectedCategory]);

  // Clear forceRandomList when user starts typing or selects category
  useEffect(() => {
    if ((searchQuery.trim() || selectedCategory) && forceRandomList) {
      console.log('🔄 Clearing forceRandomList because user is searching:', {
        searchQuery: searchQuery.trim(),
        selectedCategory,
        forceRandomList: forceRandomList?.title
      });
      setForceRandomList(null);
    }
  }, [searchQuery, selectedCategory, forceRandomList]);

  // Handle random list trigger from dropdown
  useEffect(() => {
    if (randomTrigger && randomTrigger > 0) {
      handleRandomClick();
    }
  }, [randomTrigger]);

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const filteredLists = useMemo(() => {
    const activeQuery = searchQuery.trim() || initialQuery.trim();

    // SEARCH ALWAYS WINS - if there's any search, completely ignore random list
    if (activeQuery || selectedCategory) {
      let results = allLists.filter(list => !list.isRejected);

      // Apply search query filter
      if (activeQuery) {
        results = results.filter(list =>
          list.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
          list.author.toLowerCase().includes(activeQuery.toLowerCase()) ||
          list.items.some(item => item.toLowerCase().includes(activeQuery.toLowerCase())) ||
          list.description.toLowerCase().includes(activeQuery.toLowerCase())
        );
      }

      // Apply category filter
      if (selectedCategory) {
        results = results.filter(list => list.category === selectedCategory);
      }

      // Apply advanced filters from search settings
      if (searchSettings?.showRecommended) {
        results = results.filter(list => list.votes >= 10);
      }

      if (searchSettings?.showPopular) {
        results = results.filter(list => list.highFives >= 5);
      }

      if (searchSettings?.minVotes && searchSettings.minVotes > 0) {
        results = results.filter(list => list.votes >= searchSettings.minVotes);
      }

      // Apply date range filter
      if (searchSettings?.dateRange && searchSettings.dateRange !== 'all') {
        const now = new Date();
        const cutoffDate = new Date();

        switch (searchSettings.dateRange) {
          case 'week':
            cutoffDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            cutoffDate.setMonth(now.getMonth() - 1);
            break;
          case 'year':
            cutoffDate.setFullYear(now.getFullYear() - 1);
            break;
        }

        results = results.filter(list => new Date(list.date) >= cutoffDate);
      }

      // Apply sorting
      return results.sort((a, b) => {
        switch (sortBy) {
          case 'mostLikes': return b.votes - a.votes;
          case 'bestOverall':
            const scoreA = a.votes + (a.highFives * 2) + (a.saves * 1.5);
            const scoreB = b.votes + (b.highFives * 2) + (b.saves * 1.5);
            return scoreB - scoreA;
          case 'mostHighFives': return b.highFives - a.highFives;
          case 'mostComments': return b.comments.length - a.comments.length;
          case 'recent':
          default:
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
      });
    }

    // Only show random list when NO search is active
    if (forceRandomList && !activeQuery && !selectedCategory) {
      return [forceRandomList];
    }

    // Empty state
    return [];
  }, [allLists, selectedCategory, searchQuery, initialQuery, sortBy, forceRandomList, searchSettings]);

  const handleSaveList = (listId: number) => {
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  const handleRandomClick = () => {
    let availableLists = allLists.filter(list => !list.isRejected);
    if (availableLists.length === 0) return;
    
    // If we already have a random list showing, exclude it from next selection
    if (forceRandomList) {
      availableLists = availableLists.filter(list => list.id !== forceRandomList.id);
      // If no other lists available, reset to all lists
      if (availableLists.length === 0) {
        availableLists = allLists.filter(list => !list.isRejected);
      }
    }
    
    // Get random list
    const randomIndex = Math.floor(Math.random() * availableLists.length);
    const randomList = availableLists[randomIndex];
    
    // Clear search state
    setSearchQuery('');
    // Note: selectedCategory is controlled by searchSettings prop now
    if (onClearSearch) {
      onClearSearch();
    }
    
    // Force this specific list to show
    setForceRandomList(randomList);
  };

  const clearSearch = () => {
    setSearchQuery('');
    // Note: selectedCategory and sortBy are controlled by searchSettings prop now
    setForceRandomList(null);
    if (onClearSearch) {
      onClearSearch();
    }
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'mostLikes', label: 'Most Likes' },
    { value: 'bestOverall', label: 'Best Overall' },
    { value: 'mostHighFives', label: 'Most High Fives' },
    { value: 'mostComments', label: 'Most Comments' }
  ];

  const handleSortChange = (newSort: SortOption) => {
    // Note: sortBy is now controlled by searchSettings prop
    // This function may need to be removed or use a callback to parent
    setShowSortDropdown(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Search Lists
        </h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              console.log('🔍 Search input changed:', value);
              setSearchQuery(value);
              // Clear forceRandomList immediately when user starts typing
              if (value.trim() && forceRandomList) {
                console.log('⚡ Immediately clearing forceRandomList on input change');
                setForceRandomList(null);
              }
            }}
            placeholder="Search lists, authors, or recommendations..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
          />
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>



        {/* Filter Controls */}
        <div className="flex items-center gap-4 mb-6">

          {/* Sort Dropdown */}
          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-w-[200px] justify-between"
            >
              <span>{sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showSortDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value as SortOption)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      sortBy === option.value
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleRandomClick}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <span>🎲</span>
            <span>Random List</span>
          </button>
        </div>


        {/* Search Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {forceRandomList ? (
              <>Showing random list</>
            ) : (searchQuery || initialQuery || selectedCategory) ? (
              <>
                Found {filteredLists.length} list{filteredLists.length !== 1 ? 's' : ''}
                {(searchQuery || initialQuery) && ` for "${searchQuery || initialQuery}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </>
            ) : (
              <>Enter a search term or select a category to see results</>
            )}
          </p>
          
          {(forceRandomList || searchQuery || initialQuery || selectedCategory) && (
            <button
              onClick={clearSearch}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              {forceRandomList ? 'Show all lists' : 'Clear filters'}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6 pb-12" key={`results-${searchQuery}-${selectedCategory}-${filteredLists.length}`}>
        {filteredLists.length > 0 ? (
          filteredLists.map((list, index) => (
            <ListCard
              key={`${list.id}-${searchQuery}-${selectedCategory}`}
              list={list}
              itemVotes={itemVotes[list.id.toString()] || {}}
              onListVote={onListVote}
              onItemVote={onItemVote}
              onHighFive={onHighFive}
              onTitleClick={onTitleClick}
              onAddComment={onAddComment}
              onAuthorClick={onAuthorClick}
              onMessage={onMessage}
              onItemBookmark={onItemBookmark}
              bookmarkState={bookmarkState}
              onSaveList={handleSaveList}
              isSaved={savedLists.includes(list.id)}
              antiSocialMode={antiSocialMode}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Search size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {searchQuery || initialQuery || selectedCategory ? 'No lists found' : 'Ready to search'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery || initialQuery || selectedCategory ? (
                <>Try adjusting your search terms or category filters</>
              ) : (
                <>Start typing to search through lists, authors, or recommendations</>
              )}
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={clearSearch}
                className="btn-primary"
              >
                Show all lists
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}