'use client';

import { useState } from 'react';
import CommunityRedesign from '@/components/community/CommunityRedesign';

export default function CommunityPage() {
  const [followedUsers, setFollowedUsers] = useState<string[]>([
    '@musiclover',
    '@bookworm',
    '@readingcorner',
    '@indievibes',
    '@artlover'
  ]);

  const handleAuthorClick = (author: string) => {
    console.log('Clicked author:', author);
    // TODO: Navigate to author profile
  };

  const handleMessage = (username: string) => {
    console.log('Message user:', username);
    // TODO: Open messaging interface
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommunityRedesign
        followedUsers={followedUsers}
        setFollowedUsers={setFollowedUsers}
        onAuthorClick={handleAuthorClick}
        onMessage={handleMessage}
      />
    </div>
  );
}