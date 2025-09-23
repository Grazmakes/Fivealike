'use client';

import { useState, useEffect } from 'react';

interface LoginFormProps {
  showAuth: string;
  setShowAuth: (authType: string) => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
  darkMode: boolean;
}

export default function LoginForm({ showAuth, setShowAuth, setIsLoggedIn, darkMode }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    setIsLoggedIn(true);
  };

  const fillTestAccount = (accountType: 'music' | 'graz') => {
    if (accountType === 'music') {
      setEmail('music@test.com');
      setPassword('test123');
    } else {
      setEmail('graz@test.com');
      setPassword('123');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-3">
            Five Alike
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            find a list for just about anything
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {/* Auth Toggle */}
          <div className="flex mb-6">
            <button
              onClick={() => setShowAuth('login')}
              className={`flex-1 py-3 px-4 rounded-l-lg font-medium transition-colors ${
                showAuth === 'login'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setShowAuth('signup')}
              className={`flex-1 py-3 px-4 rounded-r-lg font-medium transition-colors ${
                showAuth === 'signup'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="input-field"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 text-base font-medium"
            >
              Sign In
            </button>
          </form>

          {/* Test Accounts */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Accounts:
            </p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <button
                onClick={() => fillTestAccount('music')}
                className="block hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Email: music@test.com | Password: test123
              </button>
              <button
                onClick={() => fillTestAccount('graz')}
                className="block hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Email: graz@test.com | Password: 123
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}