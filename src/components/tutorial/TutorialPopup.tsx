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
    description: 'Discover "5 more just like it" for anything you love. Browse curated recommendation lists across movies, music, books, TV shows, food, and more.',
    icon: <Sparkles size={48} className="text-emerald-600" />,
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Browse "If you like X, try these FIVE ALIKE..." lists',
      'Discover new favorites across all categories',
      'Vote and comment on recommendations',
      'Save lists to revisit later',
      'Follow users with great taste'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
        <div className="mb-3">
          <div className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Example List</div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              If you like &quot;Breaking Bad&quot;, try these FIVE ALIKE...
            </div>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              <div>1. The Sopranos</div>
              <div>2. The Wire</div>
              <div>3. Better Call Saul</div>
              <div>4. Ozark</div>
              <div>5. Succession</div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-600">
              <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">TV Shows</span>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <span>↑ 180</span>
                <span>by @tvfan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Browse & Discover',
    description: 'Find recommendations that match your interests.',
    icon: <Search size={48} className="text-blue-600" />,
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    features: [
      'Search by keyword, category, or username',
      'On mobile: Swipe right from the left edge to reveal the genres menu',
      'Browse categories: Movies, Music, Books, TV, Food, Travel, Games',
      'Filter by trending or newest lists',
      'Click any list to see full details and vote',
      'Bookmark items to try later'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
        <div className="space-y-2">
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-sm">
            🔍 Search lists, items, or users...
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs">Movies</span>
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-xs">TV Shows</span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded text-xs">Music</span>
            <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded text-xs">Books</span>
            <span className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200 rounded text-xs">Food</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'Create Your Own Lists',
    description: 'Share your recommendations with the community.',
    icon: <Grid size={48} className="text-purple-600" />,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    features: [
      'Click "Create List" to get started',
      'Pick a category and choose 5 items',
      'Add descriptions to help others',
      'Watch as people vote on your recommendations',
      'Earn reputation by creating great lists'
    ],
    demoElement: (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
        <div className="mb-3">
          <div className="text-sm font-semibold mb-2">Your List Title:</div>
          <div className="bg-white dark:bg-gray-800 p-2 rounded border text-sm mb-2">
            &quot;If you like The Matrix, try these FIVE ALIKE...&quot;
          </div>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-2">
            <div>✓ Inception</div>
            <div>✓ Blade Runner 2049</div>
            <div>✓ Dark City</div>
            <div>✓ Ex Machina</div>
            <div>✓ Total Recall</div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs">Publish List</button>
            <span className="text-xs text-gray-500">Category: Movies</span>
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 lg:p-4 z-50 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[85vh] lg:h-[700px] shadow-2xl transform transition-all duration-300 ${
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
        } p-2 lg:p-4 text-white relative`}>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0 flex-1">
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="scale-50 lg:scale-75">{step.icon}</div>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-sm lg:text-xl font-bold truncate">
                  {step.title}
                </h2>
                <p className="text-white/80 text-xs lg:text-sm">
                  {currentStep + 1}/{tutorialSteps.length}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                console.log('❌ Tutorial X button clicked - closing tutorial');
                onClose();
              }}
              className="p-2 lg:p-3 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
            >
              <X size={20} className="lg:hidden" />
              <X size={24} className="hidden lg:block" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 lg:p-4 flex-1 overflow-y-auto">
          {/* Description */}
          <div className="text-center mb-2 lg:mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-base leading-snug lg:leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Compact Single Column Layout */}
          <div className="space-y-2 lg:space-y-4 mb-2 lg:mb-4">
            {/* Features List */}
            <div className="space-y-1 lg:space-y-2">
              <h4 className="text-xs lg:text-base font-semibold text-gray-900 dark:text-white mb-1 lg:mb-3 flex items-center">
                <Play className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-blue-600" />
                Key Features
              </h4>
              {step.features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-1 lg:space-x-2 p-1 lg:p-2 rounded transition-all duration-300 ${
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
                  <div className={`w-1 h-1 lg:w-2 lg:h-2 rounded-full mt-1 lg:mt-1.5 flex-shrink-0 ${
                    step.color === 'emerald' ? 'bg-emerald-500' :
                    step.color === 'blue' ? 'bg-blue-500' :
                    step.color === 'purple' ? 'bg-purple-500' :
                    step.color === 'green' ? 'bg-green-500' :
                    step.color === 'yellow' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-gray-700 dark:text-gray-300 text-[11px] lg:text-sm leading-snug lg:leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Interactive Demo */}
            {step.demoElement && (
              <div className="space-y-1 lg:space-y-2">
                <h4 className="text-xs lg:text-base font-semibold text-gray-900 dark:text-white mb-1 lg:mb-3 flex items-center">
                  <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 text-purple-600" />
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
        <div className="border-t border-gray-200 dark:border-gray-600 p-2 lg:p-3 bg-gray-50 dark:bg-gray-800">
          {/* Compact Progress Indicators */}
          <div className="flex justify-center items-center space-x-1.5 lg:space-x-2 mb-2 lg:mb-3">
            {tutorialSteps.map((tutorialStep, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => goToStep(index)}
                  className={`w-5 h-5 lg:w-6 lg:h-6 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 flex items-center justify-center ${
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
        <div className="flex items-center justify-between p-2 lg:p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <button
              onClick={() => {
                console.log('⏭️ Skip Tutorial button clicked');
                skipTutorial();
              }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-xs lg:text-sm font-medium transition-all duration-200 hover:scale-105"
            >
              Skip
            </button>
            <div className="hidden lg:block text-xs text-gray-400">
              Press ESC to close
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                disabled={isAnimating}
                className="flex items-center space-x-1 px-2 lg:px-3 py-1.5 lg:py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all duration-200 text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft size={14} className="lg:hidden" />
                <ArrowLeft size={16} className="hidden lg:block" />
                <span className="hidden lg:inline">Back</span>
              </button>
            )}

            <button
              onClick={nextStep}
              disabled={isAnimating}
              className={`flex items-center space-x-1 px-3 lg:px-4 py-1.5 lg:py-2 ${
                step.color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' :
                step.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                step.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                step.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                step.color === 'yellow' ? 'bg-yellow-600 hover:bg-yellow-700' :
                'bg-red-600 hover:bg-red-700'
              } text-white rounded transition-all duration-200 font-medium text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span>{currentStep === tutorialSteps.length - 1 ? 'Start 🚀' : 'Next'}</span>
              {currentStep < tutorialSteps.length - 1 && (
                <>
                  <ArrowRight size={14} className="lg:hidden" />
                  <ArrowRight size={16} className="hidden lg:block" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}