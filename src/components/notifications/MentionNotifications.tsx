'use client';

import { useState, useEffect } from 'react';
import { AtSign, Hash, MessageSquare, List as ListIcon, Bell, X, Check } from 'lucide-react';
import { UserMention } from '@/types';
import { createMentionNotifications } from '@/utils/mentionsUtils';

interface MentionNotification {
  id: string;
  type: 'mention' | 'tag';
  user: string;
  content: string;
  context: 'comment' | 'list' | 'reply' | 'message';
  contextId: string;
  listId?: number;
  listTitle?: string;
  timestamp: string;
  isRead: boolean;
}

interface MentionNotificationsProps {
  notifications: MentionNotification[];
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead: () => void;
  onNotificationClick: (notification: MentionNotification) => void;
  onDismiss: (notificationId: string) => void;
  currentUser: string;
}

export default function MentionNotifications({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNotificationClick,
  onDismiss,
  currentUser
}: MentionNotificationsProps) {
  const [filter, setFilter] = useState<'all' | 'mentions' | 'tags'>('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'mentions') return notification.type === 'mention';
    if (filter === 'tags') return notification.type === 'tag';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getIcon = (notification: MentionNotification) => {
    if (notification.type === 'mention') {
      return <AtSign size={16} className="text-primary-500" />;
    }
    if (notification.type === 'tag') {
      return <Hash size={16} className="text-blue-500" />;
    }
    return <Bell size={16} className="text-gray-500" />;
  };

  const getContextIcon = (context: string) => {
    switch (context) {
      case 'comment':
        return <MessageSquare size={12} className="text-gray-400" />;
      case 'list':
        return <ListIcon size={12} className="text-gray-400" />;
      case 'reply':
        return <MessageSquare size={12} className="text-gray-400" />;
      default:
        return <Bell size={12} className="text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMs = now.getTime() - notificationTime.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationTime.toLocaleDateString();
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center">
        <AtSign size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No mentions yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          When someone mentions you with @{currentUser} or uses a hashtag you follow, you&apos;ll see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mentions & Tags
            </h3>
            {unreadCount > 0 && (
              <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('mentions')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'mentions'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            @Mentions
          </button>
          <button
            onClick={() => setFilter('tags')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              filter === 'tags'
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            #Tags
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No {filter === 'all' ? '' : filter} notifications
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                  notification.isRead ? '' : 'bg-primary-50 dark:bg-primary-900/10'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-primary-600 dark:text-primary-400 text-sm">
                        @{notification.user}
                      </span>
                      {getContextIcon(notification.context)}
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.context}
                      </span>
                      {notification.listTitle && (
                        <>
                          <span className="text-xs text-gray-400">in</span>
                          <span className="text-xs text-gray-600 dark:text-gray-300 truncate">
                            &ldquo;{notification.listTitle}&rdquo;
                          </span>
                        </>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {notification.content}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNotificationClick(notification);
                          }}
                          className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                        >
                          View
                        </button>
                        
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkAsRead(notification.id);
                            }}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            title="Mark as read"
                          >
                            <Check size={12} />
                          </button>
                        )}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDismiss(notification.id);
                          }}
                          className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          title="Dismiss"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Hook to manage mention notifications
export function useMentionNotifications(currentUser: string) {
  const [notifications, setNotifications] = useState<MentionNotification[]>([]);
  const [hasBeenInitialized, setHasBeenInitialized] = useState(false);

  // Mock notifications for demo - only load once, don't reload after clearing
  useEffect(() => {
    if (!hasBeenInitialized) {
      console.log('🔄 Initializing mention notifications for user:', currentUser);
      const mockNotifications: MentionNotification[] = [
        {
          id: '1',
          type: 'mention',
          user: 'moviebuff',
          content: `Hey @${currentUser}, check out this amazing list of sci-fi classics!`,
          context: 'comment',
          contextId: 'comment-123',
          listId: 1,
          listTitle: 'Best Sci-Fi Movies of All Time',
          timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
          isRead: false
        },
        {
          id: '2',
          type: 'tag',
          user: 'bookworm',
          content: 'Found some great #recommendations for mystery novels!',
          context: 'list',
          contextId: 'list-456',
          listId: 2,
          listTitle: 'Best Mystery Novels',
          timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
          isRead: false
        },
        {
          id: '3',
          type: 'mention',
          user: 'musiclover',
          content: `@${currentUser} you might love these indie bands I discovered`,
          context: 'reply',
          contextId: 'reply-789',
          listId: 3,
          listTitle: 'Hidden Indie Gems',
          timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          isRead: true
        }
      ];
      
      setNotifications(mockNotifications);
      setHasBeenInitialized(true);
    }
  }, [currentUser, hasBeenInitialized]);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const dismiss = (notificationId: string) => {
    console.log('🗑️ MentionNotifications: Dismissing ID:', notificationId);
    setNotifications(prev => {
      const newNotifications = prev.filter(notification => notification.id !== notificationId);
      console.log('🗑️ MentionNotifications: After dismiss, count:', newNotifications.length);
      return newNotifications;
    });
  };

  const addNotification = (notification: Omit<MentionNotification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: MentionNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    dismiss,
    addNotification
  };
}