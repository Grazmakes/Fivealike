'use client';

import { useState } from 'react';
import { Award, Hand, Star, X, TrendingUp, Gift } from 'lucide-react';

interface GoldHighFive {
  id: string;
  listId: number;
  listTitle: string;
  listAuthor: string;
  completedBy: string;
  completedAt: string;
  rating: 'gold' | 'silver' | 'bronze';
  completedItems: {
    itemIndex: number;
    itemName: string;
    rating: 'up' | 'down';
    completedAt: string;
  }[];
}

interface GoldHighFiveNotificationProps {
  goldHighFive: GoldHighFive;
  isVisible: boolean;
  onClose: () => void;
  onViewList?: () => void;
}

export default function GoldHighFiveNotification({
  goldHighFive,
  isVisible,
  onClose,
  onViewList
}: GoldHighFiveNotificationProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 300);
  };

  const getRatingConfig = (rating: 'gold' | 'silver' | 'bronze') => {
    switch (rating) {
      case 'gold':
        return {
          bgColor: 'from-yellow-400 to-amber-500',
          textColor: 'text-yellow-900',
          icon: Award,
          title: 'Gold High Five! 🖐️✨',
          subtitle: 'Perfect taste match!',
          description: 'You loved all 5 items!'
        };
      case 'silver':
        return {
          bgColor: 'from-slate-300 to-slate-400',
          textColor: 'text-slate-900',
          icon: Award,
          title: 'Silver High Five! 🖐️💎',
          subtitle: 'Excellent choices!',
          description: 'You loved most items!'
        };
      case 'bronze':
        return {
          bgColor: 'from-amber-600 to-amber-700',
          textColor: 'text-amber-100',
          icon: Award,
          title: 'Bronze High Five! 🖐️🏆',
          subtitle: 'Great completion!',
          description: 'You tried everything!'
        };
    }
  };

  const config = getRatingConfig(goldHighFive.rating);
  const IconComponent = config.icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md mx-4 shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Award Header */}
        <div className="text-center mb-6">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${config.bgColor} flex items-center justify-center shadow-lg`}>
            <IconComponent size={40} className={config.textColor} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {config.title}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">
            {config.subtitle}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-500">
            {config.description}
          </p>
        </div>

        {/* List Information */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Hand className="mr-2 text-blue-500" size={16} />
            List Completed
          </h3>

          <div className="space-y-2">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Title:</span>
              <p className="font-medium text-gray-900 dark:text-white">{goldHighFive.listTitle}</p>
            </div>

            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Created by:</span>
              <p className="font-medium text-gray-900 dark:text-white">{goldHighFive.listAuthor}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">Items completed:</span>
              <div className="flex items-center space-x-1">
                {goldHighFive.completedItems.map((item, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      item.rating === 'up' ? 'bg-green-400' : 'bg-red-400'
                    }`}
                    title={`${item.itemName} - ${item.rating === 'up' ? 'Loved' : 'Not for me'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reward Information */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-3">
            <Gift className="mr-2 text-purple-500" size={16} />
            <span className="font-semibold text-purple-700 dark:text-purple-300">Reward Unlocked!</span>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-purple-600 dark:text-purple-400">High Five Points:</span>
              <span className="font-bold text-purple-700 dark:text-purple-300">+{goldHighFive.rating === 'gold' ? 100 : goldHighFive.rating === 'silver' ? 75 : 50}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-purple-600 dark:text-purple-400">Creator Reward:</span>
              <span className="font-bold text-purple-700 dark:text-purple-300">Gold High Five! 🖐️</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg font-medium transition-colors"
          >
            Awesome!
          </button>

          {onViewList && (
            <button
              onClick={() => {
                onViewList();
                handleClose();
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all transform hover:scale-105"
            >
              View List
            </button>
          )}
        </div>

        {/* Fun Animation Elements */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute -top-1 -right-3 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-1 -left-1 w-5 h-5 bg-purple-400 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

// Component for showing "High Fived" badge on popular lists (10+ high fives)
export function HighFivedBadge({
  count,
  size = 'sm',
  showCount = true
}: {
  count: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (count === 0) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const countClasses = {
    sm: 'text-xs font-semibold',
    md: 'text-sm font-semibold',
    lg: 'text-base font-semibold'
  };

  return (
    <div className="relative inline-block">
      <div
        className={`inline-flex items-center space-x-1 bg-yellow-400 text-yellow-900 rounded-full font-bold cursor-help ${sizeClasses[size]}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title="🖐️ High Fived Badge - This list is popular! It means 10+ people have tried all 5 items and loved most of them, earning the creator a 'High Five' achievement."
      >
        <Hand size={iconSizes[size]} />
        <span>High Fived</span>
        {showCount && count > 1 && (
          <span className={`${countClasses[size]} ml-1`}>{count}</span>
        )}
      </div>

      {/* Enhanced Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg whitespace-nowrap">
          <div className="flex items-center space-x-1">
            <Hand size={12} />
            <span className="font-semibold">High Fived Badge</span>
          </div>
          <div className="text-xs mt-1 text-gray-200">
            This list is popular! 10+ people liked
          </div>
          <div className="text-xs text-gray-200">
            everything on the list - that&apos;s why they got High Fived!
          </div>

          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
