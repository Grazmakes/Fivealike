'use client';

import { Home, Search, MapPin, Bookmark, MessageCircle, Users, Calendar, Shapes, Headphones, Trophy, Plus, TrendingUp } from 'lucide-react';
import { ViewType } from '@/types';
import { NavigationErrorBoundary } from '@/components/ui/ErrorBoundaries';

interface NavigationProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  unreadMessagesCount?: number;
  antiSocialMode?: boolean;
  setShowNewListForm: (show: boolean) => void;
}

const navigationItems = [
  { id: 'home' as ViewType, icon: Home, label: 'Home' },
  { id: 'trending' as ViewType, icon: TrendingUp, label: 'Trending' },
  { id: 'local' as ViewType, icon: MapPin, label: 'Local Lists' },
  { id: 'favorites' as ViewType, icon: Bookmark, label: 'Saved Lists' },
  { id: 'leaderboard' as ViewType, icon: Trophy, label: 'Leaderboards' },
  { id: 'community' as ViewType, icon: Users, label: 'Friends' },
  { id: 'groups' as ViewType, icon: Shapes, label: 'Groups' },
  { id: 'events' as ViewType, icon: Calendar, label: 'Social Events' },
  { id: 'podcast' as ViewType, icon: Headphones, label: 'Podcast' },
];

export default function Navigation({ currentView, setCurrentView, unreadMessagesCount = 0, antiSocialMode = false, setShowNewListForm }: NavigationProps) {
  // Define which items are social features
  const socialViews: ViewType[] = ['community', 'groups', 'events'];
  
  // Filter navigation items based on anti-social mode
  const filteredItems = navigationItems.filter(item => 
    !antiSocialMode || !socialViews.includes(item.id)
  );
  
  return (
    <NavigationErrorBoundary>
      <nav className="bg-white dark:bg-gray-800 p-4 h-full flex flex-col">
      <div className="space-y-2 flex flex-col">
        {/* Create List Button */}
        <button
          onClick={() => setShowNewListForm(true)}
          className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 bg-green-600 text-white hover:bg-green-700 font-medium"
        >
          <Plus size={22} className="mr-4" />
          <span className="text-lg">Create List</span>
        </button>
        
        {filteredItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setCurrentView(id)}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === id 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
            title={label}
            aria-label={label}
          >
            <Icon size={22} className="mr-4" />
            <span className="text-base">{label}</span>
          </button>
        ))}
      </div>
      </nav>
    </NavigationErrorBoundary>
  );
}