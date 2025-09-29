'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Upload, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import { List } from '@/types';

interface EditListModalProps {
  list: List;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedList: Partial<List>) => void;
}

export default function EditListModal({
  list,
  isOpen,
  onClose,
  onSave
}: EditListModalProps) {
  const [editedTitle, setEditedTitle] = useState(list.title);
  const [editedDescription, setEditedDescription] = useState(list.description);
  const [editedItems, setEditedItems] = useState([...list.items]);
  const [isOrdered, setIsOrdered] = useState(list.isOrdered || false);
  const [isSaving, setIsSaving] = useState(false);

  // Subject image upload states
  const [subjectImage, setSubjectImage] = useState<string | null>(list.subjectImage || null);
  const [subjectImageFile, setSubjectImageFile] = useState<File | null>(null);
  const [showImagePreview, setShowImagePreview] = useState(!!list.subjectImage);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Reset form when list changes
  useEffect(() => {
    setEditedTitle(list.title);
    setEditedDescription(list.description);
    setEditedItems([...list.items]);
    setIsOrdered(list.isOrdered || false);
    setSubjectImage(list.subjectImage || null);
    setShowImagePreview(!!list.subjectImage);
    setSubjectImageFile(null);
  }, [list]);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSubjectImage(result);
      setSubjectImageFile(file);
      setShowImagePreview(true);
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded image
  const removeImage = () => {
    setSubjectImage(null);
    setSubjectImageFile(null);
    setShowImagePreview(false);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  // Handle item change
  const handleItemChange = (index: number, value: string) => {
    const newItems = [...editedItems];
    newItems[index] = value;
    setEditedItems(newItems);
  };

  // Get edit restrictions
  const getEditRestrictions = () => {
    const listCreatedDate = new Date(list.date);
    const now = new Date();
    const timeDiff = now.getTime() - listCreatedDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    const isWithinTimeLimit = hoursDiff <= 48;
    const hasSignificantEngagement = Math.abs(list.votes) > 10 || list.comments.length > 5;

    return {
      canEditItems: isWithinTimeLimit && !hasSignificantEngagement,
      canEditTitle: isWithinTimeLimit && !hasSignificantEngagement,
      canEditDescription: true, // Always allow description edits
      canEditArtwork: true, // Always allow artwork edits
      timeRemaining: isWithinTimeLimit ? 48 - hoursDiff : 0
    };
  };

  const restrictions = getEditRestrictions();

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const updates: Partial<List> = {};

      // Only include changed fields
      if (editedTitle !== list.title && restrictions.canEditTitle) {
        updates.title = editedTitle;
      }

      if (editedDescription !== list.description) {
        updates.description = editedDescription;
      }

      if (JSON.stringify(editedItems) !== JSON.stringify(list.items) && restrictions.canEditItems) {
        updates.items = editedItems.filter(item => item.trim() !== '');
      }

      if (isOrdered !== list.isOrdered && restrictions.canEditItems) {
        updates.isOrdered = isOrdered;
      }

      if (subjectImage !== list.subjectImage) {
        updates.subjectImage = subjectImage || undefined;
      }

      await onSave(updates);
      onClose();
    } catch (error) {
      console.error('Error saving list:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit List
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Edit Restrictions Notice */}
          {(!restrictions.canEditItems || !restrictions.canEditTitle) && (
            <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="text-amber-600 dark:text-amber-400 mt-0.5" size={18} />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p className="font-medium mb-1">Limited editing available</p>
                  <p>
                    {restrictions.canEditItems && restrictions.canEditTitle
                      ? "You can edit all fields."
                      : "You can only edit description and artwork. Title and items are locked due to time limits or engagement levels."
                    }
                  </p>
                  {restrictions.timeRemaining > 0 && (
                    <p className="mt-1">
                      Time remaining for full edits: {Math.floor(restrictions.timeRemaining)} hours
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                disabled={!restrictions.canEditTitle}
                className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                  !restrictions.canEditTitle
                    ? 'opacity-50 cursor-not-allowed'
                    : 'focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                }`}
                placeholder="List title..."
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe your list..."
              />
            </div>

            {/* Subject Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject Image (Optional)
              </label>
              <div className="space-y-3">
                {/* Upload button */}
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Upload size={16} />
                    <span className="text-sm">Upload Image</span>
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Max 5MB. JPG, PNG, or WebP format.
                  </span>
                </div>

                {/* Image preview */}
                {showImagePreview && subjectImage && (
                  <div className="relative inline-block">
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <Image
                        src={subjectImage}
                        alt="Subject preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Items
              </label>
              <div className="space-y-3">
                {editedItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      disabled={!restrictions.canEditItems}
                      className={`flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                        !restrictions.canEditItems
                          ? 'opacity-50 cursor-not-allowed'
                          : 'focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                      }`}
                      placeholder={`Item ${index + 1}...`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ranked List Toggle */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isOrdered"
                checked={isOrdered}
                onChange={(e) => setIsOrdered(e.target.checked)}
                disabled={!restrictions.canEditItems}
                className={`w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 ${
                  !restrictions.canEditItems ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <label htmlFor="isOrdered" className="text-sm text-gray-700 dark:text-gray-300">
                This is a ranked list (items are in order of preference)
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white rounded-lg transition-colors"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}