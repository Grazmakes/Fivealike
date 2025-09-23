'use client';

import { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send, Settings, Edit, Minus, Plus } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface ChatWindow {
  id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
  messages: ChatMessage[];
  unread: number;
}

interface RedditChatProps {
  isOpen: boolean;
  onClose: () => void;
  openChatWithUser?: string; // Username to immediately open chat with
  onAuthorClick?: (author: string) => void; // Handler for clicking usernames
}

export default function RedditChat({ isOpen, onClose, openChatWithUser, onAuthorClick }: RedditChatProps) {
  const [activeWindowId, setActiveWindowId] = useState('1');
  const [newMessage, setNewMessage] = useState('');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatUsername, setNewChatUsername] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatWindows, setChatWindows] = useState<ChatWindow[]>([
    {
      id: '1',
      username: 'Torley_',
      avatar: 'T',
      isOnline: true,
      unread: 0,
      messages: [
        {
          id: '1',
          sender: 'Torley_',
          content: 'Friendly greetings! Get it here, there\'s an upscaled version too, enjoy!\n\nhttps://www.dropbox.com/scl/fo/yog5j9fipz1xie06n494x/AJNXK065PYu4n0RVe1A7V_8?rlkey=0bboe9j8i3n5ev3s6gy7tvth3&dl=0',
          timestamp: '11:51 AM',
          isOwn: false
        },
        {
          id: '2',
          sender: 'grazmakes',
          content: 'thank you sooo much!!!\n\ngot any other hard to find docs by chance?\n;-)',
          timestamp: '11:51 AM',
          isOwn: true
        },
        {
          id: '3',
          sender: 'Torley_',
          content: 'You\'re so welcome! Like which docs?👀',
          timestamp: '4:00 PM',
          isOwn: false
        },
        {
          id: '4',
          sender: 'grazmakes',
          content: 'I\'m a fan of any kinds! I have a plex server and collection whatever i can get my hands on',
          timestamp: '4:20 PM',
          isOwn: true
        }
      ]
    },
    {
      id: '2',
      username: 'RedditUser42',
      avatar: 'R',
      isOnline: false,
      unread: 2,
      messages: [
        {
          id: '1',
          sender: 'RedditUser42',
          content: 'Hey! Saw your post about the Five Alike app. Really cool concept!',
          timestamp: '2:30 PM',
          isOwn: false
        },
        {
          id: '2',
          sender: 'RedditUser42',
          content: 'Any plans to add more social features?',
          timestamp: '2:31 PM',
          isOwn: false
        }
      ]
    },
    {
      id: '3',
      username: 'ListMaster',
      avatar: 'L',
      isOnline: true,
      unread: 0,
      messages: [
        {
          id: '1',
          sender: 'grazmakes',
          content: 'Love your Boston restaurant lists!',
          timestamp: '1:15 PM',
          isOwn: true
        },
        {
          id: '2',
          sender: 'ListMaster',
          content: 'Thanks! I\'ve lived here for 10 years so I know all the best spots',
          timestamp: '1:45 PM',
          isOwn: false
        }
      ]
    },
    {
      id: '4',
      username: 'BookwormBella',
      avatar: 'B',
      isOnline: false,
      unread: 2,
      messages: [
        {
          id: '1',
          sender: 'BookwormBella',
          content: 'Hey! Saw your sci-fi book recommendations. Have you read The Expanse series?',
          timestamp: '9:30 AM',
          isOwn: false
        }
      ]
    },
    {
      id: '5',
      username: 'MovieBuff92',
      avatar: 'M',
      isOnline: true,
      unread: 1,
      messages: [
        {
          id: '1',
          sender: 'MovieBuff92',
          content: 'Your indie film list was amazing! Any hidden gems?',
          timestamp: '8:15 AM',
          isOwn: false
        }
      ]
    },
    {
      id: '6',
      username: 'TechGuru',
      avatar: 'T',
      isOnline: true,
      unread: 0,
      messages: [
        {
          id: '1',
          sender: 'grazmakes',
          content: 'Thanks for the programming language recommendations!',
          timestamp: '7:45 PM',
          isOwn: true
        },
        {
          id: '2',
          sender: 'TechGuru',
          content: 'No problem! Let me know if you need any coding help',
          timestamp: '7:50 PM',
          isOwn: false
        }
      ]
    }
  ]);

  // Auto-scroll to bottom when messages change or active window changes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle opening chat with specific user
  useEffect(() => {
    if (openChatWithUser && isOpen) {
      // Check if chat with this user already exists
      const existingWindow = chatWindows.find(w => w.username.toLowerCase() === openChatWithUser.toLowerCase());
      
      if (existingWindow) {
        // Switch to existing chat and move it to the top
        setActiveWindowId(existingWindow.id);
        setChatWindows(prev => {
          const windowIndex = prev.findIndex(w => w.id === existingWindow.id);
          if (windowIndex > 0) {
            const window = prev[windowIndex];
            return [window, ...prev.filter(w => w.id !== existingWindow.id)];
          }
          return prev;
        });
      } else {
        // Create new chat window
        const newId = Date.now().toString();
        const newWindow: ChatWindow = {
          id: newId,
          username: openChatWithUser,
          avatar: openChatWithUser[0].toUpperCase(),
          isOnline: Math.random() > 0.5,
          unread: 0,
          messages: []
        };
        
        setChatWindows(prev => [newWindow, ...prev]);
        setActiveWindowId(newId);
      }
    }
  }, [openChatWithUser, isOpen, chatWindows]);

  // Auto-scroll effect
  useEffect(() => {
    if (isOpen) {
      const activeWindow = chatWindows.find(w => w.id === activeWindowId);
      if (activeWindow) {
        scrollToBottom();
      }
    }
  }, [chatWindows, activeWindowId, isOpen]);

  if (!isOpen) return null;

  const activeWindow = chatWindows.find(w => w.id === activeWindowId);
  if (!activeWindow) return null;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'grazmakes',
      content: newMessage,
      timestamp: timestamp,
      isOwn: true
    };
    
    setChatWindows(prev => {
      const updatedWindows = prev.map(window =>
        window.id === activeWindowId
          ? { ...window, messages: [...window.messages, newMsg] }
          : window
      );

      // Move the current chat to the top of the list
      const activeWindowIndex = updatedWindows.findIndex(w => w.id === activeWindowId);
      if (activeWindowIndex > 0) {
        const activeWindow = updatedWindows[activeWindowIndex];
        return [activeWindow, ...updatedWindows.filter(w => w.id !== activeWindowId)];
      }

      return updatedWindows;
    });
    setNewMessage('');
  };

  const closeWindow = (windowId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (chatWindows.length === 1) {
      onClose();
      return;
    }
    
    setChatWindows(prev => prev.filter(w => w.id !== windowId));
    
    if (activeWindowId === windowId) {
      const remainingWindows = chatWindows.filter(w => w.id !== windowId);
      if (remainingWindows.length > 0) {
        setActiveWindowId(remainingWindows[0].id);
      }
    }
  };

  const createNewChat = () => {
    if (!newChatUsername.trim()) return;
    
    const newId = Date.now().toString();
    const newWindow: ChatWindow = {
      id: newId,
      username: newChatUsername,
      avatar: newChatUsername[0].toUpperCase(),
      isOnline: Math.random() > 0.5,
      unread: 0,
      messages: []
    };
    
    setChatWindows(prev => [newWindow, ...prev]);
    setActiveWindowId(newId);
    setNewChatUsername('');
    setShowNewChatModal(false);
  };


  const handleUsernameClick = (username: string) => {
    if (onAuthorClick) {
      onAuthorClick(username);
    }
  };

  const markAllAsRead = () => {
    setChatWindows(prev => prev.map(window => ({
      ...window,
      unread: 0
    })));
  };

  const clearAllChats = () => {
    setChatWindows(prev => prev.map(window => ({
      ...window,
      messages: []
    })));
  };


  return (
    <>
      {/* Chat Interface - Discord/Slack Style */}
      <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 overflow-hidden">
        <div className="flex h-[500px] w-[600px]">
          
          {/* Left Sidebar - User List */}
          <div className="w-[200px] bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-600 flex flex-col">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-green-600 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">Direct Messages</h3>
                <button 
                  onClick={() => setShowNewChatModal(true)}
                  className="p-1 rounded hover:bg-green-700 transition-colors"
                  title="Start new chat"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={markAllAsRead}
                  className="px-2 py-1 text-xs bg-green-500 hover:bg-green-700 rounded transition-colors"
                  title="Mark all as read"
                >
                  Mark Read
                </button>
                <button
                  onClick={clearAllChats}
                  className="px-2 py-1 text-xs bg-red-500 hover:bg-red-600 rounded transition-colors"
                  title="Clear all messages"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            
            {/* Scrollable User List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-2 space-y-1">
                {chatWindows.map((window) => (
                  <div
                    key={window.id}
                    className={`flex items-center p-2 rounded cursor-pointer transition-all ${
                      activeWindowId === window.id
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => {
                      setActiveWindowId(window.id);

                      // Move this chat to the top and mark as read
                      setChatWindows(prev => {
                        const updatedWindows = prev.map(w =>
                          w.id === window.id ? { ...w, unread: 0 } : w
                        );

                        // Move the clicked chat to the top of the list
                        const clickedWindowIndex = updatedWindows.findIndex(w => w.id === window.id);
                        if (clickedWindowIndex > 0) {
                          const clickedWindow = updatedWindows[clickedWindowIndex];
                          return [clickedWindow, ...updatedWindows.filter(w => w.id !== window.id)];
                        }

                        return updatedWindows;
                      });
                    }}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        window.isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}>
                        {window.avatar}
                      </div>
                      {window.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUsernameClick(window.username);
                          }}
                          className="text-sm font-medium truncate hover:text-green-600 dark:hover:text-green-400 transition-colors text-left"
                        >
                          {window.username}
                        </button>
                        {window.unread > 0 && (
                          <div className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ml-2">
                            {window.unread}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {window.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    
                    <button
                      onClick={(e) => closeWindow(window.id, e)}
                      className="opacity-0 group-hover:opacity-100 ml-2 p-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                      <Minus size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeWindow.isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                  }`}>
                    {activeWindow.avatar}
                  </div>
                  {activeWindow.isOnline && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full"></div>
                  )}
                </div>
                <div>
                  <button 
                    onClick={() => handleUsernameClick(activeWindow.username)}
                    className="font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors cursor-pointer"
                  >
                    {activeWindow.username}
                  </button>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {activeWindow.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Minus size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {activeWindow.messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-3">
                    {!message.isOwn && (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        activeWindow.isOnline ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}>
                        {activeWindow.avatar}
                      </div>
                    )}
                    
                    <div className={`flex flex-col ${message.isOwn ? 'items-end ml-11' : 'items-start'} flex-1`}>
                      {!message.isOwn && (
                        <div className="flex items-center space-x-2 mb-1">
                          <button 
                            onClick={() => handleUsernameClick(message.sender)}
                            className="text-sm font-medium text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors"
                          >
                            {message.sender}
                          </button>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {message.timestamp}
                          </span>
                        </div>
                      )}
                      
                      <div
                        className={`max-w-[280px] px-4 py-2 rounded-2xl ${
                          message.isOwn
                            ? 'bg-green-500 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      
                      {message.isOwn && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 mr-1">
                          {message.timestamp}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={`Message ${activeWindow.username}`}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-9 h-9 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors flex items-center justify-center"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-[90vw] shadow-2xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Start New Chat
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={newChatUsername}
                  onChange={(e) => setNewChatUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && createNewChat()}
                  placeholder="Enter username..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  autoFocus
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewChat}
                  disabled={!newChatUsername.trim()}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}