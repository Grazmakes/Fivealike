'use client';

import { useState } from 'react';
import { X, Calendar, MapPin, Users, Clock, Video, Home, Globe, Plus, Minus } from 'lucide-react';
import { SocialEvent, User } from '@/types';

interface CreateEventModalProps {
  onClose: () => void;
  onCreateEvent: (eventData: Partial<SocialEvent>) => void;
  userProfile: User;
  allLists?: any[];
  prefilledData?: { listId: number; category: string; items: string[] } | null;
}

export default function CreateEventModal({ onClose, onCreateEvent, userProfile, allLists = [], prefilledData }: CreateEventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'meetup' as SocialEvent['type'],
    category: prefilledData?.category || '',
    relatedListId: prefilledData?.listId,
    relatedItems: prefilledData?.items || [''],
    dateTime: '',
    endDateTime: '',
    location: {
      type: 'online' as 'online' | 'in_person' | 'hybrid',
      address: '',
      city: '',
      state: '',
      country: '',
      platform: '',
      meetingLink: ''
    },
    capacity: {
      min: 2,
      max: 10,
      current: 0
    },
    requirements: [''],
    tags: [''],
    isPrivate: false,
    requiresApproval: false,
    invitedFriends: [] as string[]
  });

  // Mock friends data (in real app, this would come from props or context)
  const friendsList = [
    { username: '@musiclover', bio: 'Always discovering new sounds', listsCreated: 23 },
    { username: '@bookworm', bio: 'Avid reader and literature enthusiast', listsCreated: 31 },
    { username: '@readingcorner', bio: 'Book club organizer', listsCreated: 18 },
    { username: '@indievibes', bio: 'Indie music curator', listsCreated: 45 },
    { username: '@artlover', bio: 'Museum enthusiast', listsCreated: 12 },
    { username: '@techblogger', bio: 'Technology writer', listsCreated: 27 },
    { username: '@fitnessguru', bio: 'Personal trainer', listsCreated: 19 },
    { username: '@traveladdict', bio: 'Digital nomad', listsCreated: 38 },
  ];

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

  const platforms = [
    'Zoom', 'Discord', 'Google Meet', 'Microsoft Teams', 'Skype', 
    'WhatsApp', 'Telegram', 'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentValue = prev[parent as keyof typeof prev];
        return {
          ...prev,
          [parent]: {
            ...(typeof parentValue === 'object' && parentValue !== null ? parentValue : {}),
            [child]: value
          }
        };
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const fieldValue = prev[field as keyof typeof prev] as string[] | undefined;
      return {
        ...prev,
        [field]: fieldValue?.map((item: string, i: number) => 
          i === index ? value : item
        ) || []
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const fieldValue = prev[field as keyof typeof prev] as string[] | undefined;
      return {
        ...prev,
        [field]: [...(fieldValue || []), '']
      };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const fieldValue = prev[field as keyof typeof prev] as string[] | undefined;
      return {
        ...prev,
        [field]: fieldValue?.filter((_: any, i: number) => i !== index) || []
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedData = {
      ...formData,
      relatedItems: formData.relatedItems.filter(item => item.trim()),
      requirements: formData.requirements.filter(req => req.trim()),
      tags: formData.tags.filter(tag => tag.trim())
    };

    onCreateEvent(cleanedData);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video size={16} className="text-green-500" />;
      case 'in_person': return <Home size={16} className="text-blue-500" />;
      case 'hybrid': return <Globe size={16} className="text-purple-500" />;
      default: return <MapPin size={16} className="text-gray-500" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create New Event
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="input-field"
                placeholder="What's your event about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Tell people what to expect..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="input-field"
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Date & Time */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <Calendar size={20} />
              <span>Date & Time</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.dateTime}
                  onChange={(e) => handleInputChange('dateTime', e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDateTime}
                  onChange={(e) => handleInputChange('endDateTime', e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <MapPin size={20} />
              <span>Location</span>
            </h3>

            <div className="flex space-x-4">
              {['online', 'in_person', 'hybrid'].map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleInputChange('location.type', type)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition-colors ${
                    formData.location.type === type
                      ? 'bg-primary-100 border-primary-300 text-primary-700 dark:bg-primary-900 dark:border-primary-600 dark:text-primary-300'
                      : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {getLocationIcon(type)}
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                </button>
              ))}
            </div>

            {formData.location.type === 'online' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    value={formData.location.platform}
                    onChange={(e) => handleInputChange('location.platform', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select platform</option>
                    {platforms.map(platform => (
                      <option key={platform} value={platform}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meeting Link
                  </label>
                  <input
                    type="url"
                    value={formData.location.meetingLink}
                    onChange={(e) => handleInputChange('location.meetingLink', e.target.value)}
                    className="input-field"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}

            {(formData.location.type === 'in_person' || formData.location.type === 'hybrid') && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location.city}
                    onChange={(e) => handleInputChange('location.city', e.target.value)}
                    className="input-field"
                    placeholder="City name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => handleInputChange('location.address', e.target.value)}
                    className="input-field"
                    placeholder="Street address (optional)"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Capacity */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <Users size={20} />
              <span>Capacity</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Minimum Attendees
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.capacity.min}
                  onChange={(e) => handleInputChange('capacity.min', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Attendees *
                </label>
                <input
                  type="number"
                  min="2"
                  required
                  value={formData.capacity.max}
                  onChange={(e) => handleInputChange('capacity.max', parseInt(e.target.value))}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Invite Friends */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center space-x-2">
              <Users size={20} />
              <span>Invite Friends</span>
            </h3>
            
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select friends to invite to your event
            </p>
            
            <div className="max-h-48 overflow-y-auto border border-gray-200 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
              {friendsList.map((friend) => (
                <label key={friend.username} className="flex items-center space-x-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.invitedFriends.includes(friend.username)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleInputChange('invitedFriends', [...formData.invitedFriends, friend.username]);
                      } else {
                        handleInputChange('invitedFriends', formData.invitedFriends.filter(f => f !== friend.username));
                      }
                    }}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                      {friend.username.replace('@', '').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {friend.username}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {friend.bio} • {friend.listsCreated} lists
                    </div>
                  </div>
                </label>
              ))}
            </div>
            
            {formData.invitedFriends.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {formData.invitedFriends.length} friend{formData.invitedFriends.length !== 1 ? 's' : ''} selected
              </div>
            )}
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Additional Details</h3>
            
            {/* Related Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Featured Items
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Movies, books, games, or other items featured in this event
              </p>
              {formData.relatedItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayInputChange('relatedItems', index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Item name"
                  />
                  {formData.relatedItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('relatedItems', index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('relatedItems')}
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Requirements
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                What attendees need to bring or prepare
              </p>
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Requirement"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('requirements', index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('requirements')}
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <Plus size={16} />
                <span>Add Requirement</span>
              </button>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              {formData.tags.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayInputChange('tags', index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="Tag"
                  />
                  {formData.tags.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('tags', index)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('tags')}
                className="flex items-center space-x-1 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
              >
                <Plus size={16} />
                <span>Add Tag</span>
              </button>
            </div>

            {/* Privacy Settings */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onChange={(e) => handleInputChange('isPrivate', e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="isPrivate" className="text-sm text-gray-700 dark:text-gray-300">
                  Private event (only visible to invited users)
                </label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="requiresApproval"
                  checked={formData.requiresApproval}
                  onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="requiresApproval" className="text-sm text-gray-700 dark:text-gray-300">
                  Require approval for RSVPs
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}