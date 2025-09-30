// Category color system for consistent theming across the app
export interface CategoryColors {
  background: string;
  border: string;
  text: string;
  hover: string;
  swatch: string;
}

export const categoryColorMap: { [key: string]: CategoryColors } = {
  'Movies': {
    background: 'bg-red-500',
    border: 'border-red-500',
    text: 'text-red-500',
    hover: 'hover:bg-red-600',
    swatch: 'bg-red-500'
  },
  'TV Shows': {
    background: 'bg-purple-500',
    border: 'border-purple-500',
    text: 'text-purple-500',
    hover: 'hover:bg-purple-600',
    swatch: 'bg-purple-500'
  },
  'Books': {
    background: 'bg-green-600',
    border: 'border-green-600',
    text: 'text-green-600',
    hover: 'hover:bg-green-700',
    swatch: 'bg-green-600'
  },
  'Music': {
    background: 'bg-pink-500',
    border: 'border-pink-500',
    text: 'text-pink-500',
    hover: 'hover:bg-pink-600',
    swatch: 'bg-pink-500'
  },
  'Games': {
    background: 'bg-orange-500',
    border: 'border-orange-500',
    text: 'text-orange-500',
    hover: 'hover:bg-orange-600',
    swatch: 'bg-orange-500'
  },
  'Podcasts': {
    background: 'bg-indigo-500',
    border: 'border-indigo-500',
    text: 'text-indigo-500',
    hover: 'hover:bg-indigo-600',
    swatch: 'bg-indigo-500'
  },
  'Food': {
    background: 'bg-yellow-500',
    border: 'border-yellow-500',
    text: 'text-yellow-600',
    hover: 'hover:bg-yellow-600',
    swatch: 'bg-yellow-500'
  },
  'Travel': {
    background: 'bg-cyan-500',
    border: 'border-cyan-500',
    text: 'text-cyan-500',
    hover: 'hover:bg-cyan-600',
    swatch: 'bg-cyan-500'
  },
  'Technology': {
    background: 'bg-indigo-600',
    border: 'border-indigo-600',
    text: 'text-indigo-600',
    hover: 'hover:bg-indigo-700',
    swatch: 'bg-indigo-600'
  },
  'Sports': {
    background: 'bg-blue-600',
    border: 'border-blue-600',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-700',
    swatch: 'bg-blue-600'
  },
  'Art': {
    background: 'bg-violet-500',
    border: 'border-violet-500',
    text: 'text-violet-500',
    hover: 'hover:bg-violet-600',
    swatch: 'bg-violet-500'
  },
  'Fashion': {
    background: 'bg-rose-500',
    border: 'border-rose-500',
    text: 'text-rose-500',
    hover: 'hover:bg-rose-600',
    swatch: 'bg-rose-500'
  },
  'Photography': {
    background: 'bg-slate-500',
    border: 'border-slate-500',
    text: 'text-slate-500',
    hover: 'hover:bg-slate-600',
    swatch: 'bg-slate-500'
  },
  'Fitness': {
    background: 'bg-emerald-500',
    border: 'border-emerald-500',
    text: 'text-emerald-500',
    hover: 'hover:bg-emerald-600',
    swatch: 'bg-emerald-500'
  },
  'Science': {
    background: 'bg-teal-500',
    border: 'border-teal-500',
    text: 'text-teal-500',
    hover: 'hover:bg-teal-600',
    swatch: 'bg-teal-500'
  },
  'History': {
    background: 'bg-amber-600',
    border: 'border-amber-600',
    text: 'text-amber-600',
    hover: 'hover:bg-amber-700',
    swatch: 'bg-amber-600'
  },
  'Politics': {
    background: 'bg-red-600',
    border: 'border-red-600',
    text: 'text-red-600',
    hover: 'hover:bg-red-700',
    swatch: 'bg-red-600'
  },
  'Comedy': {
    background: 'bg-yellow-400',
    border: 'border-yellow-400',
    text: 'text-yellow-500',
    hover: 'hover:bg-yellow-500',
    swatch: 'bg-yellow-400'
  },
  'Horror': {
    background: 'bg-gray-800',
    border: 'border-gray-800',
    text: 'text-gray-800',
    hover: 'hover:bg-gray-900',
    swatch: 'bg-gray-800'
  },
  'Romance': {
    background: 'bg-pink-400',
    border: 'border-pink-400',
    text: 'text-pink-400',
    hover: 'hover:bg-pink-500',
    swatch: 'bg-pink-400'
  },
  'Adventure': {
    background: 'bg-green-500',
    border: 'border-green-500',
    text: 'text-green-500',
    hover: 'hover:bg-green-600',
    swatch: 'bg-green-500'
  },
  'Board Games': {
    background: 'bg-orange-600',
    border: 'border-orange-600',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-700',
    swatch: 'bg-orange-600'
  },
  'Health': {
    background: 'bg-red-400',
    border: 'border-red-400',
    text: 'text-red-400',
    hover: 'hover:bg-red-500',
    swatch: 'bg-red-400'
  },
  'Relationships': {
    background: 'bg-pink-300',
    border: 'border-pink-300',
    text: 'text-pink-400',
    hover: 'hover:bg-pink-400',
    swatch: 'bg-pink-300'
  },
  'Business': {
    background: 'bg-gray-600',
    border: 'border-gray-600',
    text: 'text-gray-600',
    hover: 'hover:bg-gray-700',
    swatch: 'bg-gray-600'
  },
  'Education': {
    background: 'bg-blue-500',
    border: 'border-blue-500',
    text: 'text-blue-500',
    hover: 'hover:bg-blue-600',
    swatch: 'bg-blue-500'
  },
  'Transportation': {
    background: 'bg-gray-500',
    border: 'border-gray-500',
    text: 'text-gray-500',
    hover: 'hover:bg-gray-600',
    swatch: 'bg-gray-500'
  },
  'Pets': {
    background: 'bg-orange-400',
    border: 'border-orange-400',
    text: 'text-orange-400',
    hover: 'hover:bg-orange-500',
    swatch: 'bg-orange-400'
  },
  'Environment': {
    background: 'bg-green-400',
    border: 'border-green-400',
    text: 'text-green-400',
    hover: 'hover:bg-green-500',
    swatch: 'bg-green-400'
  },
  'Social': {
    background: 'bg-purple-400',
    border: 'border-purple-400',
    text: 'text-purple-400',
    hover: 'hover:bg-purple-500',
    swatch: 'bg-purple-400'
  },
  'Shopping': {
    background: 'bg-indigo-400',
    border: 'border-indigo-400',
    text: 'text-indigo-400',
    hover: 'hover:bg-indigo-500',
    swatch: 'bg-indigo-400'
  },
  'Work': {
    background: 'bg-slate-600',
    border: 'border-slate-600',
    text: 'text-slate-600',
    hover: 'hover:bg-slate-700',
    swatch: 'bg-slate-600'
  }
};

// Helper functions
export const getCategoryColors = (category: string): CategoryColors => {
  return categoryColorMap[category] || {
    background: 'bg-gray-500',
    border: 'border-gray-500',
    text: 'text-gray-500',
    hover: 'hover:bg-gray-600',
    swatch: 'bg-gray-500'
  };
};

export const getCategorySwatch = (category: string): string => {
  return getCategoryColors(category).swatch;
};

export const getCategoryText = (category: string): string => {
  return getCategoryColors(category).text;
};