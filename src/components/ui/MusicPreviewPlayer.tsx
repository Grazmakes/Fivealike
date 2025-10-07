'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface MusicPreviewPlayerProps {
  artistId?: string;
  artistName: string;
}

export default function MusicPreviewPlayer({ artistId, artistName }: MusicPreviewPlayerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [trackName, setTrackName] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchPreview();
  }, [artistId, artistName]);

  const fetchPreview = async () => {
    try {
      setLoading(true);
      setError(false);

      const params = new URLSearchParams();
      if (artistId) {
        params.append('artistId', artistId);
      } else {
        params.append('artistName', artistName);
      }

      const response = await fetch(`/api/preview-track?${params}`);

      if (!response.ok) {
        setError(true);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setPreviewUrl(data.previewUrl);
      setTrackName(data.trackName);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch preview:', err);
      setError(true);
      setLoading(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">Loading preview...</div>
      </div>
    );
  }

  if (error || !previewUrl) {
    return (
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">Preview not available</div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-750 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
      <audio
        ref={audioRef}
        src={previewUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <div className="flex items-center gap-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 flex items-center justify-center transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" fill="white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          )}
        </button>

        {/* Track Info & Progress */}
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate mb-1">
            {trackName}
          </div>

          {/* Progress Bar */}
          <div
            className="relative h-1 bg-gray-300 dark:bg-gray-600 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="absolute top-0 left-0 h-full bg-green-500 dark:bg-green-600 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="flex-shrink-0 w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">
        30-second preview
      </div>
    </div>
  );
}
