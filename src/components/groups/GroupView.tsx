'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Calendar, MessageSquare, Plus, Settings, UserPlus, UserMinus, Star, Hash, MapPin, Clock, Pin, ThumbsUp, Video, Home, Globe } from 'lucide-react';
import { TopicGroup, User, List, GroupDiscussion, SocialEvent } from '@/types';
import CreateDiscussionModal from './CreateDiscussionModal';
import CreateEventModal from '@/components/events/CreateEventModal';
import EventCard from '@/components/events/EventCard';

interface GroupViewProps {
  group: TopicGroup;
  userProfile: User;
  onBack: () => void;
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  isUserMember: boolean;
  allLists?: List[];
  onTitleClick?: (title: string) => void;
}

type GroupTab = 'feed' | 'lists' | 'discussions' | 'members' | 'events';

export default function GroupView({ 
  group, 
  userProfile, 
  onBack, 
  onJoinGroup, 
  onLeaveGroup, 
  isUserMember,
  allLists = [],
  onTitleClick
}: GroupViewProps) {
  const [activeTab, setActiveTab] = useState<GroupTab>('feed');
  const [showMemberManagement, setShowMemberManagement] = useState(false);
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [discussions, setDiscussions] = useState<GroupDiscussion[]>([
    {
      id: 'disc-1',
      groupId: group.id,
      title: 'What are your favorite hidden gems?',
      content: 'I\'m always looking for recommendations that most people haven\'t heard of. What are some of your favorite hidden gems in this category?',
      author: 'graz',
      createdAt: '2024-02-10T10:00:00Z',
      replies: [
        {
          id: 'reply-1',
          author: '@cinephile',
          content: 'I recently discovered this amazing indie film from 2019 that completely flew under the radar. Definitely worth checking out!',
          timestamp: '2024-02-10T11:30:00Z',
          upvotes: 5,
          userVote: null
        }
      ],
      tags: ['recommendations', 'hidden-gems'],
      isPinned: false,
      upvotes: 12,
      userVote: null
    }
  ]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(timestamp);
  };

  const isFounder = group.founder === userProfile.username;
  const userMemberData = group.members.find(member => member.username === userProfile.username);
  const isAdmin = userMemberData?.role === 'admin' || userMemberData?.role === 'founder';

  const handleCreateDiscussion = (discussionData: Omit<GroupDiscussion, 'id' | 'createdAt' | 'replies' | 'upvotes' | 'userVote'>) => {
    const newDiscussion: GroupDiscussion = {
      ...discussionData,
      id: `disc-${Date.now()}`,
      createdAt: new Date().toISOString(),
      replies: [],
      upvotes: 0,
      userVote: null
    };
    
    setDiscussions(prev => [newDiscussion, ...prev]);
    setShowCreateDiscussion(false);
  };

  const handleDiscussionVote = (discussionId: string, voteType: 'up' | 'down') => {
    setDiscussions(prev => prev.map(discussion => {
      if (discussion.id === discussionId) {
        const isUpvote = voteType === 'up';
        const currentVote = discussion.userVote;
        
        let newUpvotes = discussion.upvotes;
        let newUserVote: 'up' | 'down' | null = null;
        
        if (currentVote === null) {
          // First vote
          newUpvotes = isUpvote ? newUpvotes + 1 : Math.max(0, newUpvotes - 1);
          newUserVote = voteType;
        } else if (currentVote === voteType) {
          // Remove existing vote
          newUpvotes = isUpvote ? Math.max(0, newUpvotes - 1) : newUpvotes + 1;
          newUserVote = null;
        } else {
          // Change vote
          newUpvotes = isUpvote ? newUpvotes + 2 : Math.max(0, newUpvotes - 2);
          newUserVote = voteType;
        }
        
        return { ...discussion, upvotes: newUpvotes, userVote: newUserVote };
      }
      return discussion;
    }));
  };

  const [groupEvents, setGroupEvents] = useState<SocialEvent[]>([]);

  const getEventLocationIcon = (type: string) => {
    switch (type) {
      case 'online':
        return <Video size={16} className="text-green-500" />;
      case 'in_person':
        return <Home size={16} className="text-blue-500" />;
      case 'hybrid':
        return <Globe size={16} className="text-purple-500" />;
      default:
        return <MapPin size={16} className="text-gray-500" />;
    }
  };

  const handleCreateGroupEvent = (eventData: Partial<SocialEvent>) => {
    if (!eventData.title || !eventData.description || !eventData.dateTime || !eventData.location || !eventData.capacity) {
      setShowCreateEventModal(false);
      return;
    }

    const capacity = eventData.capacity;

    const newEvent: SocialEvent = {
      id: `group_event_${group.id}_${Date.now()}`,
      title: eventData.title,
      description: eventData.description,
      type: eventData.type || 'meetup',
      category: eventData.category || group.category,
      relatedListId: eventData.relatedListId,
      relatedItems: eventData.relatedItems || [],
      host: {
        username: userProfile.username,
        avatar: userProfile.avatar,
        avatarImage: userProfile.avatarImage || undefined,
        badges: userProfile.badges
      },
      dateTime: eventData.dateTime,
      endDateTime: eventData.endDateTime,
      location: eventData.location,
      capacity: {
        min: capacity.min,
        max: capacity.max,
        current: Math.min(capacity.max, 1)
      },
      rsvp: {
        going: [userProfile.username],
        maybe: [],
        notGoing: []
      },
      requirements: eventData.requirements || [],
      tags: eventData.tags || [],
      isPrivate: Boolean(eventData.isPrivate),
      requiresApproval: Boolean(eventData.requiresApproval),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photos: [],
      chat: []
    };

    setGroupEvents(prev => [newEvent, ...prev]);
    setShowCreateEventModal(false);
  };

  const handleJoinGroupEvent = (eventId: string, status: 'going' | 'maybe' | 'not_going') => {
    setGroupEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;

      const username = userProfile.username;
      let going = event.rsvp.going.filter(user => user !== username);
      let maybe = event.rsvp.maybe.filter(user => user !== username);
      let notGoing = event.rsvp.notGoing.filter(user => user !== username);

      if (status === 'going') {
        going = [...going, username];
      } else if (status === 'maybe') {
        maybe = [...maybe, username];
      } else {
        notGoing = [...notGoing, username];
      }

      const current = going.length + maybe.length;

      return {
        ...event,
        rsvp: {
          going,
          maybe,
          notGoing
        },
        capacity: {
          ...event.capacity,
          current
        }
      };
    }));
  };

  const handleGroupEventMessage = (eventId: string, message: string) => {
    setGroupEvents(prev => prev.map(event => {
      if (event.id !== eventId) return event;

      const chatEntry = {
        id: Date.now().toString(),
        username: userProfile.username,
        content: message,
        timestamp: new Date().toISOString(),
        avatar: userProfile.avatar
      };

      return {
        ...event,
        chat: [...event.chat, chatEntry]
      };
    }));
  };

  const handleDeleteGroupEvent = (eventId: string) => {
    setGroupEvents(prev => prev.filter(event => event.id !== eventId));
  };

  // Mock group-specific lists (in real app, these would be filtered from allLists)
  const groupLists = allLists.slice(0, 3).map(list => ({
    ...list,
    author: group.members[Math.floor(Math.random() * group.members.length)]?.username || list.author
  }));

  const renderTabContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="space-y-4">
              {group.recentActivity.map((activity) => (
                <div key={activity.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {activity.actor.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">
                        <span className="font-medium">{activity.actor}</span> {activity.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {formatTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Group Lists Preview */}
            {groupLists.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Lists</h3>
                  <button 
                    onClick={() => setActiveTab('lists')}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View all →
                  </button>
                </div>
                <div className="grid gap-4">
                  {groupLists.slice(0, 2).map((list) => (
                    <button
                      key={list.id}
                      onClick={() => onTitleClick?.(list.title)}
                      className="text-left bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md transition-all"
                    >
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{list.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{list.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>by {list.author}</span>
                        <div className="flex items-center space-x-3">
                          <span>{list.votes} votes</span>
                          <span>{list.saves} saves</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'lists':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Lists</h3>
              {isUserMember && (
                <button 
                  onClick={() => alert('List sharing coming soon! This will let you share existing lists or create new ones for the group.')}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus size={16} />
                  <span>Share List</span>
                </button>
              )}
            </div>
            {groupLists.length > 0 ? (
              <div className="grid gap-4">
                {groupLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => onTitleClick?.(list.title)}
                    className="text-left bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-primary-400 hover:shadow-md transition-all"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">{list.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{list.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>by {list.author}</span>
                      <span>{list.votes} votes</span>
                      <span>{list.saves} saves</span>
                      <span>{list.highFives} high fives</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No lists shared yet</p>
                {isUserMember && (
                  <button 
                    onClick={() => alert('List sharing coming soon! This will let you share existing lists or create new ones for the group.')}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    Be the first to share a list!
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case 'discussions':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Discussions ({discussions.length})
              </h3>
              {isUserMember && (
                <button 
                  onClick={() => setShowCreateDiscussion(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                >
                  <Plus size={16} />
                  <span>Start Discussion</span>
                </button>
              )}
            </div>
            
            {discussions.length > 0 ? (
              <div className="space-y-4">
                {discussions.map(discussion => (
                  <div key={discussion.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && (
                            <Pin size={16} className="text-yellow-500" />
                          )}
                          <h4 className="font-medium text-gray-900 dark:text-white text-lg">
                            {discussion.title}
                          </h4>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                          {discussion.content}
                        </p>
                        
                        {discussion.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {discussion.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>by {discussion.author}</span>
                          <span>{formatTime(discussion.createdAt)}</span>
                          <span>{discussion.replies.length} replies</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleDiscussionVote(discussion.id, 'up')}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                            discussion.userVote === 'up'
                              ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/10'
                          }`}
                        >
                          <ThumbsUp size={14} />
                          <span>{discussion.upvotes}</span>
                        </button>
                      </div>
                    </div>
                    
                    {discussion.replies.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <div className="space-y-3">
                          {discussion.replies.slice(0, 2).map(reply => (
                            <div key={reply.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                    {reply.author.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-900 dark:text-white mb-1">{reply.content}</p>
                                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span>{reply.author}</span>
                                    <span>{formatTime(reply.timestamp)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          {discussion.replies.length > 2 && (
                            <button className="text-primary-600 dark:text-primary-400 hover:underline text-sm">
                              View all {discussion.replies.length} replies
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No discussions yet</p>
                {isUserMember && (
                  <button 
                    onClick={() => setShowCreateDiscussion(true)}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    Start the first discussion!
                  </button>
                )}
              </div>
            )}
          </div>
        );

      case 'members':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Members ({group.memberCount})
              </h3>
              {isAdmin && (
                <button 
                  onClick={() => setShowMemberManagement(!showMemberManagement)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Settings size={16} />
                  <span>Manage</span>
                </button>
              )}
            </div>
            <div className="grid gap-3">
              {group.members.map((member) => (
                <div key={member.username} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {member.username.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{member.username}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          member.role === 'founder' 
                            ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                            : member.role === 'admin'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}>
                          {member.role}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Joined {formatDate(member.joinedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  {member.role === 'founder' && (
                    <Star size={16} className="text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Group Events</h3>
              {isUserMember && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setShowCreateEventModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <Plus size={16} />
                    <span>Create Event</span>
                  </button>
                </div>
              )}
            </div>

            {groupEvents.length > 0 ? (
              <div className="space-y-4">
                {groupEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    currentUser={userProfile}
                    onJoinEvent={handleJoinGroupEvent}
                    getLocationIcon={getEventLocationIcon}
                    onSendMessage={handleGroupEventMessage}
                    onDeleteEvent={handleDeleteGroupEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">No events scheduled</p>
                {isUserMember && (
                  <button 
                    onClick={() => setShowCreateEventModal(true)}
                    className="text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    Plan the first meetup!
                  </button>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="fixed left-[72px] top-[72px] p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-30"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {group.name.charAt(0)}
                </span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {group.name}
                  </h1>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    {group.category}
                  </span>
                  {!group.isPublic && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded text-xs">
                      Private
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
                  {group.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{group.memberCount} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>Created {formatDate(group.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={16} />
                    <span>{group.stats.weeklyActivity} weekly activity</span>
                  </div>
                </div>
                
                {group.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {group.tags.map(tag => (
                      <span key={tag} className="flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        <Hash size={12} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {isUserMember ? (
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-sm font-medium">
                    Member
                  </span>
                  <button
                    onClick={() => onLeaveGroup(group.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <UserMinus size={16} />
                    <span>Leave Group</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => onJoinGroup(group.id)}
                  className="flex items-center space-x-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  <UserPlus size={16} />
                  <span>Join Group</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{group.stats.totalLists}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Lists</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{group.stats.totalDiscussions}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Discussions</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{group.stats.activeMembers}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-xl font-bold text-gray-900 dark:text-white">{group.stats.weeklyActivity}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Activity</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'feed' as GroupTab, label: 'Feed', icon: MessageSquare },
            { id: 'lists' as GroupTab, label: 'Lists', icon: MessageSquare },
            { id: 'discussions' as GroupTab, label: 'Discussions', icon: MessageSquare },
            { id: 'members' as GroupTab, label: 'Members', icon: Users },
            { id: 'events' as GroupTab, label: 'Events', icon: Calendar }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === id
                  ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Create Discussion Modal */}
      {showCreateDiscussion && (
        <CreateDiscussionModal
          onClose={() => setShowCreateDiscussion(false)}
          onCreateDiscussion={handleCreateDiscussion}
          groupId={group.id}
          userProfile={userProfile}
        />
      )}

      {showCreateEventModal && (
        <CreateEventModal
          onClose={() => setShowCreateEventModal(false)}
          onCreateEvent={handleCreateGroupEvent}
          userProfile={userProfile}
          allLists={allLists}
        />
      )}
    </div>
  );
}
