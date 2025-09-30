'use client';

import { categories, categoryEmojis } from '@/data/mockData';
import { List } from '@/types';

interface CommunitiesSidebarProps {
  allLists: List[];
  onCategorySelect: (category: string) => void;
  onRejectListsClick?: () => void;
  selectedCategory?: string;
}

export default function CommunitiesSidebar({ 
  allLists, 
  onCategorySelect, 
  onRejectListsClick,
  selectedCategory = ''
}: CommunitiesSidebarProps) {

  // Calculate list count for each category
  const getListCount = (category: string) => {
    return allLists.filter(list => list.category === category && !list.isRejected).length;
  };

  // Get rejected lists count
  const rejectedCount = allLists.filter(list => list.isRejected).length;

  return (
    <div className="w-64 flex-shrink-0">
      <div className="fixed right-0 top-24 h-[calc(100vh-6rem)] w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 z-10 flex flex-col">
        <div className="px-4 py-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Genres
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="space-y-1">
            {categories.map((category) => {
              const listCount = getListCount(category);
              const isSelected = selectedCategory === category;
            
              return (
              <button
                key={category}
                onClick={() => {
                  console.log(`[CommunitiesSidebar] Button clicked for category: "${category}"`);
                  onCategorySelect(category);
                  // Scroll main content to top
                  const mainContent = document.querySelector('.fixed.left-80');
                  if (mainContent) {
                    mainContent.scrollTop = 0;
                  }
                }}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                  isSelected 
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                title={category}
                aria-label={category}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-4">{categoryEmojis[category] || '📝'}</span>
                  <span className="text-base">{category}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {listCount}
                </span>
              </button>
            );
            })}

          {/* The S#it List */}
          {onRejectListsClick && rejectedCount > 0 && (
            <button
              onClick={() => {
                onRejectListsClick && onRejectListsClick();
                // Scroll main content to top
                const mainContent = document.querySelector('.fixed.left-80');
                if (mainContent) {
                  mainContent.scrollTop = 0;
                }
              }}
              className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              title="S#it List"
              aria-label="S#it List"
            >
              <span className="text-lg mr-4">💩</span>
              <span className="text-base">S#it List</span>
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}