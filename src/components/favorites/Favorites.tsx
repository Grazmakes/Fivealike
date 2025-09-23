'use client';

import { useState } from 'react';
import { Bookmark as BookmarkIcon, List, Bookmark, Search, Filter, X, ArrowLeft } from 'lucide-react';
import { List as ListType, ItemVotes, BookmarkedItem } from '@/types';
import ListCard from '@/components/lists/ListCard';

interface FavoritesProps {
  // Saved Lists props
  allLists: ListType[];
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
  
  // Bookmarked Items props
  bookmarkedItems: BookmarkedItem[];
  onRemoveBookmark: (listId: number, itemIndex: number) => void;
  onItemClick?: (itemName: string) => void;
  
  // Navigation
  onBack?: () => void;
}

type FavoritesTab = 'lists' | 'items';

export default function Favorites({
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
  bookmarkState = {},
  bookmarkedItems,
  onRemoveBookmark,
  onItemClick,
  onBack
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
    setSavedLists(
      savedLists.includes(listId) 
        ? savedLists.filter(id => id !== listId)
        : [...savedLists, listId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search favorites..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-w-full"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedCategory) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center space-x-1"
          >
            <X size={16} />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 max-w-full overflow-hidden">
        <button
          onClick={() => setSelectedTab('lists')}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-1 justify-center min-w-0 ${
            selectedTab === 'lists'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <List size={16} />
          <span className="truncate">Saved Lists</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 ${
            selectedTab === 'lists' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {filteredSavedLists.length}
          </span>
        </button>
        
        <button
          onClick={() => setSelectedTab('items')}
          className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex-1 justify-center min-w-0 ${
            selectedTab === 'items'
              ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          <Bookmark size={16} />
          <span className="truncate">Bookmarked Items</span>
          <span className={`px-1.5 py-0.5 text-xs rounded-full flex-shrink-0 ${
            selectedTab === 'items' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
          }`}>
            {filteredBookmarkedItems.length}
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
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center space-x-1">
                    <BookmarkIcon size={12} />
                    <span>Saved</span>
                  </div>
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
                    isSaved={true}
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
        ) : (
          // Bookmarked Items Content
          <div className="space-y-4">
            {filteredBookmarkedItems.length > 0 ? (
              <div className="grid gap-4">
                {filteredBookmarkedItems.map(item => (
                  <div key={item.id} className="event-card-custom border border-gray-200 dark:border-gray-600 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <button
                            onClick={() => onItemClick?.(item.itemName)}
                            className="font-semibold text-lg text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          >
                            {item.itemName}
                          </button>
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                            Bookmarked
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          From{' '}
                          <button
                            onClick={() => onTitleClick?.(item.listTitle)}
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            {item.listTitle}
                          </button>
                          {' '}by{' '}
                          <button
                            onClick={() => onAuthorClick?.(item.listAuthor)}
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            {item.listAuthor}
                          </button>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                          <span>{item.listCategory}</span>
                          <span>•</span>
                          <span>Bookmarked {new Date(item.bookmarkedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onRemoveBookmark(item.listId, item.itemIndex)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {searchQuery || selectedCategory ? 'No matching bookmarked items' : 'No bookmarked items yet'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {searchQuery || selectedCategory 
                    ? 'Try adjusting your search terms or filters'
                    : 'Bookmark individual items from lists and they\'ll appear here'
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
        )}
      </div>
    </div>
  );
}
