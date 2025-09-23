'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Bell, Sun, Moon, ChevronDown, User, Bookmark, Settings, LogOut, Shield, Hand } from 'lucide-react';
import { Notification, User as UserType } from '@/types';
import SleekNotificationsDropdown from '@/components/notifications/SleekNotificationsDropdown';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  setShowNewListForm: (show: boolean) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  onClearAllNotifications?: (notifications?: Notification[]) => void;
  onMarkAllNotificationsAsRead?: (notifications: Notification[]) => void;
  onNotificationClick?: (notification: Notification) => void;
  onForceClearAll?: () => void;
  userProfile: UserType;
  highFiveData: {
    totalHighFives: number;
    weeklyUsed: number;
    weeklyLimit: number;
    lastResetDate: string;
  };
  onNavigateToProfile: () => void;
  onNavigateToSaved: () => void;
  onShowAccountSettings: () => void;
  onShowCommunityGuidelines: () => void;
  onLogout: () => void;
  onNavigateToHome: () => void;
  onToggleAntiSocialMode: (enabled: boolean) => void;
}

export default function Header({ 
  darkMode, 
  setDarkMode, 
  showNotifications, 
  setShowNotifications,
  setShowNewListForm,
  notifications,
  setNotifications,
  onClearAllNotifications,
  onMarkAllNotificationsAsRead,
  onNotificationClick,
  onForceClearAll,
  userProfile,
  highFiveData,
  onNavigateToProfile,
  onNavigateToSaved,
  onShowAccountSettings,
  onShowCommunityGuidelines,
  onLogout,
  onNavigateToHome,
  onToggleAntiSocialMode
}: HeaderProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAntiSocialTooltip, setShowAntiSocialTooltip] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowNotifications]);

  return null;
}