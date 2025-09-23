'use client';

import { List } from '@/types';
import { categories, categoryEmojis } from '@/data/mockData';

interface BrowseGenreProps {
  allLists: List[];
  onCategorySelect: (category: string) => void;
  onRejectListsClick?: () => void;
}

export default function BrowseGenre({ allLists, onCategorySelect, onRejectListsClick }: BrowseGenreProps) {
  // Calculate list count for each category
  const getListCount = (category: string) => {
    return allLists.filter(list => list.category === category).length;
  };

  // Get rejected lists count
  const rejectedCount = allLists.filter(list => list.isRejected).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Browse by Genre
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a category to discover recommendations
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const listCount = getListCount(category);
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className="list-card p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105 group"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900 transition-colors flex items-center justify-center">
                  <span className="text-3xl">{categoryEmojis[category] || '📝'}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {category}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {listCount} list{listCount !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
        
        {/* Island of Reject Lists Button */}
        {onRejectListsClick && (
          <button
            onClick={onRejectListsClick}
            className="list-card p-6 text-center hover:shadow-lg transition-all duration-200 hover:scale-105 group bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors flex items-center justify-center">
                <span className="text-3xl">🏝️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-1">
                  Island of Reject Lists
                </h3>
                <p className="text-red-600 dark:text-red-400">
                  {rejectedCount} rejected list{rejectedCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}