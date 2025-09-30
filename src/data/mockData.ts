// Comprehensive mockData.ts with 108 lists (5 per genre + rejected lists)
// Updated to use comprehensive test dataset

import { comprehensiveTestLists, testNotifications, categories } from './comprehensiveTestData';

// Re-export everything from comprehensiveTestData
export const mockLists = comprehensiveTestLists;
export const mockNotifications = testNotifications;
export { categories };

// Basic exports that other components might need
export const categoryEmojis = {
  'Music': '🎵',
  'Movies': '🎬',
  'Books': '📚',
  'TV Shows': '📺',
  'Games': '🎮',
  'Podcasts': '🎙️',
  'Technology': '💻',
  'Food': '🍜',
  'Travel': '✈️',
  'Art': '🎨',
  'Sports': '⚽',
  'Fashion': '👗',
  'Photography': '📸',
  'Fitness': '💪',
  'Science': '🔬',
  'History': '📜',
  'Politics': '🏛️',
  'Comedy': '😂',
  'Horror': '👻',
  'Romance': '💕',
  'Adventure': '🗺️',
  'Board Games': '🎲'
};

export const mockUserProfiles = [];
export const mockSocialEvents = [];
export const mockGroups = [];

export const mockArtistData = {};
export const mockTMDbData = {};
export const achievements = [
  {
    id: 1,
    title: 'First List',
    description: 'Create your first list',
    icon: '📝',
    condition: (stats: any) => (stats?.totalLists || 0) >= 1
  },
  {
    id: 2,
    title: 'Popular Creator',
    description: 'Get 100 votes on a list',
    icon: '⭐',
    condition: (stats: any) => (stats?.totalVotes || 0) >= 100
  }
];
export const allAchievements = achievements;