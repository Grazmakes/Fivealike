'use client';

import { useState } from 'react';
import { BarChart3, Users, MapPin, TrendingUp, Clock, Target, Globe2, Zap, Eye, Heart, HelpCircle } from 'lucide-react';

interface AnalyticsData {
  listPerformance: {
    listId: number;
    title: string;
    saves: number;
    views: number;
    saveRate: number;
    category: string;
    demographics: {
      ageGroups: { [key: string]: number };
      genders: { [key: string]: number };
      regions: { [key: string]: number };
      interests: string[];
    };
  }[];
  audienceInsights: {
    totalReach: number;
    growthRate: number;
    topRegions: Array<{ name: string; percentage: number; growth: number }>;
    ageDistribution: { [key: string]: number };
    genderSplit: { [key: string]: number };
    topInterests: Array<{ interest: string; percentage: number }>;
  };
  engagementMetrics: {
    avgSaveRate: number;
    peakEngagementHours: number[];
    bestPerformingDays: string[];
    crossPollination: Array<{ creator: string; overlap: number }>;
  };
}

const mockAnalyticsData: AnalyticsData = {
  listPerformance: [
    {
      listId: 1,
      title: "Hidden Gem Coffee Shops in Brooklyn",
      saves: 234,
      views: 1247,
      saveRate: 18.7,
      category: "Food & Drink",
      demographics: {
        ageGroups: { "18-24": 15, "25-34": 45, "35-44": 25, "45-54": 12, "55+": 3 },
        genders: { "Female": 62, "Male": 35, "Non-binary": 3 },
        regions: { "New York": 34, "California": 18, "Massachusetts": 12, "Washington": 8, "Other": 28 },
        interests: ["Coffee culture", "Local exploration", "Food photography", "Urban lifestyle"]
      }
    },
    {
      listId: 2,
      title: "Underrated Indie Albums of 2024",
      saves: 892,
      views: 3421,
      saveRate: 26.1,
      category: "Music",
      demographics: {
        ageGroups: { "18-24": 38, "25-34": 35, "35-44": 18, "45-54": 7, "55+": 2 },
        genders: { "Female": 48, "Male": 47, "Non-binary": 5 },
        regions: { "California": 22, "New York": 19, "Texas": 11, "Oregon": 9, "Other": 39 },
        interests: ["Indie music", "Vinyl collecting", "Music discovery", "Concert going"]
      }
    }
  ],
  audienceInsights: {
    totalReach: 12847,
    growthRate: 23.4,
    topRegions: [
      { name: "New York", percentage: 28, growth: 15.2 },
      { name: "California", percentage: 21, growth: 31.7 },
      { name: "Massachusetts", percentage: 12, growth: 8.9 },
      { name: "Oregon", percentage: 9, growth: 42.1 },
      { name: "Washington", percentage: 8, growth: 19.3 }
    ],
    ageDistribution: { "18-24": 28, "25-34": 41, "35-44": 21, "45-54": 8, "55+": 2 },
    genderSplit: { "Female": 54, "Male": 42, "Non-binary": 4 },
    topInterests: [
      { interest: "Local exploration", percentage: 67 },
      { interest: "Music discovery", percentage: 54 },
      { interest: "Food & dining", percentage: 48 },
      { interest: "Arts & culture", percentage: 43 },
      { interest: "Urban lifestyle", percentage: 39 }
    ]
  },
  engagementMetrics: {
    avgSaveRate: 22.4,
    peakEngagementHours: [12, 18, 20, 21],
    bestPerformingDays: ["Wednesday", "Saturday", "Sunday"],
    crossPollination: [
      { creator: "@urbanexplorer", overlap: 34 },
      { creator: "@musicdiscovery", overlap: 28 },
      { creator: "@foodielife", overlap: 22 }
    ]
  }
};

interface CreatorAnalyticsProps {
  onAuthorClick?: (author: string) => void;
}

export default function CreatorAnalytics({ onAuthorClick }: CreatorAnalyticsProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'demographics' | 'performance' | 'insights'>('overview');
  const [selectedList, setSelectedList] = useState<number | null>(null);
  const [hoveredTooltip, setHoveredTooltip] = useState<string | null>(null);

  const data = mockAnalyticsData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Creator Analytics
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Deep insights into your audience and list performance
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { key: 'overview', label: 'Overview', icon: BarChart3 },
          { key: 'demographics', label: 'Demographics', icon: Users },
          { key: 'performance', label: 'Performance', icon: TrendingUp },
          { key: 'insights', label: 'Insights', icon: Zap }
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setSelectedTab(key as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedTab === key
                ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Reach</p>
                    <button
                      onMouseEnter={() => setHoveredTooltip('totalReach')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data.audienceInsights.totalReach.toLocaleString()}
                  </p>
                </div>
              </div>
              {hoveredTooltip === 'totalReach' && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-64">
                  The total number of unique users who have viewed your lists across all platforms
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-green-600 dark:text-green-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                    <button
                      onMouseEnter={() => setHoveredTooltip('growthRate')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    +{data.audienceInsights.growthRate}%
                  </p>
                </div>
              </div>
              {hoveredTooltip === 'growthRate' && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-64">
                  The percentage increase in your audience reach over the last 30 days
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Target className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Save Rate</p>
                    <button
                      onMouseEnter={() => setHoveredTooltip('saveRate')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data.engagementMetrics.avgSaveRate}%
                  </p>
                </div>
              </div>
              {hoveredTooltip === 'saveRate' && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-64">
                  The percentage of people who save your lists after viewing them (saves ÷ views)
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 relative">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Globe2 className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Top Region</p>
                    <button
                      onMouseEnter={() => setHoveredTooltip('topRegion')}
                      onMouseLeave={() => setHoveredTooltip(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <HelpCircle size={16} />
                    </button>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {data.audienceInsights.topRegions[0].name}
                  </p>
                </div>
              </div>
              {hoveredTooltip === 'topRegion' && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10 w-64">
                  The geographic region with the highest percentage of your audience
                </div>
              )}
            </div>
          </div>

          {/* Top Performing Lists */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Performing Lists
            </h3>
            <div className="space-y-4">
              {data.listPerformance.map((list) => (
                <div key={list.listId} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{list.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{list.category}</p>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Eye size={14} />
                        <span>{list.views.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <Heart size={14} />
                        <span>{list.saves}</span>
                      </div>
                      <p className="text-xs text-gray-500">saves</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-green-600 dark:text-green-400">{list.saveRate}%</p>
                      <p className="text-xs text-gray-500">save rate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedList(selectedList === list.listId ? null : list.listId);
                      setSelectedTab('demographics');
                    }}
                    className={`ml-4 px-3 py-1 text-xs rounded transition-colors ${
                      selectedList === list.listId 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-primary-600 hover:bg-primary-700 text-white'
                    }`}
                  >
                    {selectedList === list.listId ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demographics Tab */}
      {selectedTab === 'demographics' && (
        <div className="space-y-6">
          {/* Selected List Header */}
          {selectedList && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">
                    Analyzing: {data.listPerformance.find(l => l.listId === selectedList)?.title}
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Demographics for this specific list
                  </p>
                </div>
                <button
                  onClick={() => setSelectedList(null)}
                  className="px-3 py-1 text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                >
                  View All Demographics
                </button>
              </div>
            </div>
          )}

          {/* Geographic Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <MapPin size={20} />
              <span>Geographic Distribution</span>
            </h3>
            <div className="space-y-3">
              {selectedList ? (
                // Show list-specific regions
                Object.entries(data.listPerformance.find(l => l.listId === selectedList)?.demographics.regions || {})
                  .sort(([,a], [,b]) => b - a)
                  .map(([region, percentage]) => (
                    <div key={region} className="flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 flex-1 min-w-0">
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-24 flex-shrink-0 truncate">
                          {region}
                        </span>
                        <div className="flex-1 max-w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(percentage * 2, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right flex-shrink-0">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                // Show overall regions
                data.audienceInsights.topRegions.map((region, index) => (
                  <div key={region.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-24 flex-shrink-0 truncate">
                        {region.name}
                      </span>
                      <div className="flex-1 max-w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(region.percentage * 2, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right flex-shrink-0">
                        {region.percentage}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                        +{region.growth}%
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Age & Gender Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Age Distribution</h3>
              <div className="space-y-3">
                {Object.entries(
                  selectedList 
                    ? data.listPerformance.find(l => l.listId === selectedList)?.demographics.ageGroups || {}
                    : data.audienceInsights.ageDistribution
                ).map(([age, percentage]) => (
                  <div key={age} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{age}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage * 2}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Gender Split</h3>
              <div className="space-y-3">
                {Object.entries(
                  selectedList 
                    ? data.listPerformance.find(l => l.listId === selectedList)?.demographics.genders || {}
                    : data.audienceInsights.genderSplit
                ).map(([gender, percentage]) => (
                  <div key={gender} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{gender}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage * 2}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Interests */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {selectedList ? 'List-Specific Interests' : 'Audience Interests'}
            </h3>
            {selectedList ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.listPerformance.find(l => l.listId === selectedList)?.demographics.interests.map((interest) => (
                  <div key={interest} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {interest}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {data.audienceInsights.topInterests.map((interest) => (
                  <div key={interest.interest} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {interest.interest}
                    </p>
                    <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-1">
                      {interest.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {selectedTab === 'performance' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Optimal Posting Times
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Clock size={16} className="text-primary-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Peak Hours</span>
                </div>
                <p className="text-lg font-bold text-primary-600">
                  {data.engagementMetrics.peakEngagementHours.map(h => `${h}:00`).join(', ')}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Best Days</span>
                </div>
                <p className="text-lg font-bold text-green-600">
                  {data.engagementMetrics.bestPerformingDays.slice(0, 2).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {selectedTab === 'insights' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Zap size={20} />
              <span>Audience Overlap</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Creators with similar audiences to yours - potential collaboration opportunities
            </p>
            <div className="space-y-3">
              {data.engagementMetrics.crossPollination.map((creator) => (
                <div key={creator.creator} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <button
                    onClick={() => onAuthorClick?.(creator.creator)}
                    className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer text-left"
                  >
                    {creator.creator}
                  </button>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${creator.overlap}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-primary-600 w-8">{creator.overlap}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}