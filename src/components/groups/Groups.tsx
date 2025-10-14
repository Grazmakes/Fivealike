'use client';

import { useState } from 'react';
import { Users, Plus, Search, Filter, Star, Calendar, MessageSquare, TrendingUp, ArrowLeft, Shapes } from 'lucide-react';
import { TopicGroup, User, List } from '@/types';
import CreateGroupModal from './CreateGroupModal';
import GroupView from './GroupView';

interface GroupsProps {
  userProfile: User;
  onCreateGroup?: () => void;
  onJoinGroup?: (groupId: string) => void;
  onLeaveGroup?: (groupId: string) => void;
  onGroupClick?: (groupId: string) => void;
  allLists?: List[];
  onBack?: () => void;
  onTitleClick?: (title: string) => void;
}

const mockGroups: TopicGroup[] = [
  {
    id: 'sci-fi-enthusiasts',
    name: 'Sci-Fi Enthusiasts',
    description: 'Passionate fans of science fiction movies, books, and TV shows. Share your favorite discoveries and debate the classics!',
    topic: 'Science Fiction',
    category: 'Movies & TV',
    founder: 'graz',
    createdAt: '2024-01-15T10:00:00Z',
    memberCount: 127,
    members: [],
    isPublic: true,
    requiresApproval: false,
    tags: ['sci-fi', 'movies', 'books', 'tv-shows', 'future'],
    rules: [
      'Keep discussions respectful and on-topic',
      'Use spoiler tags for recent releases',
      'Share quality recommendations with context'
    ],
    featuredLists: [1, 5, 12],
    recentActivity: [
      {
        id: 'activity-1',
        type: 'list_shared',
        actor: '@cinephile',
        content: 'shared "Best Hard Sci-Fi Movies of 2024"',
        timestamp: '2024-02-10T14:30:00Z'
      },
      {
        id: 'activity-2',
        type: 'member_joined',
        actor: '@bookworm',
        content: 'joined the group',
        timestamp: '2024-02-10T12:15:00Z'
      }
    ],
    stats: {
      totalLists: 45,
      totalDiscussions: 23,
      activeMembers: 89,
      weeklyActivity: 156
    }
  },
  {
    id: 'indie-game-lovers',
    name: 'Indie Game Lovers',
    description: 'Discover hidden gems and support independent game developers. From pixel art platformers to innovative puzzlers!',
    topic: 'Indie Games',
    category: 'Games',
    founder: '@gamereview',
    createdAt: '2024-01-20T16:00:00Z',
    memberCount: 89,
    members: [],
    isPublic: true,
    requiresApproval: false,
    tags: ['indie', 'games', 'steam', 'itch-io', 'gamedev'],
    rules: [
      'Support indie developers with constructive feedback',
      'Share lesser-known games and hidden gems',
      'Include platform availability in recommendations'
    ],
    featuredLists: [8, 15, 22],
    recentActivity: [
      {
        id: 'activity-3',
        type: 'discussion_started',
        actor: '@pixelart_fan',
        content: 'started "What makes a great indie puzzle game?"',
        timestamp: '2024-02-10T11:00:00Z'
      }
    ],
    stats: {
      totalLists: 32,
      totalDiscussions: 18,
      activeMembers: 67,
      weeklyActivity: 98
    }
  },
  {
    id: 'horror-movie-buffs',
    name: 'Horror Movie Buffs',
    description: 'For those who love a good scare! From classic horror to modern thrillers, share what keeps you up at night.',
    topic: 'Horror Movies',
    category: 'Movies & TV',
    founder: '@screamqueen',
    createdAt: '2024-01-25T20:00:00Z',
    memberCount: 156,
    members: [],
    isPublic: true,
    requiresApproval: false,
    tags: ['horror', 'thriller', 'supernatural', 'slasher', 'psychological'],
    rules: [
      'Use content warnings for extreme content',
      'Respect different horror preferences',
      'No spoilers without proper tags'
    ],
    featuredLists: [3, 9, 18],
    recentActivity: [
      {
        id: 'activity-4',
        type: 'event_created',
        actor: '@midnight_viewer',
        content: 'created "October Horror Marathon Planning"',
        timestamp: '2024-02-09T22:30:00Z'
      }
    ],
    stats: {
      totalLists: 67,
      totalDiscussions: 31,
      activeMembers: 134,
      weeklyActivity: 203
    }
  },
  {
    id: 'cozy-reads',
    name: 'Cozy Reads',
    description: 'Comfort books, cozy mysteries, and heartwarming stories. Perfect recommendations for a peaceful reading experience.',
    topic: 'Cozy Literature',
    category: 'Books',
    founder: '@readingcorner',
    createdAt: '2024-02-01T14:00:00Z',
    memberCount: 78,
    members: [],
    isPublic: true,
    requiresApproval: false,
    tags: ['cozy', 'comfort-reads', 'mysteries', 'romance', 'feel-good'],
    rules: [
      'Keep recommendations positive and uplifting',
      'Include content warnings for sensitive topics',
      'Share what makes a book "cozy" for you'
    ],
    featuredLists: [6, 11, 19],
    recentActivity: [
      {
        id: 'activity-5',
        type: 'list_shared',
        actor: '@teatime_reader',
        content: 'shared "Perfect Books for Rainy Days"',
        timestamp: '2024-02-10T09:15:00Z'
      }
    ],
    stats: {
      totalLists: 28,
      totalDiscussions: 15,
      activeMembers: 56,
      weeklyActivity: 84
    }
  }
];

type GroupsTab = 'discover' | 'my-groups' | 'popular';
type SortBy = 'members' | 'activity' | 'newest' | 'name';

export default function Groups({ userProfile, onCreateGroup, onJoinGroup, onLeaveGroup, onGroupClick, allLists = [], onBack, onTitleClick }: GroupsProps) {
  const [activeTab, setActiveTab] = useState<GroupsTab>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortBy>('members');
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groups, setGroups] = useState<TopicGroup[]>(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [userGroupIds, setUserGroupIds] = useState<string[]>(['sci-fi-enthusiasts', 'indie-game-lovers']); // User is member of first 2 groups

  // Get user's groups based on IDs
  const userGroups = groups.filter(group => userGroupIds.includes(group.id));
  
  const categories = ['all', 'Movies & TV', 'Books', 'Games', 'Music', 'Food', 'Travel', 'Tech'];

  const filteredGroups = groups
    .filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'members': return b.memberCount - a.memberCount;
        case 'activity': return b.stats.weeklyActivity - a.stats.weeklyActivity;
        case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const getActiveGroups = () => {
    switch (activeTab) {
      case 'my-groups': return userGroups;
      case 'popular': return filteredGroups.slice(0, 10);
      case 'discover':
      default: return filteredGroups;
    }
  };

  const isUserMember = (groupId: string) => {
    return userGroupIds.includes(groupId);
  };

  const handleJoinGroup = (groupId: string) => {
    if (!isUserMember(groupId)) {
      setUserGroupIds(prev => [...prev, groupId]);
      
      // Update group member count and add user to members
      setGroups(prev => prev.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            memberCount: group.memberCount + 1,
            members: [...group.members, {
              username: userProfile.username,
              role: 'member',
              joinedAt: new Date().toISOString(),
              contributionScore: 0,
              badges: [],
              isActive: true,
              lastSeen: new Date().toISOString()
            }],
            recentActivity: [{
              id: `activity-${Date.now()}`,
              type: 'member_joined',
              actor: userProfile.username,
              content: 'joined the group',
              timestamp: new Date().toISOString()
            }, ...group.recentActivity.slice(0, 4)],
            stats: {
              ...group.stats,
              activeMembers: group.stats.activeMembers + 1,
              weeklyActivity: group.stats.weeklyActivity + 1
            }
          };
        }
        return group;
      }));
    }
    onJoinGroup?.(groupId);
  };

  const handleLeaveGroup = (groupId: string) => {
    if (isUserMember(groupId)) {
      setUserGroupIds(prev => prev.filter(id => id !== groupId));
      
      // Update group member count and remove user from members
      setGroups(prev => prev.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            memberCount: Math.max(1, group.memberCount - 1),
            members: group.members.filter(member => member.username !== userProfile.username),
            stats: {
              ...group.stats,
              activeMembers: Math.max(1, group.stats.activeMembers - 1)
            }
          };
        }
        return group;
      }));
    }
    onLeaveGroup?.(groupId);
  };

  const handleGroupClick = (groupId: string) => {
    setSelectedGroupId(groupId);
    onGroupClick?.(groupId);
  };

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const handleCreateGroup = (newGroupData: Omit<TopicGroup, 'id' | 'memberCount' | 'members' | 'recentActivity' | 'stats'>) => {
    const newGroup: TopicGroup = {
      ...newGroupData,
      id: `group-${Date.now()}`,
      memberCount: 1,
      members: [{
        username: userProfile.username,
        role: 'founder',
        joinedAt: new Date().toISOString(),
        contributionScore: 0,
        badges: [],
        isActive: true,
        lastSeen: new Date().toISOString()
      }],
      recentActivity: [{
        id: 'activity-created',
        type: 'member_joined',
        actor: userProfile.username,
        content: 'created the group',
        timestamp: new Date().toISOString()
      }],
      stats: {
        totalLists: 0,
        totalDiscussions: 0,
        activeMembers: 1,
        weeklyActivity: 1
      }
    };
    
    setGroups(prev => [newGroup, ...prev]);
    setShowCreateModal(false);
  };

  // If viewing a specific group, show the GroupView
  if (selectedGroupId) {
    const selectedGroup = groups.find(group => group.id === selectedGroupId);
    if (selectedGroup) {
      return (
        <GroupView
          group={selectedGroup}
          userProfile={userProfile}
          onBack={() => setSelectedGroupId(null)}
          onJoinGroup={handleJoinGroup}
          onLeaveGroup={handleLeaveGroup}
          isUserMember={isUserMember(selectedGroupId)}
          allLists={allLists}
          onTitleClick={onTitleClick}
        />
      );
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Shapes className="text-green-500 mr-2" size={28} />
              Groups
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with people who share your interests
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-3 rounded-lg transition-all duration-200 bg-green-600 text-white hover:bg-green-700 font-medium whitespace-nowrap"
        >
          <Plus size={22} className="mr-2" />
          <span className="text-lg">Create Group</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{groups.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Groups</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{userGroups.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Your Groups</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {groups.reduce((sum, group) => sum + group.memberCount, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Members</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {groups.reduce((sum, group) => sum + group.stats.totalLists, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Group Lists</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'discover'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Search size={18} className="inline mr-2" />
            Discover ({filteredGroups.length})
          </button>
          <button
            onClick={() => setActiveTab('my-groups')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'my-groups'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Users size={18} className="inline mr-2" />
            My Groups ({userGroups.length})
          </button>
          <button
            onClick={() => setActiveTab('popular')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'popular'
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <TrendingUp size={18} className="inline mr-2" />
            Popular
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors ${
                showFilters 
                  ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400'
                  : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Filter size={20} />
            </button>
          </div>

          {showFilters && (
            <div className="flex items-center space-x-4 pt-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="members">Most Members</option>
                <option value="activity">Most Active</option>
                <option value="newest">Newest</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          )}
        </div>

        {/* Groups List */}
        <div className="p-6">
          {getActiveGroups().length > 0 ? (
            <div className="space-y-4">
              {getActiveGroups().map(group => (
                <div
                  key={group.id}
                  className="event-card-custom border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                  onClick={() => handleGroupClick(group.id)}
                >
                  <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    <div className="flex-1 space-y-3 w-full lg:w-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                          <span className="text-xl">{group.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                            {group.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>{group.memberCount} members</span>
                            <span>{group.stats.weeklyActivity} weekly activity</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                              {group.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {group.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {group.tags.slice(0, 5).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                        {group.tags.length > 5 && (
                          <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                            +{group.tags.length - 5} more
                          </span>
                        )}
                      </div>
                      
                      {group.recentActivity.length > 0 && (
                        <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-medium">{group.recentActivity[0].actor}</span>{' '}
                            {group.recentActivity[0].content}{' '}
                            <span className="text-xs">({formatActivityTime(group.recentActivity[0].timestamp)})</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-start lg:items-end space-y-2 w-full lg:w-auto lg:ml-6">
                      {isUserMember(group.id) ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeaveGroup(group.id);
                          }}
                          className="w-full lg:w-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          Leave
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleJoinGroup(group.id);
                          }}
                          className="w-full lg:w-auto px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Join Group
                        </button>
                      )}

                      <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MessageSquare size={12} />
                          <span>{group.stats.totalLists}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{group.stats.totalDiscussions}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-2">
                {searchQuery ? 'No groups found matching your search.' : 'No groups available.'}
              </p>
              {!searchQuery && (
                <button
                  onClick={onCreateGroup}
                  className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                >
                  Create the first group!
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreateGroup={handleCreateGroup}
          userProfile={userProfile}
        />
      )}
    </div>
  );
}
