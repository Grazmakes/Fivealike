'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Home, Search, Grid, Calendar, Users, User, Bookmark, MessageCircle, Heart, Trophy, Star, Sparkles, Zap, Target, Play } from 'lucide-react';

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
    description: 'The social platform where "if you like this, you\'ll love that" comes to life. Discover personalized recommendations from a community of tastemakers.',
    icon: <Sparkles size={48} className="text-emerald-600" />,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Browse personalized feed based on your interests',
      'Vote on lists and individual recommendations',
      'Give weekly high-fives to outstanding content',
      'Real-time activity updates and notifications'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-semibold text-emerald-800 dark:text-emerald-200">Try the interactive demo!</div>
            <div className="text-sm text-emerald-600 dark:text-emerald-400">Click the vote buttons below</div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm transition-all hover:scale-105">
            ↑ 42
          </button>
          <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg text-sm transition-all hover:scale-105">
            ↓ 3
          </button>
          <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm transition-all hover:scale-105">
            🙌 High Five
          </button>
        </div>
      </div>
    )
  },
  {
    title: 'Navigation & Discovery',
    description: 'Seamlessly explore content through our intuitive navigation system and powerful discovery tools.',
    icon: <Search size={48} className="text-blue-600" />,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      'Left sidebar: Quick access to Home, Discovery, Local events',
      'Top search: Find lists, users, or specific items instantly',
      'Right sidebar: Browse by categories and genres',
      'Smart filters: Trending, Hot Lists, and personalized recommendations'
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
    description: 'Build your reputation as a tastemaker by creating compelling recommendation lists that resonate with the community.',
    icon: <Grid size={48} className="text-purple-600" />,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Click "Create List" from sidebar navigation',
      'Choose from Movies, Books, Music, Games, and more',
      'Add descriptions and context for better engagement',
      'Mention users with @username and use #hashtags',
      'Track performance with real-time analytics'
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
            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-800 text-pink-800 dark:text-pink-200 rounded text-xs">#mindblowing</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Social & Events',
    description: 'Join a vibrant community through local events, group activities, and meaningful connections.',
    icon: <Calendar size={48} className="text-green-600" />,
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    features: [
      'RSVP to local movie nights, book clubs, and game meetups',
      'Create your own events based on your lists',
      'Real-time chat with event participants',
      'Follow users and get notified of their activities',
      'Anti-social mode available for focused browsing'
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
    description: 'Track your impact and compete with the community through comprehensive stats and achievement system.',
    icon: <Trophy size={48} className="text-yellow-600" />,
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
    features: [
      'Earn badges for milestones and community contributions',
      'Climb leaderboards: Taste Makers, Trend Setters, Quality Creators',
      'Set personal goals and track progress',
      'Detailed analytics on your influence and taste profile',
      'Special rewards for early adopters and top contributors'
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
    title: 'Personalization & Pro Tips',
    description: 'Master advanced features to customize your experience and maximize your Five Alike potential.',
    icon: <Target size={48} className="text-red-600" />,
    color: 'red',
    gradient: 'from-red-500 to-pink-600',
    features: [
      'Bookmark individual items from any list for later',
      'Use seasonal reminders for timely content creation',
      'Access detailed taste analytics in your profile',
      'Manage privacy with anti-social mode toggle',
      'Weekly high-five limits keep them meaningful and special'
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
      // Disabled background click to close - only X button closes tutorial
      // onClick={onClose}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
        } overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <div className={`bg-gradient-to-r ${step.gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                {step.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {step.title}
                </h2>
                <p className="text-white/80 text-lg">
                  Step {currentStep + 1} of {tutorialSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                console.log('❌ Tutorial X button clicked - closing tutorial');
                onClose();
              }}
              className="p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-400 text-xl leading-relaxed max-w-3xl mx-auto">
              {step.description}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Features List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2 text-blue-600" />
                Key Features
              </h4>
              {step.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    showDemo ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`,
                    background: `linear-gradient(135deg, ${step.color === 'emerald' ? '#ecfdf5' : 
                      step.color === 'blue' ? '#eff6ff' :
                      step.color === 'purple' ? '#faf5ff' :
                      step.color === 'green' ? '#f0fdf4' :
                      step.color === 'yellow' ? '#fefce8' :
                      '#fef2f2'} 0%, transparent 100%)`
                  }}
                >
                  <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
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
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-600" />
                Interactive Demo
              </h4>
              <div className={`transition-all duration-500 transform ${
                showDemo ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
              }`}>
                {step.demoElement}
              </div>
            </div>
          </div>

          {/* Enhanced Progress Indicators */}
          <div className="flex justify-center items-center space-x-3 mb-8">
            {tutorialSteps.map((tutorialStep, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`relative w-12 h-12 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 flex items-center justify-center group ${
                    index === currentStep
                      ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg`
                      : index < currentStep
                      ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-400'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-500 dark:hover:bg-gray-600'
                  }`}
                  title={`Go to step ${index + 1}: ${tutorialStep.title}`}
                >
                  {index < currentStep ? (
                    <span className="text-lg">✓</span>
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </button>
                <div className={`mt-2 text-xs transition-all duration-300 ${
                  index === currentStep 
                    ? 'text-gray-900 dark:text-white font-semibold' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {tutorialStep.title.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50">
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
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={18} />
                <span className="font-medium">Back</span>
              </button>
            )}
            
            <button
              onClick={nextStep}
              disabled={isAnimating}
              className={`flex items-center space-x-2 px-8 py-3 bg-gradient-to-r ${step.gradient} hover:shadow-lg text-white rounded-xl transition-all duration-200 hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed transform-gpu`}
            >
              <span>{currentStep === tutorialSteps.length - 1 ? 'Get Started! 🚀' : 'Continue'}</span>
              {currentStep < tutorialSteps.length - 1 && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}