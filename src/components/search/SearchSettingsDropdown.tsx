'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings, ChevronDown, X, Filter, SortAsc } from 'lucide-react';
import { categories } from '@/data/testData';

type SortOption = 'recent' | 'mostLikes' | 'bestOverall' | 'mostHighFives' | 'mostComments';
type ViewMode = 'grid' | 'list';

interface SearchSettings {
  category: string;
  sortBy: SortOption;
  viewMode: ViewMode;
  showRecommended?: boolean;
  showPopular?: boolean;
  minVotes?: number;
  dateRange?: 'all' | 'week' | 'month' | 'year';
}

interface SearchSettingsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  settings: SearchSettings;
  onSettingsChange: (settings: SearchSettings) => void;
  onRandomList?: () => void;
  onClearSearch?: () => void;
}

export default function SearchSettingsDropdown({
  isOpen,
  onToggle,
  settings,
  onSettingsChange,
  onRandomList,
  onClearSearch
}: SearchSettingsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onToggle]);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: '📅' },
    { value: 'mostLikes', label: 'Most Likes', icon: '👍' },
    { value: 'bestOverall', label: 'Best Overall', icon: '⭐' },
    { value: 'mostHighFives', label: 'Most Certi-fives', icon: '🖐️' },
    { value: 'mostComments', label: 'Most Comments', icon: '💬' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'Past Year' },
    { value: 'month', label: 'Past Month' },
    { value: 'week', label: 'Past Week' }
  ];

  const handleSettingChange = (key: keyof SearchSettings, value: any) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onSettingsChange({
      category: '',
      sortBy: 'recent',
      viewMode: 'grid',
      showRecommended: false,
      showPopular: false,
      minVotes: 0,
      dateRange: 'all'
    });
    // Also clear the search query
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const activeFiltersCount = [
    settings.category,
    settings.sortBy !== 'recent',
    settings.showRecommended,
    settings.showPopular,
    settings.minVotes && settings.minVotes > 0,
    settings.dateRange !== 'all'
  ].filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-slideDown">

      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-600 dark:text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Settings
            </h3>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onToggle}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">

        {/* Category Filter */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Category
          </label>
          <select
            value={settings.category}
            onChange={(e) => handleSettingChange('category', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              <SortAsc size={16} className="inline mr-2" />
              Sort By
            </label>
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Clear Filter
            </button>
          </div>
          <div className="space-y-2">
            {sortOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleSettingChange('sortBy', option.value)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  settings.sortBy === option.value
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-lg">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        </div>


        {/* Date Range */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Time Period
          </label>
          <select
            value={settings.dateRange || 'all'}
            onChange={(e) => handleSettingChange('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Advanced Filters */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Advanced Filters
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showRecommended || false}
                onChange={(e) => handleSettingChange('showRecommended', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Only show highly recommended (10+ votes)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.showPopular || false}
                onChange={(e) => handleSettingChange('showPopular', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Only show popular lists (5+ Certi-fives)</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          {onRandomList && (
            <button
              onClick={() => {
                onRandomList();
                onToggle();
              }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
            >
              <span>🎲</span>
              <span>Random List</span>
            </button>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
}