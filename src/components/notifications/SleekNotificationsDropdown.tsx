'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { X, Bell, Heart, MessageCircle, UserPlus, Star, Check, Trash2, Zap } from 'lucide-react';
import { Notification } from '@/types';
import { FeedErrorBoundary } from '@/components/ui/ErrorBoundaries';

interface SleekNotificationsDropdownProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  onClearAllNotifications?: (notifications?: Notification[]) => void;
  onMarkAllNotificationsAsRead?: (notifications: Notification[]) => void;
  setShowNotifications: (show: boolean) => void;
  onNotificationClick?: (notification: Notification) => void;
  onForceClearAll?: () => void;
}

type FilterType = 'all' | 'unread' | 'mentions' | 'likes' | 'comments';

const notificationIcons = {
  like: Heart,
  follow: UserPlus,
  comment: MessageCircle,
  high_five: Star,
  mention: Zap
};

const notificationColors = {
  like: 'text-green-500',
  follow: 'text-green-600',
  comment: 'text-green-500',
  high_five: 'text-green-400',
  mention: 'text-green-600'
};

export default function SleekNotificationsDropdown({ 
  notifications, 
  setNotifications,
  onClearAllNotifications,
  onMarkAllNotificationsAsRead,
  setShowNotifications,
  onNotificationClick,
  onForceClearAll
}: SleekNotificationsDropdownProps) {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Memoized calculations to prevent re-computing on every render
  const unreadCount = useMemo(() => 
    notifications.filter(n => n.unread).length, 
    [notifications]
  );

  const filteredNotifications = notifications;

  const handleClose = useCallback(() => {
    setShowNotifications(false);
    setShowClearConfirm(false);
  }, [setShowNotifications]);

  const handleMarkAllRead = useCallback(() => {
    if (onMarkAllNotificationsAsRead) {
      onMarkAllNotificationsAsRead(notifications);
    } else {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
    }
  }, [onMarkAllNotificationsAsRead, notifications, setNotifications]);

  const handleClearAll = () => {
    // Method 1: Force clear function
    if (onForceClearAll) {
      onForceClearAll();
    }
    
    // Method 2: Regular clear function
    if (onClearAllNotifications) {
      onClearAllNotifications();
    }
    
    // Method 3: Direct local clearing
    setNotifications([]);
    
    // Method 4: Close and reopen dropdown to force refresh
    setTimeout(() => {
      setShowNotifications(false);
      setTimeout(() => setShowNotifications(true), 100);
    }, 500);
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    if (onMarkAllNotificationsAsRead) {
      onMarkAllNotificationsAsRead([notification]);
    } else {
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, unread: false } : n
      ));
    }
    
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    
    setShowNotifications(false);
  };

  const formatTime = (timeStr: string) => {
    // Handle various time formats
    let time: Date;
    
    if (timeStr.includes('ago') || timeStr === 'just now') {
      // Parse relative times like "5 minutes ago"
      if (timeStr === 'just now') return 'now';
      if (timeStr.includes('minutes ago')) {
        const mins = parseInt(timeStr);
        time = new Date(Date.now() - mins * 60000);
      } else if (timeStr.includes('hour ago')) {
        const hours = parseInt(timeStr);
        time = new Date(Date.now() - hours * 3600000);
      } else {
        return timeStr; // fallback
      }
    } else {
      time = new Date(timeStr);
      if (isNaN(time.getTime())) {
        return 'now'; // fallback for invalid dates
      }
    }
    
    const now = new Date();
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return time.toLocaleDateString();
  };

  return (
    <div className="absolute top-full right-0 mt-2 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10" onClick={handleClose} />
      
      {/* Main dropdown */}
      <div className="bg-white dark:bg-gray-900 rounded-xl w-80 shadow-xl border border-green-200 dark:border-green-700/50 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-white dark:from-gray-900 dark:to-gray-800 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Bell size={16} className="text-white" />
                </div>
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Messages
                </h3>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {unreadCount > 0 ? `${unreadCount} new` : 'All caught up!'}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800 transition-all"
            >
              <X size={16} />
            </button>
          </div>
          
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-100 dark:border-gray-700">
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded-md transition-all duration-200 hover:scale-105"
                >
                  <Check size={12} />
                  <span>Mark all read</span>
                </button>
              )}
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-md transition-all duration-200 hover:scale-105"
              >
                <Trash2 size={12} />
                <span>Clear all</span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <FeedErrorBoundary>
          <div className="max-h-72 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell size={20} className="text-gray-500" />
              </div>
              <p className="text-gray-900 dark:text-white text-sm font-semibold mb-1">
                All caught up!
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                You&apos;re up to date
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredNotifications.map((notification) => {
                const IconComponent = notificationIcons[notification.type as keyof typeof notificationIcons] || Bell;
                
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`group relative p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 ${
                      notification.unread ? 'bg-white dark:bg-gray-800 border-l-3 border-green-500' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div 
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.unread 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                        title={notification.type === 'like' ? 'Like notification' : 
                               notification.type === 'follow' ? 'New follower' :
                               notification.type === 'comment' ? 'Comment notification' :
                               notification.type === 'high_five' ? 'High five notification' :
                               notification.type === 'mention' ? 'Mention notification' : 
                               'Notification'}
                      >
                        <IconComponent 
                          size={14} 
                          className={notification.unread ? 'text-white' : 'text-gray-600 dark:text-gray-400'} 
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-semibold text-sm ${
                            notification.unread ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.user}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.time)}
                          </span>
                        </div>
                        
                        <p className={`text-sm leading-tight mb-2 ${
                          notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {notification.content}
                        </p>
                        
                        <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${
                          notification.type === 'like' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                          notification.type === 'follow' ? 'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200' :
                          notification.type === 'comment' ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' :
                          notification.type === 'high_five' ? 'bg-white text-gray-900 dark:bg-gray-600 dark:text-gray-100 border border-gray-200 dark:border-gray-500' :
                          'bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                        }`}>
                          {notification.type === 'high_five' ? '🙏 High Five' : 
                           notification.type === 'mention' ? '⚡ Mention' :
                           notification.type === 'like' ? '💚 Like' :
                           notification.type === 'comment' ? '💬 Comment' :
                           notification.type === 'follow' ? '👥 Follow' :
                           notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
        </FeedErrorBoundary>
      </div>
    </div>
  );
}