'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Search, ArrowLeft, Music, BookOpen, Film, MoreVertical, Phone, Video, Reply, X } from 'lucide-react';
import { ChatMessage, User } from '@/types';
import MentionInput from '@/components/mentions/MentionInput';

interface MessagesProps {
  currentUser?: User;
  onClose?: () => void;
  initialTarget?: string;
  onUserMention?: (mentionedUsers: string[], content: string, context: 'comment' | 'message' | 'list', contextId: string) => void;
  highlightedItem?: {type: 'list' | 'message' | 'comment', id: string} | null;
  onClearTarget?: () => void;
  onClearHighlight?: () => void;
}

const mockUsers = [
  { 
    id: 1,
    username: '@musiclover', 
    name: 'Alex Chen',
    bio: 'Always discovering new sounds. Love indie rock, jazz, and everything in between.', 
    icon: Music,
    avatar: 'AC',
    online: true,
    lastSeen: 'Now'
  },
  { 
    id: 2,
    username: '@bookworm', 
    name: 'Sam Rodriguez',
    bio: 'Avid reader and literature enthusiast. Love discovering hidden gems.', 
    icon: BookOpen,
    avatar: 'SR',
    online: false,
    lastSeen: '2 hours ago'
  },
  { 
    id: 3,
    username: '@cinephile', 
    name: 'Taylor Kim',
    bio: 'Film critic and movie buff. Always hunting for the next great film.', 
    icon: Film,
    avatar: 'TK',
    online: true,
    lastSeen: 'Now'
  },
];

const mockMessages: { [userId: number]: ChatMessage[] } = {
  1: [
    { id: '1', sender: '@musiclover', recipient: '@graz', content: 'Hey! Love your Taylor Swift recommendations!', timestamp: '10:30 AM', read: true, type: 'text' },
    { id: '2', sender: '@graz', recipient: '@musiclover', content: 'Thanks! I see you&apos;re into indie rock. Have you heard Phoebe Bridgers?', timestamp: '10:32 AM', read: true, type: 'text' },
    { id: '3', sender: '@musiclover', recipient: '@graz', content: 'Yes! She&apos;s amazing. Stranger in the Alps is one of my favorite albums.', timestamp: '10:35 AM', read: true, type: 'text' },
    { id: '4', sender: '@graz', recipient: '@musiclover', content: 'Same here! You should check out Japanese Breakfast if you haven&apos;t already.', timestamp: '10:38 AM', read: false, type: 'text' },
  ],
  2: [
    { id: '5', sender: '@bookworm', recipient: '@graz', content: 'Hi! Saw your book recommendations. Do you have any sci-fi suggestions?', timestamp: 'Yesterday', read: true, type: 'text' },
    { id: '6', sender: '@graz', recipient: '@bookworm', content: 'Absolutely! Have you read The Left Hand of Darkness by Ursula K. Le Guin?', timestamp: 'Yesterday', read: true, type: 'text' },
  ],
  3: [
    { id: '7', sender: '@cinephile', recipient: '@graz', content: 'Great movie list! Denis Villeneuve is incredible.', timestamp: '2 days ago', read: true, type: 'text' },
  ]
};

export default function Messages({ 
  currentUser, 
  onClose, 
  initialTarget, 
  onUserMention,
  highlightedItem,
  onClearTarget,
  onClearHighlight 
}: MessagesProps = {}) {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messageMentions, setMessageMentions] = useState<string[]>([]);
  const [messageHashtags, setMessageHashtags] = useState<string[]>([]);
  const [messages, setMessages] = useState(mockMessages);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle initial target when provided
  useEffect(() => {
    if (initialTarget && onClearTarget) {
      let targetUser = mockUsers.find(user => user.username === initialTarget);
      
      // If user doesn't exist in mockUsers, create them dynamically
      if (!targetUser) {
        const newUserId = Math.max(...mockUsers.map(u => u.id)) + 1;
        const newUser = {
          id: newUserId,
          username: initialTarget,
          name: initialTarget.replace('@', '').charAt(0).toUpperCase() + initialTarget.replace('@', '').slice(1),
          bio: 'Five Alike user',
          icon: Music, // Default icon
          avatar: initialTarget.replace('@', '').substring(0, 2).toUpperCase(),
          online: Math.random() > 0.5, // Random online status
          lastSeen: Math.random() > 0.5 ? 'Now' : '1 hour ago'
        };
        
        // Add to mockUsers array (this modifies the component's local state)
        mockUsers.push(newUser);
        targetUser = newUser;
      }
      
      if (targetUser) {
        setSelectedUser(targetUser.id);
        // Create a conversation if one doesn't exist
        if (!messages[targetUser.id]) {
          setMessages(prev => ({
            ...prev,
            [targetUser.id]: []
          }));
        }
      }
      onClearTarget(); // Clear the target after processing
    }
  }, [initialTarget, onClearTarget, messages]);

  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedUser]);

  // Handle highlighting specific messages when navigated from notifications
  useEffect(() => {
    if (highlightedItem && highlightedItem.type === 'message') {
      const messageId = highlightedItem.id;
      setTimeout(() => {
        const messageElement = document.getElementById(messageId);
        if (messageElement) {
          messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Flash the message to draw attention
          messageElement.style.backgroundColor = '#10B981';
          messageElement.style.color = 'white';
          setTimeout(() => {
            messageElement.style.backgroundColor = '';
            messageElement.style.color = '';
            onClearHighlight?.();
          }, 3000);
        }
      }, 100);
    }
  }, [highlightedItem, onClearHighlight]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: `@${currentUser?.username || 'graz'}`,
      recipient: mockUsers.find(u => u.id === selectedUser)?.username || '',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'text'
    };

    // Add as new message
    setMessages(prev => ({
      ...prev,
      [selectedUser]: [...(prev[selectedUser] || []), message]
    }));
    setReplyingTo(null);

    // Handle mentions - trigger notifications
    if (messageMentions.length > 0 && onUserMention) {
      onUserMention(
        messageMentions,
        newMessage.trim(),
        'message',
        `message-${Date.now()}`
      );
    }

    setNewMessage('');
    setMessageMentions([]);
    setMessageHashtags([]);
    setReplyingTo(null);
  };

  const handleReply = (message: ChatMessage) => {
    setReplyingTo(message);
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const selectedUserData = mockUsers.find(u => u.id === selectedUser);
  const currentMessages = selectedUser ? messages[selectedUser] || [] : [];

  // Recursive component to render messages with replies
  const MessageBubble = ({ message, isReply = false }: { message: ChatMessage; isReply?: boolean }) => {
    const isOwnMessage = message.sender === `@${currentUser?.username || 'graz'}`;
    
    return (
      <div id={`message-${message.id}`} className={`${isReply ? 'ml-8 mt-2' : ''}`}>
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} group`}>
          <div className="flex flex-col max-w-xs">
            {isReply && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-3">
                Replying to conversation
              </div>
            )}
            <div
              className={`px-3 py-2 rounded-lg relative ${
                isOwnMessage
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-between mt-1">
                <p className={`text-xs ${
                  isOwnMessage ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {message.timestamp}
                </p>
                {!isOwnMessage && !isReply && (
                  <button
                    onClick={() => handleReply(message)}
                    className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-black/10 rounded transition-all"
                  >
                    <Reply size={12} className="text-gray-600 dark:text-gray-300" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[800px] md:h-[700px] sm:h-[600px] w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className={`${selectedUser ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-80 border-r border-gray-200 dark:border-gray-700`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Messages</h2>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredUsers.map(user => {
              const lastMessage = messages[user.id]?.[messages[user.id]?.length - 1];
              const hasUnread = messages[user.id]?.some(m => m.sender !== `@${currentUser?.username || 'graz'}` && !m.read);
              
              return (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`w-full p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left ${
                    selectedUser === user.id ? 'bg-primary-50 dark:bg-primary-900' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                          {user.avatar}
                        </span>
                      </div>
                      {user.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {lastMessage?.timestamp || user.lastSeen}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                    {hasUnread && (
                      <div className="w-2 h-2 bg-primary-600 rounded-full" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Area */}
        {selectedUser ? (
          <div className="flex flex-col flex-1">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="md:hidden fixed left-[72px] top-[72px] p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-30"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {selectedUserData?.avatar}
                      </span>
                    </div>
                    {selectedUserData?.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedUserData?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedUserData?.online ? 'Online' : `Last seen ${selectedUserData?.lastSeen}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Phone size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <Video size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map(message => (
                <MessageBubble key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {replyingTo && (
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Reply size={16} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        Replying to {replyingTo.sender}: {replyingTo.content.length > 30 ? `${replyingTo.content.substring(0, 30)}...` : replyingTo.content}
                      </span>
                    </div>
                    <button
                      onClick={cancelReply}
                      className="p-1 hover:bg-blue-200 dark:hover:bg-blue-800 rounded"
                    >
                      <X size={16} className="text-blue-600 dark:text-blue-400" />
                    </button>
                  </div>
                </div>
              )}
              <div className="p-4">
                <div className="flex space-x-3">
                  <MentionInput
                    value={newMessage}
                    onChange={(value, mentions, hashtags) => {
                      setNewMessage(value);
                      setMessageMentions(mentions);
                      setMessageHashtags(hashtags);
                    }}
                    placeholder={replyingTo ? "Type your reply... Use @username to mention users" : "Type a message... Use @username to mention users"}
                    currentUser={currentUser?.username || 'graz'}
                    rows={1}
                    maxLength={500}
                    className="flex-1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a conversation from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}