'use client';

import { useState, useMemo, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock, Plus, Search, Filter, Video, Home, Globe, ArrowLeft } from 'lucide-react';
import { SocialEvent, EventFilter, User } from '@/types';
import EventCard from './EventCard';
import CreateEventModal from './CreateEventModal';
import EventFilterPanel from './EventFilterPanel';

interface SocialEventsProps {
  events: SocialEvent[];
  setEvents: (events: SocialEvent[]) => void;
  userProfile: User;
  onJoinEvent: (eventId: string, status: 'going' | 'maybe' | 'not_going') => void;
  allLists?: any[];
  onBack?: () => void;
}

type EventTab = 'all' | 'your_events' | 'joined' | 'nearby';

export default function SocialEvents({ events, setEvents, userProfile, onJoinEvent, allLists = [], onBack }: SocialEventsProps) {
  const [activeTab, setActiveTab] = useState<EventTab>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<EventFilter>({});
  const [prefilledData, setPrefilledData] = useState<any>(null);

  const eventTabs = [
    { id: 'all' as EventTab, label: 'All Events', icon: Globe },
    { id: 'your_events' as EventTab, label: 'Your Events', icon: Calendar },
    { id: 'joined' as EventTab, label: 'Joined Events', icon: Users },
    { id: 'nearby' as EventTab, label: 'Nearby', icon: MapPin },
  ];

  // Handle opening create modal with prefilled data from lists
  useEffect(() => {
    const handleOpenCreateEventModal = (event: any) => {
      const { listId, category, items } = event.detail;
      setPrefilledData({ listId, category, items });
      setShowCreateModal(true);
    };

    window.addEventListener('openCreateEventModal', handleOpenCreateEventModal);
    return () => window.removeEventListener('openCreateEventModal', handleOpenCreateEventModal);
  }, []);

  const filteredEvents = useMemo(() => {
    let filtered = events.filter(event => event.status === 'upcoming');

    // Tab filtering
    switch (activeTab) {
      case 'your_events':
        filtered = filtered.filter(event => event.host.username === userProfile.username);
        break;
      case 'joined':
        filtered = filtered.filter(event => 
          event.rsvp.going.includes(userProfile.username) || 
          event.rsvp.maybe.includes(userProfile.username)
        );
        break;
      case 'nearby':
        filtered = filtered.filter(event => event.location.type === 'in_person');
        break;
    }

    // Search filtering
    if (searchQuery.trim()) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        event.relatedItems.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Additional filters
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(event => filters.type!.includes(event.type));
    }

    if (filters.location) {
      filtered = filtered.filter(event => event.location.type === filters.location);
    }

    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(event => filters.category!.includes(event.category));
    }

    if (filters.capacity?.hasSpace) {
      filtered = filtered.filter(event => event.capacity.current < event.capacity.max);
    }

    // Sort by date
    return filtered.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }, [events, activeTab, searchQuery, filters, userProfile.username]);

  const handleCreateEvent = (eventData: Partial<SocialEvent>) => {
    // Clear prefilled data after creating event
    setPrefilledData(null);
    const newEvent: SocialEvent = {
      id: `event_${Date.now()}`,
      title: eventData.title!,
      description: eventData.description!,
      type: eventData.type!,
      category: eventData.category!,
      relatedListId: eventData.relatedListId,
      relatedItems: eventData.relatedItems || [],
      host: {
        username: userProfile.username,
        avatar: userProfile.avatar,
        avatarImage: userProfile.avatarImage || undefined,
        badges: userProfile.badges
      },
      dateTime: eventData.dateTime!,
      endDateTime: eventData.endDateTime,
      location: eventData.location!,
      capacity: eventData.capacity!,
      rsvp: {
        going: [userProfile.username], // Host is automatically going
        maybe: [],
        notGoing: []
      },
      requirements: eventData.requirements || [],
      tags: eventData.tags || [],
      isPrivate: eventData.isPrivate || false,
      requiresApproval: eventData.requiresApproval || false,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photos: [],
      chat: []
    };

    setEvents([newEvent, ...events]);
    setShowCreateModal(false);
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'online': return <Video size={16} className="text-green-500" />;
      case 'in_person': return <Home size={16} className="text-blue-500" />;
      case 'hybrid': return <Globe size={16} className="text-purple-500" />;
      default: return <MapPin size={16} className="text-gray-500" />;
    }
  };

  const handleSendMessage = (eventId: string, message: string) => {
    const newMessage = {
      id: Date.now().toString(),
      username: userProfile.username,
      content: message,
      timestamp: new Date().toISOString(),
      avatar: userProfile.avatar
    };

    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, chat: [...event.chat, newMessage] }
        : event
    ));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              <Calendar className="text-green-500 mr-2" size={28} />
              Social Events
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              putting the &ldquo;social&rdquo; back in the social media through local meetups and virtual hangouts
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Create Event</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`btn-secondary flex items-center space-x-2 ${showFilters ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
        >
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <EventFilterPanel 
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {eventTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredEvents.length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeTab === 'all' ? 'Total Events' : 'Matching Events'}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {filteredEvents.filter(e => e.location.type === 'online').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Online Events</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {filteredEvents.filter(e => e.location.type === 'in_person').length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">In-Person Events</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {events.filter(e => e.host.username === userProfile.username).length}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Your Events</div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              currentUser={userProfile}
              onJoinEvent={onJoinEvent}
              getLocationIcon={getLocationIcon}
              onSendMessage={handleSendMessage}
              onDeleteEvent={handleDeleteEvent}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchQuery || Object.keys(filters).length > 0 
                ? "Try adjusting your search or filters" 
                : activeTab === 'your_events' 
                  ? "You haven't created any events yet" 
                  : "Be the first to create an event!"
              }
            </p>
            {(activeTab === 'your_events' || filteredEvents.length === 0) && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Event
              </button>
            )}
          </div>
        )}
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          onClose={() => {
            setShowCreateModal(false);
            setPrefilledData(null);
          }}
          onCreateEvent={handleCreateEvent}
          userProfile={userProfile}
          allLists={allLists}
          prefilledData={prefilledData}
        />
      )}
    </div>
  );
}
