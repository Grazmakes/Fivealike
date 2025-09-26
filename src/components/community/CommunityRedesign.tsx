'use client';

import { useState } from 'react';
import {
  Users,
  Search,
  MessageCircle,
  UserPlus,
  UserMinus,
  Heart,
  MoreHorizontal,
  TrendingUp,
  Award,
  Clock,
  Filter
} from 'lucide-react';

interface CommunityRedesignProps {
  followedUsers: string[];
  setFollowedUsers: (users: string[]) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
}

const allUsers = [
  {
    username: '@musiclover',
    displayName: 'Alex Chen',
    bio: 'Always discovering new sounds. Love indie rock, jazz, and everything in between.',
    listsCreated: 23,
    avatar: 'M',
    followers: 245,
    following: 89,
    recentActivity: 'Created "Summer Indie Vibes" 2 hours ago',
    badges: ['Curator', 'Early Adopter'],
    verified: true,
    specialty: 'Indie Rock'
  },
  {
    username: '@bookworm',
    displayName: 'Emma Rodriguez',
    bio: 'Avid reader and literature enthusiast. Love discovering hidden gems.',
    listsCreated: 31,
    avatar: 'E',
    followers: 189,
    following: 145,
    recentActivity: 'Reviewed "The Seven Moons of Maali Almeida" 1 day ago',
    badges: ['Bookclub Leader'],
    verified: false,
    specialty: 'Contemporary Fiction'
  },
  {
    username: '@indievibes',
    displayName: 'Jordan Kim',
    bio: 'Indie music curator with eclectic taste. Always finding new artists.',
    listsCreated: 45,
    avatar: 'J',
    followers: 312,
    following: 134,
    recentActivity: 'Shared "Bedroom Pop Discoveries" 3 hours ago',
    badges: ['Top Contributor', 'Trendsetter'],
    verified: true,
    specialty: 'Indie Pop'
  },
  {
    username: '@cinephile',
    displayName: 'Maya Patel',
    bio: 'Film critic and movie buff. Always hunting for the next great film.',
    listsCreated: 67,
    avatar: 'M',
    followers: 789,
    following: 156,
    recentActivity: 'Updated "Underrated Sci-Fi Gems" 5 hours ago',
    badges: ['Film Expert', 'Critic'],
    verified: true,
    specialty: 'Sci-Fi Films'
  },
  {
    username: '@artcurator',
    displayName: 'Riley Thompson',
    bio: 'Gallery curator specializing in modern and contemporary art.',
    listsCreated: 25,
    avatar: 'R',
    followers: 167,
    following: 92,
    recentActivity: 'Created "Emerging Digital Artists" 1 day ago',
    badges: ['Art Expert'],
    verified: false,
    specialty: 'Contemporary Art'
  },
  {
    username: '@techblogger',
    displayName: 'Sam Johnson',
    bio: 'Technology writer and gadget reviewer. Loves emerging tech.',
    listsCreated: 27,
    avatar: 'S',
    followers: 421,
    following: 78,
    recentActivity: 'Posted "AI Tools for Creatives" 6 hours ago',
    badges: ['Tech Guru'],
    verified: true,
    specialty: 'Technology'
  }
];

const featuredCommunityLists = [
  {
    title: "Community Favorites: Books 2024",
    author: "@bookworm",
    likes: 234,
    collaborators: 8,
    category: "Books"
  },
  {
    title: "Best Indie Discoveries This Month",
    author: "@indievibes",
    likes: 189,
    collaborators: 12,
    category: "Music"
  },
  {
    title: "Hidden Netflix Gems",
    author: "@cinephile",
    likes: 456,
    collaborators: 15,
    category: "Movies"
  }
];

type TabType = 'following' | 'discover' | 'trending' | 'featured';

export default function CommunityRedesign({
  followedUsers,
  setFollowedUsers,
  onAuthorClick,
  onMessage
}: CommunityRedesignProps) {
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'followers' | 'activity' | 'lists'>('followers');

  const handleFollow = (username: string) => {
    if (followedUsers.includes(username)) {
      setFollowedUsers(followedUsers.filter(u => u !== username));
    } else {
      setFollowedUsers([...followedUsers, username]);
    }
  };

  const getFilteredUsers = () => {
    let users = [...allUsers];

    // Filter by tab
    if (activeTab === 'following') {
      users = users.filter(user => followedUsers.includes(user.username));
    } else if (activeTab === 'trending') {
      users = users.sort((a, b) => b.followers - a.followers).slice(0, 6);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      users = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    users.sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return b.followers - a.followers;
        case 'lists':
          return b.listsCreated - a.listsCreated;
        case 'activity':
        default:
          return 0; // Could implement actual activity sorting
      }
    });

    return users;
  };

  const renderUserCard = (user: typeof allUsers[0]) => {
    const isFollowing = followedUsers.includes(user.username);

    return (
      <div key={user.username} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-green-300 dark:hover:border-green-600">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                <span className="text-lg font-bold text-white">
                  {user.avatar}
                </span>
              </div>
              {user.verified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Award size={12} className="text-white" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3
                  className="font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors"
                  onClick={() => onAuthorClick?.(user.username)}
                >
                  {user.displayName}
                </h3>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.username}</p>
            </div>
          </div>

          <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Specialty & Badges */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
            {user.specialty}
          </span>
          {user.badges.map(badge => (
            <span key={badge} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
              {badge}
            </span>
          ))}
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
          {user.bio}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Users size={14} />
              <span>{user.followers.toLocaleString()} followers</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart size={14} />
              <span>{user.listsCreated} lists</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <Clock size={14} className="text-gray-400 flex-shrink-0" />
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
            {user.recentActivity}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleFollow(user.username)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isFollowing
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isFollowing ? (
              <span className="flex items-center justify-center space-x-2">
                <UserMinus size={16} />
                <span>Following</span>
              </span>
            ) : (
              <span className="flex items-center justify-center space-x-2">
                <UserPlus size={16} />
                <span>Follow</span>
              </span>
            )}
          </button>

          <button
            onClick={() => onMessage?.(user.username)}
            className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors border border-gray-300 dark:border-gray-600"
          >
            <MessageCircle size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderFeaturedLists = () => (
    <div className="space-y-4">
      {featuredCommunityLists.map((list, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 hover:text-green-600 cursor-pointer">
                {list.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                by <span className="text-green-600 dark:text-green-400 font-medium cursor-pointer hover:underline">{list.author}</span>
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center space-x-1">
                  <Heart size={14} />
                  <span>{list.likes}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{list.collaborators} collaborators</span>
                </span>
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              {list.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center">
          <Users className="text-green-600 mr-3" size={36} />
          Five Alike Community
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Connect with fellow curators, discover amazing lists, and find people who share your interests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{followedUsers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">1.2k</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">3.4k</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Lists Created</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">15k</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Recommendations</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="flex bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-1">
          {[
            { key: 'discover', label: 'Discover', icon: Users },
            { key: 'following', label: 'Following', icon: UserPlus },
            { key: 'trending', label: 'Trending', icon: TrendingUp },
            { key: 'featured', label: 'Featured Lists', icon: Award }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors ${
                activeTab === key
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search community..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {activeTab !== 'featured' && (
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            >
              <option value="followers">Most Followers</option>
              <option value="lists">Most Lists</option>
              <option value="activity">Recent Activity</option>
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'featured' ? (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Community Featured Lists</h2>
          {renderFeaturedLists()}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {getFilteredUsers().map(renderUserCard)}
        </div>
      )}

      {/* Empty State */}
      {getFilteredUsers().length === 0 && activeTab !== 'featured' && (
        <div className="text-center py-16">
          <Users size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {searchQuery ? 'No users found' : 'No users in this section'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            {searchQuery
              ? 'Try adjusting your search terms to find more community members'
              : 'Check back later or try exploring other sections'
            }
          </p>
        </div>
      )}
    </div>
  );
}