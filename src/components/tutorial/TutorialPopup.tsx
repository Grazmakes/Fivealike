'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Home, Search, Grid, Calendar, Users, User, Bookmark, MessageCircle, Heart, Trophy, Star, Sparkles, Zap, Target, Play, ArrowDown, ArrowUp } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  interactiveDemo?: () => void;
  demoElement?: React.ReactNode;
  color: string;
  gradient: string;
}

interface TutorialPopupProps {
  onClose: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to Five Alike!',
    description: 'Find "5 more just like it" for anything you love! Browse recommendation lists created by people with great taste, or make your own.',
    icon: <Sparkles size={48} className="text-emerald-600" />,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Browse "If you like X, try these 5..." lists',
      'Discover movies, music, books, games & more',
      'Vote on recommendations you like',
      'Create your own recommendation lists',
      'Follow people with similar taste'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="mb-3">
          <div className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">How it Works</div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              If you like "Stranger Things", try these 5...
            </div>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>1. Dark</div>
              <div>2. The OA</div>
              <div>3. Twin Peaks</div>
              <div>4. Fringe</div>
              <div>5. Black Mirror</div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">TV Shows</span>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>↑ 445</span>
                <span>by @tvfan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Navigation & Discovery',
    description: 'Easy ways to find what you\'re looking for.',
    icon: <Search size={48} className="text-blue-600" />,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      'Left sidebar: Home, Discovery, Events',
      'Search bar: Find lists, users, or items',
      'Right sidebar: Browse by category',
      'Filters: Trending and Hot Lists'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-xs text-center">Home</div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-xs text-center">Discover</div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-xs text-center">Events</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-2 rounded border text-sm">
          🔍 Search anything...
        </div>
      </div>
    )
  },
  {
    title: 'Create & Share',
    description: 'Make your own recommendation lists and share your taste with others.',
    icon: <Grid size={48} className="text-purple-600" />,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Click "Create List" in the sidebar',
      'Choose a category like Movies, Books, Music',
      'Add your 5 recommendations',
      'Mention other users with @username',
      'See how people vote on your lists'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="mb-3">
          <div className="text-sm font-semibold mb-2">Create a list:</div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-sm mb-2">
            &quot;If you like Inception, you&apos;ll love...&quot;
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-xs">Movies</span>
            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded text-xs">@moviebuff</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Social & Events',
    description: 'Meet people who share your interests through local events and online community.',
    icon: <Calendar size={48} className="text-green-600" />,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    features: [
      'Join local movie nights and book clubs',
      'Create your own meetup events',
      'Chat with other participants',
      'Follow users you like',
      'Turn on "anti-social mode" to browse quietly'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-700">
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold">Sci-Fi Movie Night</span>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Tonight at 7 PM • Online Event</div>
          <div className="flex space-x-2">
            <button className="px-2 py-1 bg-green-500 text-white rounded text-xs">Going (8)</button>
            <button className="px-2 py-1 bg-gray-300 text-gray-700 rounded text-xs">Maybe (2)</button>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Achievements & Leaderboards',
    description: 'Earn badges and see how you rank against other users.',
    icon: <Trophy size={48} className="text-yellow-600" />,
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    features: [
      'Earn badges for creating great lists',
      'Climb leaderboards and compete with others',
      'Set personal goals like "Create 10 lists"',
      'See detailed stats about your activity',
      'Get special rewards for being an early user'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-700">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white dark:bg-gray-800 p-2 rounded text-center">
            <Trophy className="w-4 h-4 mx-auto mb-1 text-yellow-600" />
            <div className="text-xs font-semibold">Verified</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded text-center">
            <Star className="w-4 h-4 mx-auto mb-1 text-purple-600" />
            <div className="text-xs font-semibold">Early Adopter</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-center">🎯 Goal: Create 10 lists (3/10)</div>
      </div>
    )
  },
  {
    title: 'Tips & Features',
    description: 'Extra features to make your experience even better.',
    icon: <Target size={48} className="text-red-600" />,
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    features: [
      'Bookmark items from lists to try later',
      'Get reminders to create seasonal lists',
      'Check your taste profile in settings',
      'Use "anti-social mode" for quiet browsing',
      'High-fives are limited weekly to keep them special'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-red-200 dark:border-red-700">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">Your Impact</span>
            <Zap className="w-4 h-4 text-red-600" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>Lists Created: <span className="font-bold">3</span></div>
            <div>High Fives: <span className="font-bold">12</span></div>
            <div>Followers: <span className="font-bold">8</span></div>
            <div>Saves Received: <span className="font-bold">47</span></div>
          </div>
        </div>
      </div>
    )
  }
];

export default function TutorialPopup({ onClose }: TutorialPopupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Trigger demo animation after step loads
    const timer = setTimeout(() => setShowDemo(true), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const nextStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep < tutorialSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setShowDemo(false);
      } else {
        onClose();
      }
      setIsAnimating(false);
    }, 200);
  };

  const prevStep = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setShowDemo(false);
      }
      setIsAnimating(false);
    }, 200);
  };

  const skipTutorial = () => {
    onClose();
  };

  const goToStep = (stepIndex: number) => {
    if (isAnimating || stepIndex === currentStep) return;
    
    setIsAnimating(true);
    setShowDemo(false);
    setTimeout(() => {
      setCurrentStep(stepIndex);
      setIsAnimating(false);
    }, 200);
  };

  const step = tutorialSteps[currentStep];

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full h-[700px] shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        } overflow-hidden flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flat Header */}
        <div className={`${
          step.color === 'emerald' ? 'bg-emerald-600' :
          step.color === 'blue' ? 'bg-blue-600' :
          step.color === 'purple' ? 'bg-purple-600' :
          step.color === 'green' ? 'bg-green-600' :
          step.color === 'yellow' ? 'bg-yellow-600' :
          'bg-red-600'
        } p-4 text-white relative`}>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="scale-75">{step.icon}</div>
              </div>
              <div>
                <h2 className="text-xl font-bold">
                  {step.title}
                </h2>
                <p className="text-white/80 text-sm">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                console.log('❌ Tutorial X button clicked - closing tutorial');
                onClose();
              }}
              className="p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Description */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Compact Single Column Layout */}
          <div className="space-y-4 mb-4">
            {/* Features List */}
            <div className="space-y-2">
              <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <Play className="w-4 h-4 mr-2 text-blue-600" />
                Key Features
              </h4>
              {step.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 p-2 rounded transition-all duration-300 ${
                    showDemo ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    background: `${step.color === 'emerald' ? '#ecfdf5' :
                      step.color === 'blue' ? '#eff6ff' :
                      step.color === 'purple' ? '#faf5ff' :
                      step.color === 'green' ? '#f0fdf4' :
                      step.color === 'yellow' ? '#fefce8' :
                      '#fef2f2'}`
                  }}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    step.color === 'emerald' ? 'bg-emerald-500' :
                    step.color === 'blue' ? 'bg-blue-500' :
                    step.color === 'purple' ? 'bg-purple-500' :
                    step.color === 'green' ? 'bg-green-500' :
                    step.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Demo */}
            {step.demoElement && (
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Zap className="w-4 h-4 mr-2 text-purple-600" />
                  Example
                </h4>
                <div className={`transition-all duration-500 transform ${
                  showDemo ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
                }`}>
                  {step.demoElement}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress & Navigation - Fixed at bottom */}
        <div className="border-t border-gray-200 dark:border-gray-600 p-3 bg-gray-50 dark:bg-gray-800">
          {/* Compact Progress Indicators */}
          <div className="flex justify-center items-center space-x-2 mb-3">
            {tutorialSteps.map((tutorialStep, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`w-6 h-6 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 flex items-center justify-center ${
                    index === currentStep
                      ? `${
                        step.color === 'emerald' ? 'bg-emerald-600' :
                        step.color === 'blue' ? 'bg-blue-600' :
                        step.color === 'purple' ? 'bg-purple-600' :
                        step.color === 'green' ? 'bg-green-600' :
                        step.color === 'yellow' ? 'bg-yellow-600' :
                        'bg-red-600'
                      } text-white shadow-lg`
                      : index < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  }`}
                  title={`Step ${index + 1}: ${tutorialStep.title}`}
                >
                  {index < currentStep ? (
                    <span className="text-xs">✓</span>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                console.log('⏭️ Skip Tutorial button clicked');
                skipTutorial();
              }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Skip Tutorial
            </button>
            <div className="text-xs text-gray-400">
              Press ESC to close
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                disabled={isAnimating}
                className="flex items-center space-x-1 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            )}
            
            <button
              onClick={nextStep}
              disabled={isAnimating}
              className={`flex items-center space-x-1 px-4 py-2 ${
                step.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                step.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                step.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                step.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                step.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                'bg-red-600 hover:bg-red-700'
              } text-white rounded transition-all duration-200 font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{currentStep === tutorialSteps.length - 1 ? 'Get Started! 🚀' : 'Continue'}</span>
              {currentStep < tutorialSteps.length - 1 && <ArrowRight size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}