import { LeaderboardData, UserBadge } from '@/types';

const mockBadges: { [key: string]: UserBadge[] } = {
  '@graz': [
    { id: 'verified', type: 'verified', name: 'Verified', description: 'Verified user', icon: '✓', color: 'bg-blue-500' },
    { id: 'early_adopter', type: 'early_adopter', name: 'Early Adopter', description: 'Beta user', icon: '🚀', color: 'bg-purple-500' }
  ],
  '@moviebuff': [
    { id: 'expert', type: 'expert', name: 'Movie Expert', description: 'Cinema expertise', icon: '🎬', color: 'bg-amber-500' },
    { id: 'list_leader', type: 'list_leader', name: 'List Leader', description: 'Top list creator', icon: '👑', color: 'bg-yellow-500' }
  ],
  '@musiclover': [
    { id: 'verified', type: 'verified', name: 'Verified', description: 'Verified user', icon: '✓', color: 'bg-blue-500' }
  ],
  '@bookworm': [
    { id: 'top_contributor', type: 'top_contributor', name: 'Top Contributor', description: 'Amazing contributor', icon: '⭐', color: 'bg-green-500' }
  ],
  '@techguru': [
    { id: 'moderator', type: 'moderator', name: 'Moderator', description: 'Community moderator', icon: '🛡️', color: 'bg-red-500' }
  ],
  '@foodie': [],
  '@traveler': [],
  '@gamer': [
    { id: 'early_adopter', type: 'early_adopter', name: 'Early Adopter', description: 'Beta user', icon: '🚀', color: 'bg-purple-500' }
  ]
};

// 24 Hour Leaderboards
const tasteMakers24h: LeaderboardData = {
  timePeriod: '24h',
  category: 'taste_makers',
  entries: [
    {
      rank: 1,
      username: '@moviebuff',
      avatar: '🎬',
      avatarImage: '',
      badges: mockBadges['@moviebuff'],
      score: 342,
      scoreType: 'saves',
      featuredList: {
        id: 2,
        title: 'If you like "Inception", try these FIVE ALIKE...',
        category: 'Movies'
      },
      change: 'up'
    },
    {
      rank: 2,
      username: '@musiclover',
      avatar: '🎵',
      avatarImage: '',
      badges: mockBadges['@musiclover'],
      score: 289,
      scoreType: 'saves',
      featuredList: {
        id: 1,
        title: 'If you like "The Beatles", try these FIVE ALIKE...',
        category: 'Music'
      },
      change: 'down'
    },
    {
      rank: 3,
      username: '@bookworm',
      avatar: '📚',
      avatarImage: '',
      badges: mockBadges['@bookworm'],
      score: 234,
      scoreType: 'saves',
      featuredList: {
        id: 5,
        title: 'If you like "Harry Potter", try these FIVE ALIKE...',
        category: 'Books'
      },
      change: 'new'
    },
    {
      rank: 4,
      username: '@techguru',
      avatar: '💻',
      avatarImage: '',
      badges: mockBadges['@techguru'],
      score: 187,
      scoreType: 'saves',
      featuredList: {
        id: 8,
        title: 'If you like "iPhone", try these FIVE ALIKE...',
        category: 'Technology'
      },
      change: 'same'
    },
    {
      rank: 5,
      username: '@foodie',
      avatar: '🍕',
      avatarImage: '',
      badges: mockBadges['@foodie'],
      score: 156,
      scoreType: 'saves',
      featuredList: {
        id: 12,
        title: 'If you like "Pizza", try these FIVE ALIKE...',
        category: 'Food'
      },
      change: 'up'
    }
  ],
  lastUpdated: new Date().toISOString()
};

const trendSetters24h: LeaderboardData = {
  timePeriod: '24h',
  category: 'trend_setters',
  entries: [
    {
      rank: 1,
      username: '@graz',
      avatar: '🚀',
      avatarImage: '',
      badges: mockBadges['@graz'],
      score: 156,
      scoreType: 'votes',
      featuredList: {
        id: 15,
        title: 'If you like "AI", try these FIVE ALIKE...',
        category: 'Technology'
      },
      change: 'new'
    },
    {
      rank: 2,
      username: '@traveler',
      avatar: '✈️',
      avatarImage: '',
      badges: mockBadges['@traveler'],
      score: 134,
      scoreType: 'votes',
      featuredList: {
        id: 18,
        title: 'If you like "Paris", try these FIVE ALIKE...',
        category: 'Travel'
      },
      change: 'up'
    },
    {
      rank: 3,
      username: '@gamer',
      avatar: '🎮',
      avatarImage: '',
      badges: mockBadges['@gamer'],
      score: 98,
      scoreType: 'votes',
      featuredList: {
        id: 20,
        title: 'If you like "Zelda", try these FIVE ALIKE...',
        category: 'Games'
      },
      change: 'same'
    }
  ],
  lastUpdated: new Date().toISOString()
};


const communityHeroes24h: LeaderboardData = {
  timePeriod: '24h',
  category: 'community_heroes',
  entries: [
    {
      rank: 1,
      username: '@graz',
      avatar: '🚀',
      avatarImage: '',
      badges: mockBadges['@graz'],
      score: 47,
      scoreType: 'high_fives',
      featuredList: {
        id: 30,
        title: 'If you like "Community Building", try these FIVE ALIKE...',
        category: 'Technology'
      },
      change: 'same'
    },
    {
      rank: 2,
      username: '@techguru',
      avatar: '💻',
      avatarImage: '',
      badges: mockBadges['@techguru'],
      score: 38,
      scoreType: 'comments',
      featuredList: {
        id: 31,
        title: 'If you like "Helpful Apps", try these FIVE ALIKE...',
        category: 'Technology'
      },
      change: 'up'
    }
  ],
  lastUpdated: new Date().toISOString()
};

const qualityCreators24h: LeaderboardData = {
  timePeriod: '24h',
  category: 'quality_creators',
  entries: [
    {
      rank: 1,
      username: '@moviebuff',
      avatar: '🎬',
      avatarImage: '',
      badges: mockBadges['@moviebuff'],
      score: 234,
      scoreType: 'votes',
      featuredList: {
        id: 35,
        title: 'If you like "Criterion Collection", try these FIVE ALIKE...',
        category: 'Movies'
      },
      change: 'same'
    },
    {
      rank: 2,
      username: '@bookworm',
      avatar: '📚',
      avatarImage: '',
      badges: mockBadges['@bookworm'],
      score: 198,
      scoreType: 'votes',
      featuredList: {
        id: 36,
        title: 'If you like "Literary Fiction", try these FIVE ALIKE...',
        category: 'Books'
      },
      change: 'up'
    }
  ],
  lastUpdated: new Date().toISOString()
};

// Mock data structure for different time periods
export const mockLeaderboardData = {
  '24h': {
    taste_makers: tasteMakers24h,
    trend_setters: trendSetters24h,
    community_heroes: communityHeroes24h,
    quality_creators: qualityCreators24h
  },
  '7d': {
    taste_makers: { ...tasteMakers24h, timePeriod: '7d' as const },
    trend_setters: { ...trendSetters24h, timePeriod: '7d' as const },
    community_heroes: { ...communityHeroes24h, timePeriod: '7d' as const },
    quality_creators: { ...qualityCreators24h, timePeriod: '7d' as const }
  },
  '30d': {
    taste_makers: { ...tasteMakers24h, timePeriod: '30d' as const },
    trend_setters: { ...trendSetters24h, timePeriod: '30d' as const },
    community_heroes: { ...communityHeroes24h, timePeriod: '30d' as const },
    quality_creators: { ...qualityCreators24h, timePeriod: '30d' as const }
  },
  'all': {
    taste_makers: { ...tasteMakers24h, timePeriod: 'all' as const },
    trend_setters: { ...trendSetters24h, timePeriod: 'all' as const },
    community_heroes: { ...communityHeroes24h, timePeriod: 'all' as const },
    quality_creators: { ...qualityCreators24h, timePeriod: 'all' as const }
  }
};