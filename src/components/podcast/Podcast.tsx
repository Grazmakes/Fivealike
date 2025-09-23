'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share, Download, Clock, Users, Calendar, MessageCircle, ArrowLeft, Headphones } from 'lucide-react';
import { PodcastEpisode, PodcastSeason } from '@/types';

interface PodcastProps {
  onEpisodeLike?: (episodeId: string) => void;
  onEpisodePlay?: (episodeId: string) => void;
  onBack?: () => void;
}

const mockEpisodes: PodcastEpisode[] = [
  {
    id: 'ep-001',
    title: 'The Art and Science of "If You Like X, Try Y" - Unpacking Recommendations',
    description: 'Join our hosts as they explore the art and science behind recommendation algorithms and what they reveal about human taste and discovery patterns.',
    hosts: ['Mike Chen', 'Sarah Rodriguez'],
    featuredList: {
      id: 23,
      title: 'Algorithm-Inspired Recommendations',
      author: '@curator',
      category: 'Technology'
    },
    audioUrl: '/podcast/episode-001.m4a',
    duration: 2847, // 47 minutes 27 seconds
    publishedAt: '2024-02-15T12:00:00Z',
    season: 1,
    episode: 1,
    tags: ['movies', 'indie-films', 'hidden-gems'],
    playCount: 1247,
    likes: 89,
    userLiked: false,
    showNotes: [
      'Introduction to recommendation systems',
      'The psychology behind "If You Like X" lists',
      'How algorithms shape our taste',
      'The human element in curation',
      'What recommendations reveal about us'
    ],
    guestAppearances: [
      {
        username: '@curator',
        role: 'Algorithm Expert & List Creator'
      }
    ]
  },
  {
    id: 'ep-002',
    title: 'Beyond the Algorithm - Decoding Human Curation in Lists',
    description: 'Dive deep into how human curation differs from algorithmic recommendations and why "If You Like X, Try These 5" lists resonate so strongly with us.',
    hosts: ['Mike Chen', 'Sarah Rodriguez'],
    featuredList: {
      id: 45,
      title: 'Human vs Algorithm Picks',
      author: '@listcurator',
      category: 'Psychology'
    },
    audioUrl: '/podcast/episode-002.m4a',
    duration: 3156, // 52 minutes 36 seconds
    publishedAt: '2024-02-22T12:00:00Z',
    season: 1,
    episode: 2,
    tags: ['books', 'cozy-mystery', 'reading'],
    playCount: 892,
    likes: 67,
    userLiked: true,
    showNotes: [
      'Human curation vs algorithmic recommendations',
      'The art of list-making and discovery',
      'Why "Try These 5" format works so well',
      'Community-driven vs AI-driven recommendations',
      'The future of personalized content discovery'
    ],
    guestAppearances: [
      {
        username: '@listcurator',
        role: 'Psychology Researcher & Curation Expert'
      }
    ]
  },
  {
    id: 'ep-003',
    title: 'Video Game Soundtracks That Hit Different',
    description: 'Gaming meets music in this special episode! We review @gamereview\'s list of the most emotional video game soundtracks and actually listen to them.',
    hosts: ['Mike Chen', 'Sarah Rodriguez'],
    featuredList: {
      id: 67,
      title: 'Most Emotional Video Game OSTs',
      author: '@gamereview',
      category: 'Games'
    },
    audioUrl: '/podcast/episode-003.mp3', // You'll upload your audio files here
    duration: 2932, // 48 minutes 52 seconds
    publishedAt: '2024-03-01T12:00:00Z',
    season: 1,
    episode: 3,
    tags: ['gaming', 'music', 'soundtracks'],
    playCount: 1456,
    likes: 124,
    userLiked: false,
    showNotes: [
      'The emotional power of video game music',
      'Journey\'s transcendent soundtrack',
      'Hollow Knight\'s haunting melodies',
      'How music enhances gameplay',
      'Composer spotlights and interviews'
    ]
  }
];

const currentSeason: PodcastSeason = {
  id: 'season-1',
  seasonNumber: 1,
  title: 'Lists Come to Life',
  description: 'Our inaugural season where we bring Five Alike lists to life through conversation, exploration, and discovery.',
  episodes: mockEpisodes,
  startDate: '2024-02-15T00:00:00Z',
  coverArt: '/podcast/season-1-cover.jpg'
};

export default function Podcast({ onEpisodeLike, onEpisodePlay, onBack }: PodcastProps) {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>(mockEpisodes);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [episodeComments, setEpisodeComments] = useState<{[key: string]: any[]}>({});
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePlayPause = (episode?: PodcastEpisode) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (episode && episode.id !== currentEpisode?.id) {
      setCurrentEpisode(episode);
      setCurrentTime(0);
      setIsPlaying(true);
      onEpisodePlay?.(episode.id);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = (episodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEpisodes(prev => prev.map(episode => {
      if (episode.id === episodeId) {
        const wasLiked = episode.userLiked;
        return {
          ...episode,
          userLiked: !wasLiked,
          likes: wasLiked ? episode.likes - 1 : episode.likes + 1
        };
      }
      return episode;
    }));
    onEpisodeLike?.(episodeId);
  };

  const handleAddComment = (episodeId: string) => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: 'graz', 
      content: newComment,
      time: new Date().toISOString(),
      avatar: '⭐',
      replies: []
    };
    
    setEpisodeComments(prev => {
      const comments = prev[episodeId] || [];
      if (replyingTo) {
        // Add as reply
        const updatedComments = comments.map(c => 
          c.id === replyingTo 
            ? { ...c, replies: [...(c.replies || []), comment] }
            : c
        );
        return { ...prev, [episodeId]: updatedComments };
      } else {
        // Add as main comment
        return { ...prev, [episodeId]: [...comments, comment] };
      }
    });
    
    setNewComment('');
    setReplyingTo(null);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const percentage = parseFloat(e.target.value);
    const audioDuration = audio.duration || duration;
    const newTime = (percentage / 100) * audioDuration;
    
    if (isFinite(newTime) && newTime >= 0) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks, not mouse down events (to prevent conflicts with dragging)
    if (e.type !== 'click') return;
    
    const audio = audioRef.current;
    if (!audio) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    const audioDuration = audio.duration || duration;
    const newTime = (percentage / 100) * audioDuration;
    
    if (isFinite(newTime) && newTime >= 0 && audioDuration > 0) {
      try {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      } catch (error) {
        // Failed to seek audio
      }
    }
  };

  const handleProgressMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = audioRef.current;
    if (!audio) return;
    
    const progressBar = e.currentTarget;
    const wasPlaying = !audio.paused;
    if (wasPlaying) {
      audio.pause();
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const rect = progressBar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
      const audioDuration = audio.duration || duration;
      const newTime = (percentage / 100) * audioDuration;
      
      if (isFinite(newTime) && newTime >= 0 && audioDuration > 0) {
        audio.currentTime = newTime;
        setCurrentTime(newTime);
      }
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (wasPlaying && audio.readyState >= 2) {
        audio.play().catch(() => {});
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    
    const handleCanPlay = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleError = (e: Event) => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadeddata', updateDuration);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadeddata', updateDuration);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle episode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentEpisode) {
      return;
    }

    // Reset state
    setCurrentTime(0);
    setDuration(0);
    
    // Set new source and load
    audio.src = currentEpisode.audioUrl;
    audio.load();
  }, [currentEpisode]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (isPlaying && currentEpisode) {
      const attemptPlay = async () => {
        try {
          // Wait for audio to be ready if needed
          if (audio.readyState < 2) {
            await new Promise((resolve) => {
              const onCanPlay = () => {
                audio.removeEventListener('canplay', onCanPlay);
                resolve(undefined);
              };
              audio.addEventListener('canplay', onCanPlay);
              
              // Timeout fallback
              setTimeout(() => {
                audio.removeEventListener('canplay', onCanPlay);
                resolve(undefined);
              }, 3000);
            });
          }
          
          await audio.play();
        } catch (error) {
          setIsPlaying(false);
        }
      };
      
      attemptPlay();
    } else if (!isPlaying && audio) {
      audio.pause();
    }
  }, [isPlaying, currentEpisode]);

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
            <Headphones className="text-green-500 mr-2" size={28} />
            Five Alike Podcast
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Lists come to life! Listen as our hosts explore the best user-created lists with the creators themselves.
          </p>
          </div>
        </div>
      </div>

      {/* Current Season Info */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
            <span className="text-2xl">🎧</span>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-1">
              Season {currentSeason.seasonNumber}: {currentSeason.title}
            </h2>
            <p className="text-white/80 mb-2">
              {currentSeason.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-white/70">
              <span>{currentSeason.episodes.length} episodes</span>
              <span>Started {formatDate(currentSeason.startDate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {currentEpisode && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 sticky top-4 z-10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
              <span className="text-lg">🎙️</span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {currentEpisode.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Episode {currentEpisode.episode} • {currentEpisode.hosts.join(' & ')}
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleSeek({ target: { value: '0' } } as any)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <SkipBack size={20} />
              </button>
              
              <button
                onClick={() => handlePlayPause()}
                className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button
                onClick={() => handleSeek({ target: { value: '100' } } as any)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <SkipForward size={20} />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1">
                <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg group">
                  <div 
                    className="absolute top-0 left-0 h-full bg-primary-600 rounded-lg transition-all duration-150"
                    style={{ width: `${duration && currentTime && isFinite(duration) ? Math.max(0, Math.min(100, (currentTime / duration) * 100)) : 0}%` }}
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={duration && currentTime && isFinite(duration) ? Math.max(0, Math.min(100, (currentTime / duration) * 100)) : 0}
                    onChange={handleSeek}
                    className="absolute top-0 left-0 w-full h-3 bg-transparent cursor-pointer"
                    style={{ 
                      WebkitAppearance: 'none', 
                      appearance: 'none',
                      background: 'transparent'
                    }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTime(duration)}
              </span>
            </div>
          </div>

        </div>
      )}

      {/* Global Audio Element - Always Present */}
      <audio
        ref={audioRef}
        controls={false}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onError={(e) => setIsPlaying(false)}
        style={{ display: 'none' }}
      />

      {/* Episodes List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Latest Episodes
          </h3>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {episodes.map((episode) => (
            <div
              key={episode.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayPause(episode);
                  }}
                  className="p-3 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 text-primary-600 dark:text-primary-400 rounded-full transition-colors"
                >
                  {currentEpisode?.id === episode.id && isPlaying ? 
                    <Pause size={20} /> : <Play size={20} />
                  }
                </button>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 
                      className="font-medium text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                      onClick={() => setSelectedEpisode(episode)}
                    >
                      {episode.title}
                    </h4>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                      Ep. {episode.episode}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 leading-relaxed">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{episode.hosts.join(' & ')}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{formatDate(episode.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{formatTime(episode.duration)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-medium">
                        {episode.featuredList.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Featuring &ldquo;{episode.featuredList.title}&rdquo; by {episode.featuredList.author}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {episode.playCount.toLocaleString()} plays
                      </span>
                      
                      <button
                        onClick={(e) => handleLike(episode.id, e)}
                        className={`flex items-center space-x-1 text-sm transition-colors ${
                          episode.userLiked
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <Heart size={16} fill={episode.userLiked ? 'currentColor' : 'none'} />
                        <span>{episode.likes}</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowComments(showComments === episode.id ? null : episode.id);
                        }}
                        className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <MessageCircle size={16} />
                        <span>Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Section */}
              {showComments === episode.id && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600" onClick={(e) => e.stopPropagation()}>
                  {/* Existing Comments */}
                  {episodeComments[episode.id] && episodeComments[episode.id].length > 0 && (
                    <div className="mb-4 space-y-3">
                      {episodeComments[episode.id].map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          <div className="flex space-x-3">
                            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                                {comment.avatar}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {comment.user}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(comment.time).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                {comment.content}
                              </p>
                              <button
                                onClick={() => {
                                  setReplyingTo(comment.id);
                                  setNewComment(`@${comment.user} `);
                                }}
                                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                          
                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="ml-11 space-y-2">
                              {comment.replies.map((reply: any) => (
                                <div key={reply.id} className="flex space-x-3">
                                  <div className="w-6 h-6 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400">
                                      {reply.avatar}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {reply.user}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {new Date(reply.time).toLocaleDateString()}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add Comment Form */}
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">⭐</span>
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment about this episode..."
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex justify-end space-x-2 mt-2">
                        <button
                          onClick={() => {
                            setShowComments(null);
                            setNewComment('');
                            setReplyingTo(null);
                          }}
                          className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleAddComment(episode.id)}
                          disabled={!newComment.trim()}
                          className="px-3 py-1 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white text-xs rounded transition-colors"
                        >
                          {replyingTo ? 'Reply' : 'Comment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Episode Detail Modal */}
      {selectedEpisode && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedEpisode(null)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {selectedEpisode.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {selectedEpisode.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {selectedEpisode.showNotes && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Show Notes</h4>
                  <ul className="space-y-2">
                    {selectedEpisode.showNotes.map((note, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEpisode.guestAppearances && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Guests</h4>
                  <div className="space-y-2">
                    {selectedEpisode.guestAppearances.map((guest, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                            {guest.username.charAt(1)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{guest.username}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{guest.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}