'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, TrendingUp, Award, Gem, Heart, Star, Trophy } from 'lucide-react';
import { LeaderboardData, LeaderboardEntry } from '@/types';
import { BadgeList } from '@/components/badges/Badge';
import { mockLeaderboardData } from '@/data/mockLeaderboardData';

interface LeaderboardPageProps {
  onBack: () => void;
  onAuthorClick?: (author: string) => void;
  onTitleClick?: (title: string) => void;
  onCategoryClick?: (category: string) => void;
}

const leaderboardCategories = [
  {
    id: 'taste_makers' as const,
    name: 'Taste Makers',
    icon: <TrendingUp size={16} />,
    description: 'Users whose lists get saved the most - they know what people want!'
  },
  {
    id: 'trend_setters' as const,
    name: 'Trend Setters', 
    icon: <Star size={16} />,
    description: 'First to create lists about topics that become popular - the trendsetters!'
  },
  {
    id: 'community_heroes' as const,
    name: 'Community Heroes',
    icon: <Heart size={16} />,
    description: 'Most helpful community members - giving high-fives and great comments!'
  },
  {
    id: 'quality_creators' as const,
    name: 'Quality Creators',
    icon: <Award size={16} />,
    description: 'Consistently create high-quality lists that get the most upvotes!'
  }
];

const timePeriods = [
  { id: '24h' as const, name: '24h' },
  { id: '7d' as const, name: '7d' },
  { id: '30d' as const, name: '30d' },
  { id: 'all' as const, name: 'All Time' }
];

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return <div className="text-3xl">🥇</div>;
    case 2:
      return <div className="text-3xl">🥈</div>;
    case 3:
      return <div className="text-3xl">🥉</div>;
    default:
      return <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-bold text-sm">#{rank}</div>;
  }
};

const getScoreDisplay = (entry: LeaderboardEntry) => {
  const icons = {
    saves: '📥',
    high_fives: '🖐️',
    lists: '📝',
    comments: '💬',
    votes: '👍'
  };
  
  const labels = {
    saves: 'saves',
    high_fives: 'high fives',
    lists: 'lists',
    comments: 'comments',
    votes: 'votes'
  };

  return `${icons[entry.scoreType]} ${entry.score} ${labels[entry.scoreType]}`;
};

const getCategoryEmoji = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    'Music': '🎵',
    'Movies': '🎬',
    'Books': '📚',
    'TV Shows': '📺',
    'Games': '🎮',
    'Technology': '💻',
    'Food': '🍕',
    'Travel': '✈️',
    'Art': '🎨',
    'Sports': '⚽',
    'Fashion': '👗',
    'Photography': '📸'
  };
  return categoryMap[category] || '📂';
};

export default function LeaderboardPage({ onBack, onAuthorClick, onTitleClick, onCategoryClick }: LeaderboardPageProps) {
  const [activeCategory, setActiveCategory] = useState<'taste_makers' | 'trend_setters' | 'community_heroes' | 'quality_creators'>('taste_makers');
  const [activeTimePeriod, setActiveTimePeriod] = useState<'24h' | '7d' | '30d' | 'all'>('24h');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    // Load leaderboard data based on selected category and time period
    const data = mockLeaderboardData[activeTimePeriod][activeCategory];
    setLeaderboardData(data);
  }, [activeCategory, activeTimePeriod]);

  return (
    <div className="space-y-6 px-4 lg:px-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center mb-2">
            <Trophy className="text-green-500 mr-2" size={28} />
            Leaderboards
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Celebrating our amazing community contributors
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-8">        
        {/* Time Period Selector */}
        <div className="flex gap-2">
          {timePeriods.map((period) => (
            <button
              key={period.id}
              onClick={() => setActiveTimePeriod(period.id)}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                activeTimePeriod === period.id
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 overflow-visible">
        {leaderboardCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`group relative flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {category.icon}
            <span className="text-left">{category.name}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
              {category.description}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
            </div>
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      {leaderboardData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {leaderboardCategories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Updated {new Date(leaderboardData.lastUpdated).toLocaleString()}
            </p>
          </div>

          {leaderboardData.entries.map((entry) => (
            <div
              key={`${entry.username}-${entry.rank}`}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-green-200 dark:hover:border-green-700 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  {getRankBadge(entry.rank)}
                </div>
                
                {/* User Avatar */}
                {entry.avatarImage ? (
                  <Image
                    src={entry.avatarImage}
                    alt=""
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl flex-shrink-0">
                    {entry.avatar}
                  </div>
                )}
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 
                      className="font-bold text-gray-900 dark:text-white text-lg truncate hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors"
                      onClick={() => onAuthorClick?.(entry.username)}
                    >
                      {entry.username}
                    </h3>
                    <div className="flex-shrink-0">
                      <BadgeList badges={entry.badges.slice(0, 2)} size="small" />
                    </div>
                  </div>
                  
                  {entry.featuredList && (
                    <div className="space-y-1">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        posted in {getCategoryEmoji(entry.featuredList.category)} 
                        <span 
                          className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors"
                          onClick={() => onCategoryClick?.(entry.featuredList!.category)}
                        >
                          /{entry.featuredList.category.toLowerCase()}
                        </span>
                      </div>
                      <div 
                        className="text-green-600 dark:text-green-400 font-medium hover:underline cursor-pointer text-sm"
                        onClick={() => onTitleClick?.(entry.featuredList!.title)}
                      >
                        {entry.featuredList.title}
                      </div>
                    </div>
                  )}
                </div>

                {/* Score */}
                <div className="flex items-center gap-1 text-lg font-bold text-green-600 dark:text-green-400 flex-shrink-0">
                  <TrendingUp size={16} />
                  <span>{entry.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!leaderboardData?.entries.length && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏆</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No rankings yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to contribute and claim the top spot!
          </p>
        </div>
      )}
    </div>
  );
}
