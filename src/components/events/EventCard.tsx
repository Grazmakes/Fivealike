'use client';

import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, MessageCircle, Share2, MoreVertical, Edit, Trash, Copy } from 'lucide-react';
import { SocialEvent, User } from '@/types';
import { BadgeList } from '@/components/badges/Badge';
import EventChatModal from './EventChatModal';

interface EventCardProps {
  event: SocialEvent;
  currentUser: User;
  onJoinEvent: (eventId: string, status: 'going' | 'maybe' | 'not_going') => void;
  getLocationIcon: (type: string) => React.ReactNode;
  onSendMessage?: (eventId: string, message: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export default function EventCard({ 
  event, 
  currentUser, 
  onJoinEvent, 
  getLocationIcon, 
  onSendMessage,
  onDeleteEvent 
}: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showHostMenu, setShowHostMenu] = useState(false);
  const [userRSVP, setUserRSVP] = useState<'going' | 'maybe' | 'not_going' | null>(() => {
    if (event.rsvp.going.includes(currentUser.username)) return 'going';
    if (event.rsvp.maybe.includes(currentUser.username)) return 'maybe';
    if (event.rsvp.notGoing.includes(currentUser.username)) return 'not_going';
    return null;
  });

  const isHost = event.host.username === currentUser.username;
  const eventDate = new Date(event.dateTime);
  const now = new Date();
  const timeUntilEvent = eventDate.getTime() - now.getTime();
  const daysUntilEvent = Math.ceil(timeUntilEvent / (1000 * 60 * 60 * 24));

  const getEventTypeIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      'movie_night': '🎬',
      'book_club': '📚',
      'music_listening': '🎵',
      'game_night': '🎮',
      'meetup': '🤝',
      'discussion': '💬',
      'activity': '🎯'
    };
    return iconMap[type] || '📅';
  };

  const handleRSVP = (status: 'going' | 'maybe' | 'not_going') => {
    if (userRSVP === status) {
      // Remove RSVP if clicking same status
      setUserRSVP(null);
      onJoinEvent(event.id, status); // This should handle removal logic
    } else {
      setUserRSVP(status);
      onJoinEvent(event.id, status);
    }
  };

  const getTimeDisplay = () => {
    if (daysUntilEvent === 0) return 'Today';
    if (daysUntilEvent === 1) return 'Tomorrow';
    if (daysUntilEvent > 0 && daysUntilEvent <= 7) return `In ${daysUntilEvent} days`;
    return eventDate.toLocaleDateString();
  };

  const getRSVPCounts = () => {
    return {
      going: event.rsvp.going.length,
      maybe: event.rsvp.maybe.length,
      total: event.rsvp.going.length + event.rsvp.maybe.length
    };
  };

  const counts = getRSVPCounts();
  const spotsLeft = event.capacity.max - counts.total;

  const handleSendMessage = (eventId: string, message: string) => {
    if (onSendMessage) {
      onSendMessage(eventId, message);
    }
  };

  const handleShareEvent = () => {
    const eventUrl = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(eventUrl);
    // You might want to show a toast notification here
    alert('Event link copied to clipboard!');
  };

  const handleDeleteEvent = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      if (onDeleteEvent) {
        onDeleteEvent(event.id);
      }
    }
  };

  return (
    <div
      className="event-card-custom border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1">
          {/* Event Type Icon */}
          <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center text-2xl">
            {getEventTypeIcon(event.type)}
          </div>

          {/* Event Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {event.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {/* Date & Time */}
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{getTimeDisplay()}</span>
                    <span>•</span>
                    <Clock size={14} />
                    <span>{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {getLocationIcon(event.location.type)}
                  <span>
                    {event.location.type === 'online' 
                      ? `Online • ${event.location.platform || 'Platform TBD'}`
                      : event.location.type === 'in_person'
                      ? `${event.location.city || 'Location TBD'}`
                      : 'Hybrid Event'
                    }
                  </span>
                </div>

                {/* Host */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Hosted by</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                        {event.host.username.replace('@', '').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {event.host.username}
                    </span>
                    <BadgeList badges={event.host.badges} maxDisplay={2} size="small" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
              {event.description}
            </p>

            {/* Related Items */}
            {event.relatedItems.length > 0 && (
              <div className="mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Featured: 
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {event.relatedItems.slice(0, 3).map((item, index) => (
                    <span 
                      key={index}
                      className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                      {item}
                    </span>
                  ))}
                  {event.relatedItems.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{event.relatedItems.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {event.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RSVP and Stats */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="flex items-center justify-between">
          {/* Attendance Info */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <Users size={16} />
              <span className="font-medium">{counts.going} going</span>
            </div>
            {counts.maybe > 0 && (
              <div className="text-yellow-600 dark:text-yellow-400">
                <span className="font-medium">{counts.maybe} maybe</span>
              </div>
            )}
            <div className="text-gray-500 dark:text-gray-400">
              <span>{spotsLeft > 0 ? `${spotsLeft} spots left` : 'Full'}</span>
            </div>
          </div>

          {/* RSVP Buttons */}
          {!isHost && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleRSVP('going')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  userRSVP === 'going'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40'
                }`}
                disabled={spotsLeft <= 0 && userRSVP !== 'going'}
              >
                Going
              </button>
              <button
                onClick={() => handleRSVP('maybe')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  userRSVP === 'maybe'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/40'
                }`}
              >
                Maybe
              </button>
              <button
                onClick={() => handleRSVP('not_going')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  userRSVP === 'not_going'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Can&rsquo;t Go
              </button>
            </div>
          )}

          {/* Host Actions */}
          {isHost && (
            <div className="flex items-center space-x-2 relative">
              <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-md">
                Host
              </span>
              <div className="relative">
                <button 
                  onClick={() => setShowHostMenu(!showHostMenu)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <MoreVertical size={16} />
                </button>
                
                {/* Host Dropdown Menu */}
                {showHostMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowHostMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 z-20">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowHostMenu(false);
                            // Edit functionality would go here
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <Edit size={14} />
                          <span>Edit Event</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowHostMenu(false);
                            handleShareEvent();
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                        >
                          <Copy size={14} />
                          <span>Copy Link</span>
                        </button>
                        <hr className="my-1 border-gray-200 dark:border-gray-600" />
                        <button
                          onClick={() => {
                            setShowHostMenu(false);
                            handleDeleteEvent();
                          }}
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                        >
                          <Trash size={14} />
                          <span>Delete Event</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowChatModal(true)}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <MessageCircle size={16} />
              <span className="text-sm">{event.chat.length} messages</span>
            </button>
            {userRSVP === 'going' && (
              <button 
                onClick={() => {
                  const startTime = new Date(event.dateTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
                  const endTime = event.endDateTime 
                    ? new Date(event.endDateTime).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '') 
                    : new Date(new Date(event.dateTime).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
                  
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(
                    event.location.type === 'online' 
                      ? `Online - ${event.location.platform || 'Platform TBD'}${event.location.meetingLink ? ` - ${event.location.meetingLink}` : ''}`
                      : `${event.location.address || ''} ${event.location.city || ''} ${event.location.state || ''} ${event.location.country || ''}`.trim()
                  )}`;
                  
                  window.open(googleCalendarUrl, '_blank');
                }}
                className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
              >
                <Calendar size={16} />
                <span className="text-sm">Add to Calendar</span>
              </button>
            )}
            <button 
              onClick={handleShareEvent}
              className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              <Share2 size={16} />
              <span className="text-sm">Share</span>
            </button>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
          >
            {showDetails ? 'Less Details' : 'More Details'}
          </button>
        </div>

        {/* Extended Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 space-y-3">
            {event.requirements && event.requirements.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {event.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Capacity:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">
                  {event.capacity.min}-{event.capacity.max} people
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Type:</span>
                <span className="text-gray-600 dark:text-gray-400 ml-1 capitalize">
                  {event.type.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event Chat Modal */}
      <EventChatModal
        event={event}
        currentUser={currentUser}
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}