'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Users } from 'lucide-react';
import { SocialEvent, EventMessage, User } from '@/types';

interface EventChatModalProps {
  event: SocialEvent;
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (eventId: string, message: string) => void;
}

export default function EventChatModal({
  event,
  currentUser,
  isOpen,
  onClose,
  onSendMessage
}: EventChatModalProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [event.chat]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    onSendMessage(event.id, newMessage);
    setNewMessage('');
  };

  const getUserRSVPStatus = (username: string) => {
    if (event.rsvp.going.includes(username)) return 'going';
    if (event.rsvp.maybe.includes(username)) return 'maybe';
    if (event.rsvp.notGoing.includes(username)) return 'not_going';
    return null;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-5xl h-[600px] flex flex-row">
        {/* Members Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-600 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Participants
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Users size={14} />
              <span>
                {event.rsvp.going.length + event.rsvp.maybe.length} members
              </span>
            </div>
          </div>
          
          {/* Members List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Host */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                  {event.host.avatar}
                </span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.host.username}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center space-x-1">
                  <span className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                    Host
                  </span>
                </div>
              </div>
            </div>

            {/* Going Members */}
            {event.rsvp.going.filter(username => username !== event.host.username).map((username) => (
              <div key={username} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {username}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                      Going
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Maybe Members */}
            {event.rsvp.maybe.map((username) => (
              <div key={username} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    {username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {username}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                      Maybe
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Section */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {event.title}
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Event Chat
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {event.chat.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Start the conversation!
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                Be the first to share your excitement about this event.
              </p>
            </div>
          ) : (
            event.chat.map((message) => {
              // Clean username comparison - remove @ if present
              const messageUsername = message.username.replace('@', '');
              const currentUsername = currentUser.username.replace('@', '');
              const isOwnMessage = messageUsername === currentUsername;
              const rsvpStatus = getUserRSVPStatus(message.username);
              const isHost = message.username === event.host.username;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-3 max-w-xs">
                    {!isOwnMessage && (
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {message.username.replace('@', '').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex flex-col">
                      {!isOwnMessage && (
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {message.username}
                          </span>
                          {isHost && (
                            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded-full">
                              Host
                            </span>
                          )}
                          {rsvpStatus === 'going' && !isHost && (
                            <span className="text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                              Going
                            </span>
                          )}
                          {rsvpStatus === 'maybe' && !isHost && (
                            <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 px-2 py-0.5 rounded-full">
                              Maybe
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div
                        className={`px-3 py-2 rounded-lg ${
                          isOwnMessage
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwnMessage
                              ? 'text-green-200'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {isOwnMessage && (
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                          {currentUser.username.replace('@', '').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 dark:border-gray-600 p-4">
          {getUserRSVPStatus(currentUser.username) !== 'not_going' || event.host.username === currentUser.username ? (
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-4">
              <p>Only participants and hosts can send messages in this event chat.</p>
              <p className="text-sm mt-1">RSVP to join the conversation!</p>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}