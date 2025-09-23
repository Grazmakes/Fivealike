'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Tag, Users, Video, Home, Globe } from 'lucide-react';
import { EventFilter } from '@/types';

interface EventFilterPanelProps {
  filters: EventFilter;
  setFilters: (filters: EventFilter) => void;
  onClose: () => void;
}

export default function EventFilterPanel({ filters, setFilters, onClose }: EventFilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<EventFilter>(filters);

  const eventTypes = [
    { value: 'movie_night', label: 'Movie Night', icon: '🎬' },
    { value: 'book_club', label: 'Book Club', icon: '📚' },
    { value: 'music_listening', label: 'Music Session', icon: '🎵' },
    { value: 'game_night', label: 'Game Night', icon: '🎮' },
    { value: 'meetup', label: 'General Meetup', icon: '🤝' },
    { value: 'discussion', label: 'Discussion', icon: '💬' },
    { value: 'activity', label: 'Activity', icon: '🎯' }
  ];

  const categories = [
    'Movies & TV', 'Books', 'Music', 'Games', 'Food & Dining', 
    'Technology', 'Sports', 'Arts & Crafts', 'Travel', 'Other'
  ];

  const locationTypes = [
    { value: 'online', label: 'Online', icon: Video },
    { value: 'in_person', label: 'In-Person', icon: Home },
    { value: 'hybrid', label: 'Hybrid', icon: Globe }
  ];

  const handleTypeToggle = (type: string) => {
    const currentTypes = localFilters.type || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    
    setLocalFilters({ ...localFilters, type: updatedTypes.length > 0 ? updatedTypes : undefined });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = localFilters.category || [];
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    setLocalFilters({ ...localFilters, category: updatedCategories.length > 0 ? updatedCategories : undefined });
  };

  const handleLocationChange = (location: 'online' | 'in_person' | 'hybrid' | undefined) => {
    setLocalFilters({ ...localFilters, location });
  };

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    const dateRange = localFilters.dateRange || { start: '', end: '' };
    const updatedRange = { ...dateRange, [field]: value };
    
    if (!updatedRange.start && !updatedRange.end) {
      setLocalFilters({ ...localFilters, dateRange: undefined });
    } else {
      setLocalFilters({ ...localFilters, dateRange: updatedRange });
    }
  };

  const handleCapacityToggle = (hasSpace: boolean) => {
    if (localFilters.capacity?.hasSpace === hasSpace) {
      setLocalFilters({ ...localFilters, capacity: undefined });
    } else {
      setLocalFilters({ ...localFilters, capacity: { hasSpace } });
    }
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters: EventFilter = {};
    setLocalFilters(clearedFilters);
    setFilters(clearedFilters);
    onClose();
  };

  const hasActiveFilters = Object.keys(localFilters).length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Filter Events
        </h3>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      {/* Event Types */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Event Types
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {eventTypes.map(type => (
            <button
              key={type.value}
              onClick={() => handleTypeToggle(type.value)}
              className={`flex items-center space-x-2 p-3 rounded-lg border text-sm transition-colors ${
                localFilters.type?.includes(type.value)
                  ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Categories
        </h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                localFilters.category?.includes(category)
                  ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Location Type */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
          <MapPin size={16} />
          <span>Location Type</span>
        </h4>
        <div className="flex space-x-2">
          <button
            onClick={() => handleLocationChange(undefined)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md border text-sm transition-colors ${
              !localFilters.location
                ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <span>All</span>
          </button>
          {locationTypes.map(type => (
            <button
              key={type.value}
              onClick={() => handleLocationChange(type.value as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md border text-sm transition-colors ${
                localFilters.location === type.value
                  ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <type.icon size={16} />
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
          <Calendar size={16} />
          <span>Date Range</span>
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              From
            </label>
            <input
              type="date"
              value={localFilters.dateRange?.start || ''}
              onChange={(e) => handleDateRangeChange('start', e.target.value)}
              className="input-field text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
              To
            </label>
            <input
              type="date"
              value={localFilters.dateRange?.end || ''}
              onChange={(e) => handleDateRangeChange('end', e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      {/* Capacity */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
          <Users size={16} />
          <span>Availability</span>
        </h4>
        <button
          onClick={() => handleCapacityToggle(true)}
          className={`flex items-center space-x-2 p-3 rounded-lg border text-sm transition-colors w-full ${
            localFilters.capacity?.hasSpace
              ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Users size={16} />
          <span>Only events with available spots</span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleClearFilters}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          disabled={!hasActiveFilters}
        >
          Clear all filters
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="btn-secondary text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyFilters}
            className="btn-primary text-sm"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}