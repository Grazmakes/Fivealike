'use client';

import { UserBadge } from '@/types';

interface BadgeProps {
  badge: UserBadge;
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

export default function Badge({ badge, size = 'medium', showTooltip = true }: BadgeProps) {
  const sizeClasses = {
    small: 'w-5 h-5 text-xs',
    medium: 'w-6 h-6 text-sm',
    large: 'w-8 h-8 text-base'
  };

  const badgeElement = (
    <div
      className={`${sizeClasses[size]} ${badge.color} text-white rounded-full flex items-center justify-center font-bold shadow-sm border border-white/20 flex-shrink-0`}
      title={showTooltip ? `${badge.name}: ${badge.description}` : ''}
    >
      <span className="text-white drop-shadow-sm">
        {badge.icon}
      </span>
    </div>
  );

  return badgeElement;
}

interface BadgeListProps {
  badges: UserBadge[];
  selectedBadge?: UserBadge | null;
  maxDisplay?: number;
  size?: 'small' | 'medium' | 'large';
  showOnlySelected?: boolean;
}

export function BadgeList({ badges, selectedBadge, maxDisplay = 3, size = 'medium', showOnlySelected = false }: BadgeListProps) {
  if (showOnlySelected && selectedBadge) {
    return <Badge badge={selectedBadge} size={size} />;
  }

  const displayBadges = badges.slice(0, maxDisplay);
  const remainingCount = badges.length - maxDisplay;

  return (
    <div className="flex items-center space-x-1">
      {displayBadges.map(badge => (
        <Badge key={badge.id} badge={badge} size={size} />
      ))}
      {remainingCount > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          +{remainingCount}
        </span>
      )}
    </div>
  );
}