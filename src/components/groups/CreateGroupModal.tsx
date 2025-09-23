'use client';

import { useState } from 'react';
import { X, Users, Tag, Info, Lock, Unlock, CheckCircle } from 'lucide-react';
import { TopicGroup } from '@/types';

interface CreateGroupModalProps {
  onClose: () => void;
  onCreateGroup: (group: Omit<TopicGroup, 'id' | 'memberCount' | 'members' | 'recentActivity' | 'stats'>) => void;
  userProfile: { username: string };
}

const categoryOptions = [
  'Movies & TV',
  'Books', 
  'Games',
  'Music',
  'Food & Cooking',
  'Travel',
  'Technology',
  'Art & Design',
  'Sports',
  'Health & Fitness',
  'Science',
  'Business',
  'Education',
  'Lifestyle',
  'Other'
];

const topicSuggestions = {
  'Movies & TV': ['Sci-Fi Enthusiasts', 'Horror Movie Buffs', 'Classic Cinema Club', 'Indie Film Lovers', 'Documentary Watchers'],
  'Books': ['Cozy Mystery Readers', 'Fantasy Book Club', 'Non-Fiction Focus', 'Poetry Appreciation', 'Book Review Circle'],
  'Games': ['Indie Game Lovers', 'Retro Gaming', 'Strategy Game Masters', 'RPG Adventures', 'Mobile Gaming'],
  'Music': ['Vinyl Collectors', 'Live Music Lovers', 'Electronic Music Scene', 'Local Bands', 'Music Production'],
  'Food & Cooking': ['Local Foodies', 'Home Cooking Masters', 'Vegan Recipes', 'Craft Beer Enthusiasts', 'Coffee Connoisseurs']
};

export default function CreateGroupModal({ onClose, onCreateGroup, userProfile }: CreateGroupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    topic: '',
    category: '',
    isPublic: true,
    requiresApproval: false,
    tags: [] as string[],
    rules: [
      'Keep discussions respectful and on-topic',
      'Share quality recommendations with context',
      'Welcome new members and help them get started'
    ]
  });

  const [currentTag, setCurrentTag] = useState('');
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Settings, 3: Review
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateStep = (stepNumber: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (stepNumber >= 1) {
      if (!formData.name.trim()) newErrors.name = 'Group name is required';
      if (!formData.description.trim()) newErrors.description = 'Description is required';
      if (!formData.category) newErrors.category = 'Category is required';
      if (!formData.topic.trim()) newErrors.topic = 'Topic is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim().toLowerCase())) {
      handleInputChange('tags', [...formData.tags, currentTag.trim().toLowerCase()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    if (validateStep(1)) {
      const newGroup = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        topic: formData.topic.trim(),
        category: formData.category,
        founder: userProfile.username,
        createdAt: new Date().toISOString(),
        isPublic: formData.isPublic,
        requiresApproval: formData.requiresApproval,
        tags: formData.tags,
        rules: formData.rules.filter(rule => rule.trim()),
        featuredLists: []
      };
      
      onCreateGroup(newGroup);
      onClose();
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Basic Information';
      case 2: return 'Group Settings';
      case 3: return 'Review & Create';
      default: return 'Create Group';
    }
  };

  const getSuggestedTopics = () => {
    return topicSuggestions[formData.category as keyof typeof topicSuggestions] || [];
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Group
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Step {step} of 3: {getStepTitle()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNumber <= step 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {stepNumber < step ? <CheckCircle size={16} /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNumber < step ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Group Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.name 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="e.g., Sci-Fi Enthusiasts"
                  maxLength={50}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.category 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Topic *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.topic 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  placeholder="What specific topic will this group focus on?"
                />
                {errors.topic && <p className="text-red-500 text-xs mt-1">{errors.topic}</p>}
                
                {formData.category && getSuggestedTopics().length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestedTopics().map(topic => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleInputChange('topic', topic)}
                          className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                    errors.description 
                      ? 'border-red-500 dark:border-red-400' 
                      : 'border-gray-300 dark:border-gray-600'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  rows={3}
                  placeholder="Describe what this group is about and what members can expect..."
                  maxLength={300}
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formData.description.length}/300 characters
                </p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Privacy Settings
                </label>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="public"
                        name="privacy"
                        checked={formData.isPublic}
                        onChange={() => handleInputChange('isPublic', true)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <Unlock size={16} className="text-green-600" />
                    </div>
                    <div>
                      <label htmlFor="public" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        Public Group
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Anyone can discover and join this group
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="private"
                        name="privacy"
                        checked={!formData.isPublic}
                        onChange={() => handleInputChange('isPublic', false)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <Lock size={16} className="text-yellow-600" />
                    </div>
                    <div>
                      <label htmlFor="private" className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        Private Group
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Only invited members can see and join this group
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Require Approval to Join
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Review new member requests before they can join
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresApproval}
                    onChange={(e) => handleInputChange('requiresApproval', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </label>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Add a tag..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Tag size={16} />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-sm"
                      >
                        #{tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-primary-500 hover:text-primary-700 dark:hover:text-primary-200"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-3">Review Your Group</h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Name:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{formData.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Topic:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{formData.topic}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Privacy:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {formData.isPublic ? 'Public' : 'Private'}
                      {formData.requiresApproval && ' (Requires Approval)'}
                    </span>
                  </div>
                  {formData.tags.length > 0 && (
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <Info size={16} className="inline mr-1" />
                  After creating your group, you can:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-5">
                  <li>• Invite members and manage member roles</li>
                  <li>• Share relevant lists and start discussions</li>
                  <li>• Plan events and meetups with your group</li>
                  <li>• Customize group rules and guidelines</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Back
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2"
              >
                <Users size={16} />
                <span>Create Group</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}