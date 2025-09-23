'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, ThumbsUp, TrendingUp } from 'lucide-react';
import { List } from '@/types';

interface HotListsCarouselProps {
  allLists: List[];
  onTitleClick?: (title: string) => void;
}

export default function HotListsCarousel({ allLists, onTitleClick }: HotListsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Get hot lists (sorted by votes/likes, exclude rejected)
  const hotLists = allLists
    .filter(list => !list.isRejected)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 12); // Take top 12 hot lists

  const maxVisibleItems = 3;
  const maxIndex = Math.max(0, hotLists.length - maxVisibleItems);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  if (hotLists.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp size={20} className="mr-2 text-green-500" />
          Hot Lists
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              console.log('Previous slide clicked');
              prevSlide();
            }}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => {
              console.log('Next slide clicked');
              nextSlide();
            }}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRight size={16} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ width: `${3 * 192 + 2 * 16}px`, margin: "0 auto" }}>
        <div 
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (192 + 16)}px)`,
            width: `${hotLists.length * (192 + 16)}px`
          }}
        >
          {hotLists.map((list, index) => (
            <div
              key={list.id}
              className="flex-shrink-0 w-48"
            >
              <div 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-400 dark:border-gray-500 h-64 flex flex-col"
                onClick={() => {
                  console.log('Hot list clicked:', list.title);
                  onTitleClick?.(list.title);
                }}
              >
                {/* List Title */}
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-3 mb-2 min-h-[3rem]">
                  {list.title}
                </h4>
                
                {/* Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                    {list.category}
                  </span>
                </div>
                
                {/* List Items Preview */}
                <div className="space-y-1 mb-4 flex-1">
                  {list.items.slice(0, 3).map((item, itemIndex) => (
                    <div key={itemIndex} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {itemIndex + 1}. {item}
                    </div>
                  ))}
                  {list.items.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-500 italic">
                      +{list.items.length - 3} more items
                    </div>
                  )}
                </div>
                
                {/* Author and Likes */}
                <div className="flex items-center justify-between text-xs mt-auto pt-3">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <span className="truncate">by {list.author}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-1">
                    <ThumbsUp size={12} />
                    <span className="font-medium">{list.votes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      {hotLists.length > maxVisibleItems && (
        <div className="flex justify-center mt-4 space-x-1">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === index
                  ? 'bg-green-500'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}