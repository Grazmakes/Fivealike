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
    console.log(`[SearchPage] initialCategory: "${initialCategory}", searchSettings.category: "${searchSettings?.category}", selectedCategory: "${selectedCategory}"`);
    // Note: selectedCategory is derived from searchSettings or initialCategory, no need to set it
  }, [initialCategory, selectedCategory, searchSettings]);

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
        console.log(`[SearchPage] Filtering for category: "${selectedCategory}"`);
        console.log(`[SearchPage] Available categories in data:`, [...new Set(allLists.map(list => list.category))]);
        console.log(`[SearchPage] Board Games lists:`, allLists.filter(list => list.category === 'Board Games').length);
        results = results.filter(list => list.category === selectedCategory);
        console.log(`[SearchPage] Results after category filter: ${results.length}`);
      }

      // Apply advanced filters from search settings (only when actively searching, not browsing)
      if (activeQuery && searchSettings?.showRecommended) {
        results = results.filter(list => list.votes >= 10);
      }

      if (activeQuery && searchSettings?.showPopular) {
        results = results.filter(list => list.highFives >= 5);
      }

      if (activeQuery && searchSettings?.minVotes && searchSettings.minVotes > 0) {
        results = results.filter(list => list.votes >= searchSettings.minVotes);
      }

      // Apply date range filter (only when actively searching, not browsing)
      if (activeQuery && searchSettings?.dateRange && searchSettings.dateRange !== 'all') {
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
              className="text-lg font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
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