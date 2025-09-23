'use client';

import { useState } from 'react';
import { Bookmark, Search, ExternalLink, X, Calendar } from 'lucide-react';
import { BookmarkedItem } from '@/types';

interface BookmarkedItemsProps {
  bookmarkedItems: BookmarkedItem[];
  onRemoveBookmark: (listId: number, itemIndex: number) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
  onItemClick?: (itemName: string) => void;
}

export default function BookmarkedItems({ 
  bookmarkedItems, 
  onRemoveBookmark,
  onTitleClick,
  onAuthorClick,
  onItemClick
}: BookmarkedItemsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredBookmarks = bookmarkedItems.filter(bookmark => {
    const matchesSearch = !searchQuery || 
      bookmark.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.listTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.listAuthor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || bookmark.listCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(bookmarkedItems.map(item => item.listCategory)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Bookmark className="mr-3 text-yellow-500" size={28} />
          Bookmarked Items
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved items from various lists
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bookmarked items..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Category Filter */}
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {filteredBookmarks.length} of {bookmarkedItems.length} bookmarked items
        </div>
      </div>

      {/* Bookmarked Items */}
      <div className="space-y-4">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Item Name */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Bookmark className="mr-2 text-yellow-500 fill-current" size={16} />
                    <button
                      onClick={() => onItemClick?.(bookmark.itemName)}
                      className="text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                    >
                      {bookmark.itemName}
                    </button>
                  </h3>

                  {/* List Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>From:</span>
                      <button
                        onClick={() => onTitleClick?.(bookmark.listTitle)}
                        className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center"
                      >
                        {bookmark.listTitle}
                        <ExternalLink size={12} className="ml-1" />
                      </button>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>By:</span>
                      <button
                        onClick={() => onAuthorClick?.(bookmark.listAuthor)}
                        className="ml-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                      >
                        {bookmark.listAuthor}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                          {bookmark.listCategory}
                        </span>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Calendar size={12} className="mr-1" />
                          Bookmarked {formatDate(bookmark.bookmarkedAt)}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveBookmark(bookmark.listId, bookmark.itemIndex)}
                        className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                        title="Remove bookmark"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Bookmark size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              {bookmarkedItems.length === 0 ? 'No bookmarked items yet' : 'No items match your search'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {bookmarkedItems.length === 0 
                ? 'Start bookmarking individual items from lists to see them here!'
                : 'Try adjusting your search terms or category filter.'
              }
            </p>
            {bookmarkedItems.length === 0 && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                💡 Look for the bookmark icon next to items in lists to save them here.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}