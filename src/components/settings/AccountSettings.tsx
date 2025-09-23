'use client';

import { useState } from 'react';
import { X, Shield, Eye, EyeOff, Mail, Trash2, AlertTriangle, HelpCircle } from 'lucide-react';
import { User as UserType } from '@/types';

interface AccountSettingsProps {
  onClose: () => void;
  userProfile: UserType;
  setUserProfile: (profile: UserType) => void;
  onShowTutorial?: () => void;
}

interface AccountSettingsForm {
  nsfwFilter: boolean;
}

export default function AccountSettings({ onClose, userProfile, setUserProfile, onShowTutorial }: AccountSettingsProps) {
  const [formData, setFormData] = useState<AccountSettingsForm>({
    nsfwFilter: userProfile.nsfwFilter || false
  });

  const [showNSFWInfo, setShowNSFWInfo] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteStep, setDeleteStep] = useState(1);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      nsfwFilter: formData.nsfwFilter
    });
    onClose();
  };

  const handleDeleteAccount = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else if (deleteStep === 2 && deleteConfirmation === 'DELETE') {
      // In a real app, this would make an API call to delete the account
      alert('Account deletion would be processed here. This is a demo.');
      setShowDeleteConfirm(false);
      setDeleteStep(1);
      setDeleteConfirmation('');
      onClose();
    }
  };

  const resetDeleteFlow = () => {
    setShowDeleteConfirm(false);
    setDeleteStep(1);
    setDeleteConfirmation('');
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
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Account Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">

          {/* Privacy & Safety */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Shield size={20} />
              <span>Privacy & Safety</span>
            </h3>
            
            <div className="space-y-4">
              {/* NSFW Filter */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      NSFW Content Filter
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowNSFWInfo(!showNSFWInfo)}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showNSFWInfo ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {showNSFWInfo 
                      ? "When enabled, filters out content marked as Not Safe For Work. This includes mature themes, adult content, and potentially sensitive material. Lists marked as NSFW by creators will be hidden from your feed and search results."
                      : "Hide mature content from your recommendations"
                    }
                  </p>
                </div>
                <div className="ml-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.nsfwFilter}
                      onChange={(e) => handleInputChange('nsfwFilter', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Mail size={20} />
              <span>Notification Preferences</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Notifications
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive updates about your activity
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Event Reminders
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Get notified about upcoming events
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Tutorial & Help */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <HelpCircle size={20} />
              <span>Help & Support</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Show Tutorial Again
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Replay the getting started tutorial
                  </p>
                </div>
                <button
                  onClick={() => {
                    onShowTutorial?.();
                    onClose();
                  }}
                  className="px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Start Tutorial
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
            <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center space-x-2">
              <AlertTriangle size={20} />
              <span>Danger Zone</span>
            </h3>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                    Delete Account
                  </h4>
                  <p className="text-sm text-red-600 dark:text-red-400 leading-relaxed pr-2">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex items-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    <Trash2 size={16} />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="text-red-600 dark:text-red-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Delete Account
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Step {deleteStep} of 2
                  </p>
                </div>
              </div>

              {deleteStep === 1 ? (
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    Are you sure you want to delete your account? This will permanently:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-6 ml-4">
                    <li>• Delete all your lists and saved content</li>
                    <li>• Remove all your comments and activity</li>
                    <li>• Cancel your participation in events and groups</li>
                    <li>• Permanently erase your profile and account data</li>
                  </ul>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Warning:</strong> This action cannot be undone. All data will be permanently lost.
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    To confirm account deletion, please type <strong>DELETE</strong> in the field below:
                  </p>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={resetDeleteFlow}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleteStep === 2 && deleteConfirmation !== 'DELETE'}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-800 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  {deleteStep === 1 ? 'Continue' : 'Delete Account'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}