'use client';

import { X, Shield, Heart, Users, MessageCircle, AlertTriangle, Flag } from 'lucide-react';

interface CommunityGuidelinesProps {
  onClose: () => void;
}

export default function CommunityGuidelines({ onClose }: CommunityGuidelinesProps) {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="text-primary-600" size={24} />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Community Guidelines
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Welcome */}
              <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4">
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  <Heart size={20} />
                  <span>Welcome to Five Alike</span>
                </h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm">
                  Our community thrives on discovering and sharing amazing recommendations. 
                  These guidelines help maintain a positive, helpful environment for everyone.
                </p>
              </div>

              {/* Core Principles */}
              <div>
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Users size={20} />
                  <span>Core Principles</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Be Helpful & Genuine</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Share recommendations you truly believe in. Quality over quantity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Respect Others</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Treat all community members with kindness, even when you disagree.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Stay On Topic</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Keep discussions focused on recommendations and constructive feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Standards */}
              <div>
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <MessageCircle size={20} />
                  <span>Content Standards</span>
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">✅ Encouraged Content</h4>
                    <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                      <li>• Thoughtful recommendations with explanations</li>
                      <li>• Personal experiences and honest reviews</li>
                      <li>• Constructive discussions about content</li>
                      <li>• Helpful tips and context for recommendations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">❌ Prohibited Content</h4>
                    <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                      <li>• Spam, self-promotion, or fake recommendations</li>
                      <li>• Hateful, threatening, or discriminatory content</li>
                      <li>• Personal information or privacy violations</li>
                      <li>• Illegal content or copyright violations</li>
                      <li>• Misleading or deceptive information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* NSFW Content */}
              <div>
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <AlertTriangle size={20} />
                  <span>NSFW Content Policy</span>
                </h3>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                    <li>• Adult content must be clearly marked as NSFW</li>
                    <li>• NSFW lists are filtered from general browse by default</li>
                    <li>• Users can opt-in to view NSFW content in settings</li>
                    <li>• Explicit thumbnails or images are not permitted</li>
                  </ul>
                </div>
              </div>

              {/* Reporting */}
              <div>
                <h3 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  <Flag size={20} />
                  <span>Reporting & Enforcement</span>
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Help us maintain community standards by reporting content that violates these guidelines:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-900 dark:text-white">Report Button:</strong> Use the flag icon on any list or comment</p>
                      <p><strong className="text-gray-900 dark:text-white">Messages:</strong> Contact moderators through the messaging system</p>
                      <p><strong className="text-gray-900 dark:text-white">Response Time:</strong> Reports are typically reviewed within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Consequences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Consequences for Violations
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>First violation:</strong> Warning and content removal</p>
                  <p><strong>Repeated violations:</strong> Temporary suspension (1-7 days)</p>
                  <p><strong>Serious violations:</strong> Permanent account suspension</p>
                  <p><strong>Appeals:</strong> Contact support if you believe action was taken in error</p>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Questions about these guidelines? Need to report something?
                </p>
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm">
                  Contact Community Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}