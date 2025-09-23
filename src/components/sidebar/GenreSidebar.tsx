'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { categories, categoryEmojis } from '@/data/mockData';
import { List } from '@/types';

interface GenreSidebarProps {
  allLists: List[];
  onCategorySelect: (category: string) => void;
  onRejectListsClick?: () => void;
  selectedCategory?: string;
}

export default function GenreSidebar({ 
  allLists, 
  onCategorySelect, 
  onRejectListsClick,
  selectedCategory = ''
}: GenreSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Calculate list count for each category
  const getListCount = (category: string) => {
    return allLists.filter(list => list.category === category && !list.isRejected).length;
  };

  // Get rejected lists count
  const rejectedCount = allLists.filter(list => list.isRejected).length;

  return (
    <div className="w-56 flex-shrink-0">
      <div className="fixed right-0 top-28 h-[calc(100vh-7rem)] w-56 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4">
          {/* Header with collapse toggle */}
          <div className="mb-6">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="flex items-center justify-between w-full text-left group"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Genres
              </h2>
              {isCollapsed ? (
                <ChevronDown size={20} className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
              ) : (
                <ChevronUp size={20} className="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" />
              )}
            </button>
          </div>

          {/* Categories List - Collapsible */}
          {!isCollapsed && (
            <div className="space-y-1">
              {categories.map((category) => {
                const listCount = getListCount(category);
                const isSelected = selectedCategory === category;
                
                return (
                  <button
                    key={category}
                    onClick={() => onCategorySelect(category)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      isSelected 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">
                        {categoryEmojis[category] || '📝'}
                      </span>
                      <span className="font-medium text-sm">
                        {category}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {listCount}
                    </span>
                  </button>
                );
              })}

              {/* The S#it List */}
              {onRejectListsClick && rejectedCount > 0 && (
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={onRejectListsClick}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">💩</span>
                      <span className="font-medium text-sm">
                        The S#it List
                      </span>
                    </div>
                    <span className="text-xs text-red-500 dark:text-red-400">
                      {rejectedCount}
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}