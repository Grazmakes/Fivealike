'use client';

import { useState } from 'react';
import { History as HistoryIcon, Search, Calendar, ThumbsUp, ThumbsDown, TrendingUp, Medal, BarChart3, Filter, Clock, Bookmark } from 'lucide-react';
import { HistoryItem } from '@/types';

interface HistoryProps {
  historyItems: HistoryItem[];
  onItemClick?: (itemName: string) => void;
  onTitleClick?: (title: string) => void;
  onAuthorClick?: (author: string) => void;
}

export default function History({
  historyItems,
  onItemClick,
  onTitleClick,
  onAuthorClick
}: HistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRating, setSelectedRating] = useState<'' | 'up' | 'down'>('');
  const [viewMode, setViewMode] = useState<'list' | 'stats'>('list');

  // Defensive check for historyItems
  const safeHistoryItems = historyItems || [];

  const filteredItems = safeHistoryItems.filter(item => {
    const searchText = item.type === 'item' ? item.itemName : item.listTitle;
    const matchesSearch = !searchQuery ||
      (searchText && searchText.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.listTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.listAuthor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || item.listCategory === selectedCategory;
    const matchesRating = !selectedRating || (item.rating && item.rating === selectedRating);

    return matchesSearch && matchesCategory && matchesRating;
  });

  const categories = Array.from(new Set(safeHistoryItems.map(item => item.listCategory)));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate stats
  const totalInteractions = safeHistoryItems.length;
  const itemInteractions = safeHistoryItems.filter(item => item.type === 'item');
  const listInteractions = safeHistoryItems.filter(item => item.type === 'list');
  const lovedItems = itemInteractions.filter(item => item.rating === 'up').length;
  const dislikedItems = itemInteractions.filter(item => item.rating === 'down').length;
  const savedLists = listInteractions.filter(item => item.action === 'saved').length;
  const successRate = itemInteractions.length > 0 ? Math.round((lovedItems / itemInteractions.length) * 100) : 0;

  const categoryStats = categories.map(category => {
    const categoryItems = safeHistoryItems.filter(item => item.listCategory === category);
    const categoryLoved = categoryItems.filter(item => item.rating === 'up').length;
    const categoryTotal = categoryItems.length;
    const categoryRate = categoryTotal > 0 ? Math.round((categoryLoved / categoryTotal) * 100) : 0;

    return {
      category,
      total: categoryTotal,
      loved: categoryLoved,
      rate: categoryRate
    };
  }).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <HistoryIcon className="mr-3 text-blue-500" size={28} />
          Your History
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your journey through all the lists and items you&apos;ve saved and tried
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Activity</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalInteractions}</p>
            </div>
            <HistoryIcon className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lists Saved</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{savedLists}</p>
            </div>
            <Bookmark className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loved</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{lovedItems}</p>
            </div>
            <ThumbsUp className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Not For Me</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{dislikedItems}</p>
            </div>
            <ThumbsDown className="text-red-500" size={24} />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{successRate}%</p>
            </div>
            <TrendingUp className="text-blue-500" size={24} />
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300'
            }`}
          >
            Timeline View
          </button>
          <button
            onClick={() => setViewMode('stats')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'stats'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300'
            }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {viewMode === 'stats' ? (
        /* Statistics View */
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="mr-2 text-blue-500" size={20} />
              Category Breakdown
            </h3>
            <div className="space-y-4">
              {categoryStats.map(stat => (
                <div key={stat.category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900 dark:text-white">{stat.category}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({stat.total} items)
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stat.rate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-10 text-right">
                      {stat.rate}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {successRate >= 70 && (
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700 p-6">
              <div className="flex items-center">
                <Medal className="text-yellow-500 mr-3" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                    Great Taste Achievement! 🎉
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    You have a {successRate}% success rate! You&apos;re great at discovering things you&apos;ll love.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Timeline View */
        <>
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search your history..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="w-full lg:w-48">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value as '' | 'up' | 'down')}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Ratings</option>
                  <option value="up">Loved</option>
                  <option value="down">Not For Me</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              {filteredItems.length} of {safeHistoryItems.length} items in your history
            </div>
          </div>

          {/* History Items */}
          <div className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Title - Item or List */}
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                        {item.type === 'item' ? (
                          <>
                            <Clock className="mr-2 text-blue-500" size={16} />
                            <button
                              onClick={() => onItemClick?.(item.itemName!)}
                              className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                            >
                              {item.itemName}
                            </button>
                          </>
                        ) : (
                          <>
                            <Bookmark className="mr-2 text-purple-500" size={16} />
                            <button
                              onClick={() => onTitleClick?.(item.listTitle)}
                              className="text-left hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                            >
                              {item.listTitle}
                            </button>
                          </>
                        )}
                      </h3>

                      {/* Action Badge */}
                      <div className="mb-3">
                        {item.type === 'item' && item.rating ? (
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                            item.rating === 'up'
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {item.rating === 'up' ? (
                              <>
                                <ThumbsUp size={12} />
                                <span>Loved it</span>
                              </>
                            ) : (
                              <>
                                <ThumbsDown size={12} />
                                <span>Not for me</span>
                              </>
                            )}
                          </span>
                        ) : (
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                            item.action === 'saved'
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
                              : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                          }`}>
                            <Bookmark size={12} />
                            <span>{item.action === 'saved' ? 'Saved list' : 'Unsaved list'}</span>
                          </span>
                        )}
                      </div>

                      {/* List Info */}
                      <div className="space-y-2">
                        {item.type === 'item' && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <span>From:</span>
                            <button
                              onClick={() => onTitleClick?.(item.listTitle)}
                              className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            >
                              {item.listTitle}
                            </button>
                          </div>
                        )}

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <span>By:</span>
                          <button
                            onClick={() => onAuthorClick?.(item.listAuthor)}
                            className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                          >
                            {item.listAuthor}
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                              {item.listCategory}
                            </span>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Calendar size={12} className="mr-1" />
                              Saved {formatDate(item.savedAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HistoryIcon size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  {safeHistoryItems.length === 0 ? 'No history yet' : 'No items match your filters'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  {safeHistoryItems.length === 0
                    ? 'Start exploring lists and rating items to build your history!'
                    : 'Try adjusting your search terms or filters.'
                  }
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}