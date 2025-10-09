'use client';

import { useState } from 'react';
import { Bookmark as BookmarkIcon, List, Bookmark, Search, Filter, X, ArrowLeft, History as HistoryIcon } from 'lucide-react';
import { List as ListType, ItemVotes, BookmarkedItem, HistoryItem } from '@/types';
import ListCard from '@/components/lists/ListCard';
import BookmarkedItems from '@/components/bookmarks/BookmarkedItems';
import History from '@/components/history/History';

interface FavoritesProps {
  // Saved Lists props
  allLists: ListType[];
  savedLists: number[];
  setSavedLists: (lists: number[]) => void;
  onSaveListToHistory?: (listId: number, isCurrentlySaved: boolean) => void;
  itemVotes: ItemVotes;
  onListVote: (listId: number, voteType: 'up' | 'down') => void;
  onHighFive: (listId: number) => void;
  onCategoryClick?: (category: string) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onItemBookmark?: (listId: number, itemIndex: number) => void;
  bookmarkState?: { [key: string]: boolean };
  
  // Bookmarked Items props
  bookmarkedItems: BookmarkedItem[];
  onRemoveBookmark: (listId: number, itemIndex: number) => void;
  onItemClick?: (itemName: string) => void;
  onTryItem?: (listId: number, itemIndex: number, rating: 'up' | 'down') => void;
  onAddToHistory?: (listId: number, itemIndex: number) => void;

  // History props
  historyItems: HistoryItem[];
  
  // Navigation
  onBack?: () => void;

  // Antisocial mode
  antiSocialMode?: boolean;
  onRateList?: (listId: number, rating: 'up' | 'down') => void;
}

type FavoritesTab = 'lists' | 'items' | 'history';

export default function Favorites({
  allLists,
  savedLists,
  setSavedLists,
  onSaveListToHistory,
  itemVotes,
  onListVote,
  onHighFive,
  onCategoryClick,
  onTitleClick,
  onAuthorClick,
  onMessage,
  onItemBookmark,
  bookmarkState = {},
  bookmarkedItems,
  onRemoveBookmark,
  onItemClick,
  onTryItem,
  onAddToHistory,
  historyItems,
  onBack,
  antiSocialMode = false,
  onRateList
}: FavoritesProps) {
  const [selectedTab, setSelectedTab] = useState<FavoritesTab>('lists');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Get saved lists
  const savedListsData = allLists.filter(list => savedLists.includes(list.id));

  // Filter saved lists based on search and category
  const filteredSavedLists = savedListsData.filter(list => {
    const matchesSearch = !searchQuery || 
      list.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      list.items.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || list.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Filter bookmarked items based on search
  const filteredBookmarkedItems = bookmarkedItems.filter(item => {
    const matchesSearch = !searchQuery ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.listTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.listAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || item.listCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from both saved lists and bookmarked items
  const allCategories = Array.from(new Set([
    ...savedListsData.map(list => list.category),
    ...bookmarkedItems.map(item => item.listCategory)
  ])).sort();

  const handleSaveList = (listId: number) => {
    const isCurrentlySaved = savedLists.includes(listId);

    if (onSaveListToHistory) {
      // Use the enhanced handler that tracks in history
      onSaveListToHistory(listId, isCurrentlySaved);
    } else {
      // Fallback to direct state update
      setSavedLists(
        isCurrentlySaved
          ? savedLists.filter(id => id !== listId)
          : [...savedLists, listId]
      );
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="space-y-3 lg:space-y-6">
      {/* Header - Hidden on mobile */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
              <BookmarkIcon className="text-green-500" />
              <span>Your Favorites</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Saved lists and bookmarked items
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-2 lg:gap-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search favorites..."
            className="w-full pl-10 pr-4 py-2.5 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-w-full text-base"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <Filter size={16} className="text-gray-500" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 px-3 py-2.5 lg:py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
          >
            <option value="">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {/* Clear Filters - Inline on mobile */}
          {(searchQuery || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="flex-shrink-0 p-2.5 lg:px-4 lg:py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center"
              title="Clear filters"
            >
              <X size={18} />
              <span className="hidden lg:inline ml-1">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 max-w-full overflow-hidden">
        <button
          onClick={() => setSelectedTab('lists')}
          className={`flex flex-col lg:flex-row items-center lg:space-x-2 px-2 lg:px-4 py-2.5 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors flex-1 justify-center min-w-0 ${
            selectedTab === 'lists'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <List size={18} className="lg:w-4 lg:h-4" />
          <span className="mt-1 lg:mt-0 text-xs lg:text-sm whitespace-nowrap">Saved Lists</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 mt-0.5 lg:mt-0 ${
            selectedTab === 'lists'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {filteredSavedLists.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('items')}
          className={`flex flex-col lg:flex-row items-center lg:space-x-2 px-2 lg:px-4 py-2.5 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors flex-1 justify-center min-w-0 ${
            selectedTab === 'items'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Bookmark size={18} className="lg:w-4 lg:h-4" />
          <span className="mt-1 lg:mt-0 text-xs lg:text-sm whitespace-nowrap">Bookmarked Items</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 mt-0.5 lg:mt-0 ${
            selectedTab === 'items'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {filteredBookmarkedItems.length}
          </span>
        </button>

        <button
          onClick={() => setSelectedTab('history')}
          className={`flex flex-col lg:flex-row items-center lg:space-x-2 px-2 lg:px-4 py-2.5 lg:py-3 rounded-lg text-xs lg:text-sm font-medium transition-colors flex-1 justify-center min-w-0 ${
            selectedTab === 'history'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <HistoryIcon size={18} className="lg:w-4 lg:h-4" />
          <span className="mt-1 lg:mt-0 text-xs lg:text-sm whitespace-nowrap">History</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 mt-0.5 lg:mt-0 ${
            selectedTab === 'history'
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {historyItems.length}
          </span>
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {selectedTab === 'lists' ? (
          // Saved Lists Content
          <div className="space-y-6">
            {filteredSavedLists.length > 0 ? (
              filteredSavedLists.map(list => (
                <div key={list.id} className="relative">
                  <ListCard
                    list={list}
                    onListVote={onListVote}
                    onHighFive={onHighFive}
                    onTitleClick={onTitleClick}
                    onAuthorClick={onAuthorClick}
                    onMessage={onMessage}
                    onItemBookmark={onItemBookmark}
                    onAddToHistory={onAddToHistory}
                    bookmarkState={bookmarkState}
                    onSaveList={handleSaveList}
                    isSaved={true}
                    antiSocialMode={antiSocialMode}
                    onRateList={onRateList}
                    ratingPlacement="hero"
                    showSaveButton
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <List size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery || selectedCategory ? 'No matching saved lists' : 'No saved lists yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery || selectedCategory
                    ? 'Try adjusting your search terms or filters'
                    : 'Start saving lists you love and they\'ll appear here'
                  }
                </p>
                {(searchQuery || selectedCategory) && (
                  <button
                    onClick={clearFilters}
                    className="btn-primary bg-green-600 hover:bg-green-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        ) : selectedTab === 'items' ? (
          // Bookmarked Items Content
          <BookmarkedItems
            bookmarkedItems={bookmarkedItems}
            onRemoveBookmark={onRemoveBookmark}
            onTitleClick={onTitleClick}
            onAuthorClick={onAuthorClick}
            onItemClick={onItemClick}
            onTryItem={onTryItem}
            onAddToHistory={onAddToHistory}
          />
        ) : (
          // History Content - Full component with ratings
          <History
            historyItems={historyItems}
            onItemClick={onItemClick}
            onTitleClick={onTitleClick}
            onAuthorClick={onAuthorClick}
          />
        )}
      </div>
    </div>
  );
}
