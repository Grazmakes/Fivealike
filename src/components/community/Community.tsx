'use client';

import { useState } from 'react';
import { Users as UsersIcon } from 'lucide-react';
import { UserPlus, UserMinus, Search, Users, UserCheck, ArrowLeft, MessageCircle } from 'lucide-react';

interface CommunityProps {
  followedUsers: string[];
  setFollowedUsers: (users: string[]) => void;
  onAuthorClick?: (author: string) => void;
  onMessage?: (username: string) => void;
  onBack?: () => void;
}

const allUsers = [
  { username: '@musiclover', bio: 'Always discovering new sounds. Love indie rock, jazz, and everything in between.', listsCreated: 23, avatar: 'M', followers: 245, following: 89 },
  { username: '@bookworm', bio: 'Avid reader and literature enthusiast. Love discovering hidden gems.', listsCreated: 31, avatar: 'B', followers: 189, following: 145 },
  { username: '@readingcorner', bio: 'Book club organizer and fiction lover. Always has great recommendations.', listsCreated: 18, avatar: 'R', followers: 167, following: 92 },
  { username: '@indievibes', bio: 'Indie music curator with eclectic taste. Always finding new artists.', listsCreated: 45, avatar: 'I', followers: 312, following: 134 },
  { username: '@artlover', bio: 'Museum enthusiast and contemporary art collector.', listsCreated: 12, avatar: 'A', followers: 98, following: 67 },
  { username: '@techblogger', bio: 'Technology writer and gadget reviewer. Loves emerging tech.', listsCreated: 27, avatar: 'T', followers: 421, following: 78 },
  { username: '@fitnessguru', bio: 'Personal trainer and nutrition expert. Healthy living advocate.', listsCreated: 19, avatar: 'F', followers: 234, following: 56 },
  { username: '@traveladdict', bio: 'Digital nomad sharing travel experiences from around the globe.', listsCreated: 38, avatar: 'T', followers: 567, following: 234 },
  { username: '@cinephile', bio: 'Film critic and movie buff. Always hunting for the next great film.', listsCreated: 67, avatar: 'C', followers: 789, following: 156 },
  { username: '@tvfan', bio: 'Television connoisseur with a taste for complex narratives.', listsCreated: 41, avatar: 'T', followers: 345, following: 123 },
  { username: '@comedyking', bio: 'Comedy enthusiast who loves shows that make you laugh and cry.', listsCreated: 29, avatar: 'C', followers: 456, following: 167 },
  { username: '@gamereview', bio: 'Professional game reviewer covering indie and AAA titles.', listsCreated: 52, avatar: 'G', followers: 612, following: 89 },
  { username: '@foodielife', bio: 'Restaurant explorer and home cooking enthusiast.', listsCreated: 34, avatar: 'F', followers: 289, following: 178 },
  { username: '@artcurator', bio: 'Gallery curator specializing in modern and contemporary art.', listsCreated: 25, avatar: 'A', followers: 167, following: 92 },
];

// Mock some users as already following for initial state
const initialFollowedUsers = ['@musiclover', '@bookworm', '@readingcorner', '@indievibes', '@artlover'];

type TabType = 'followers' | 'following' | 'suggested';

export default function Community({ followedUsers, setFollowedUsers, onAuthorClick, onMessage, onBack }: CommunityProps) {
  const [activeTab, setActiveTab] = useState<TabType>('following');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFollow = (username: string) => {
    if (followedUsers.includes(username)) {
      setFollowedUsers(followedUsers.filter(u => u !== username));
    } else {
      setFollowedUsers([...followedUsers, username]);
    }
  };

  // Get users we're following
  const followingUsers = allUsers.filter(user => followedUsers.includes(user.username));
  
  // Mock followers (users who follow us)
  const mockFollowers = allUsers.slice(2, 7).map(user => ({
    ...user,
    username: user.username + '_follower'
  }));
  
  // Suggested users (users we're not following yet)
  const suggestedUsers = allUsers.filter(user => !followedUsers.includes(user.username));

  // Get active list based on tab
  const getActiveList = () => {
    switch (activeTab) {
      case 'followers':
        return mockFollowers;
      case 'following':
        return followingUsers;
      case 'suggested':
      default:
        return suggestedUsers;
    }
  };

  // Filter users based on search query
  const filteredUsers = searchQuery.trim() 
    ? getActiveList().filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getActiveList();

  const renderUserCard = (user: any, isFollower = false) => {
    const isFollowing = followedUsers.includes(user.username);

    return (
      <div key={user.username} className="flex items-center justify-between p-4 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
        <div className="flex items-center space-x-4 flex-1">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {user.avatar}
            </span>
          </div>

          <div className="flex-1">
            <h3
              className="font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
              onClick={() => onAuthorClick?.(user.username)}
            >
              {user.username}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user.bio}
            </p>
          </div>
        </div>

        {!isFollower && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onMessage?.(user.username)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
              title={`Message ${user.username}`}
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={() => handleFollow(user.username)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isFollowing
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <UsersIcon className="text-green-600 mr-3" size={28} />
            Community
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with other recommendation enthusiasts
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center space-x-8 py-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockFollowers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{followingUsers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Following</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{suggestedUsers.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Suggested</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex bg-green-100 dark:bg-green-900/20 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('following')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'following'
                ? 'bg-green-600 text-white'
                : 'text-green-700 dark:text-green-300'
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveTab('followers')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'followers'
                ? 'bg-green-600 text-white'
                : 'text-green-700 dark:text-green-300'
            }`}
          >
            Followers
          </button>
          <button
            onClick={() => setActiveTab('suggested')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              activeTab === 'suggested'
                ? 'bg-green-600 text-white'
                : 'text-green-700 dark:text-green-300'
            }`}
          >
            Suggested
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      {/* User List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-400 dark:border-gray-500">
        {filteredUsers.length > 0 ? (
          <div>
            {filteredUsers.map(user => renderUserCard(user, activeTab === 'followers'))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users size={40} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {searchQuery ? 'No results found' : `No ${activeTab} yet`}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try different search terms' : 'Check back later!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}