'use client';

import { Loader2 } from 'lucide-react';

// Reusable loading spinner
export function LoadingSpinner({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin ${className}`} 
    />
  );
}

// Button loading state
export function LoadingButton({ 
  children, 
  loading, 
  onClick,
  className = '',
  disabled = false,
  ...props 
}: {
  children: React.ReactNode;
  loading: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  [key: string]: any;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`${className} ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner size={16} />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// List card skeleton
export function ListCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
      
      {/* List items skeleton */}
      <div className="space-y-2 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
          </div>
        ))}
      </div>
      
      {/* Footer skeleton */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="w-24 h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}

// Search results skeleton
export function SearchResultsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Notification skeleton
export function NotificationSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="p-3 animate-pulse">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Profile skeleton
export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Profile header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
      </div>
      
      {/* Stats skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Generic content skeleton
export function ContentSkeleton({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string; 
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={`h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3 ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        ></div>
      ))}
    </div>
  );
}