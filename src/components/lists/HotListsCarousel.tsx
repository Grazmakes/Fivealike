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
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Get hot lists (sorted by votes/likes, exclude rejected)
  const hotLists = allLists
    .filter(list => !list.isRejected)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 12); // Take top 12 hot lists

  const maxVisibleItems = 3;
  const maxIndex = Math.max(0, hotLists.length - maxVisibleItems);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= maxIndex) {
        // Smooth wrap-around transition
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600); // Match transition duration
        return 0; // Wrap to first screen
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // Smooth wrap-around transition
        setIsTransitioning(true);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600); // Match transition duration
        return maxIndex; // Wrap to last screen
      }
      return prevIndex - 1;
    });
  };

  if (hotLists.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
          <TrendingUp size={24} className="mr-2 text-green-500" />
          Hot Lists
        </h3>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Left Chevron */}
        <button
          onClick={() => {
            console.log('Previous slide clicked');
            prevSlide();
          }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft size={24} className="text-gray-600 dark:text-gray-400" />
        </button>

        {/* Carousel Container */}
        <div className="overflow-hidden" style={{ width: `${3 * 192 + 2 * 16}px` }}>
        <div
          className={`flex gap-4 transition-transform ease-in-out ${
            isTransitioning ? 'duration-600' : 'duration-500'
          }`}
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
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-400 dark:border-gray-500 h-72 flex flex-col"
                onClick={() => {
                  console.log('Hot list clicked:', list.title);
                  onTitleClick?.(list.title);
                }}
              >
                {/* List Title */}
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-3 mb-3 h-16 flex items-start">
                  {list.title}
                </h4>

                {/* Category */}
                <div className="flex items-center justify-start mb-3">
                  <span className={`text-xs text-white font-medium px-2 py-1 rounded-full h-6 flex items-center justify-center ${
                    list.category === 'Movies' ? 'bg-red-500' :
                    list.category === 'TV Shows' ? 'bg-purple-500' :
                    list.category === 'Books' ? 'bg-green-600' :
                    list.category === 'Music' ? 'bg-pink-500' :
                    list.category === 'Games' ? 'bg-orange-500' :
                    list.category === 'Food & Drink' ? 'bg-yellow-500' :
                    list.category === 'Travel' ? 'bg-cyan-500' :
                    list.category === 'Technology' ? 'bg-indigo-500' :
                    list.category === 'Health & Fitness' ? 'bg-emerald-500' :
                    list.category === 'Arts & Crafts' ? 'bg-violet-500' :
                    list.category === 'Sports' ? 'bg-blue-600' :
                    'bg-gray-500'
                  }`}>
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

        {/* Right Chevron */}
        <button
          onClick={() => {
            console.log('Next slide clicked');
            nextSlide();
          }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight size={24} className="text-gray-600 dark:text-gray-400" />
        </button>
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