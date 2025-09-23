'use client';

import React from 'react';
import { X, Bell } from 'lucide-react';
import { Notification } from '@/types';

interface NotificationsDropdownProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  setShowNotifications: (show: boolean) => void;
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationsDropdown({ 
  notifications, 
  setNotifications, 
  setShowNotifications,
  onNotificationClick 
}: NotificationsDropdownProps) {
  
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAsRead = (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, unread: false } : n
    ));
  };

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read when clicked
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, unread: false } : n
    ));
    
    // Handle navigation
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    
    // Close notifications panel
    setShowNotifications(false);
  };

  return (
    <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl w-80 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications
          </h3>
          <button
            onClick={() => setShowNotifications(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        
        {notifications.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={handleMarkAllRead}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors"
            >
              Mark all read
            </button>
            <button
              onClick={handleClearAll}
              className="px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-md transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <Bell size={32} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No new notifications
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  notification.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${
                        notification.unread ? 'bg-blue-500' : 'bg-transparent'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-primary-600 dark:text-primary-400 text-sm">
                          {notification.user}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          notification.type === 'like' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300' :
                          notification.type === 'follow' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                          notification.type === 'comment' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}>
                          {notification.type === 'high_five' ? 'High Five' : notification.type}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {notification.content}
                      </p>
                    </div>
                  </div>
                  {notification.unread && (
                    <div className="flex-shrink-0 z-10">
                      <button
                        onClick={(e) => handleMarkAsRead(notification.id.toString(), e)}
                        className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md transition-colors relative z-20"
                      >
                        Read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}