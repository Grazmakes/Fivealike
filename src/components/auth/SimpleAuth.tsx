'use client';

import { useEffect, useState } from 'react';

interface SimpleAuthProps {
  onUserChange: (user: any) => void;
}

const TEST_ACCOUNTS: Record<string, { password: string; username: string }> = {
  'music@test.com': { password: 'test123', username: 'musiclover' },
  'graz@test.com': { password: '123', username: 'graz' }
};

export default function SimpleAuth({ onUserChange }: SimpleAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('five-alike-user') : null;
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      onUserChange(parsed);
    }
  }, [onUserChange]);

  const handleSignIn = () => {
    setError('');

    if (!email || !password) {
      setError('Enter email and password.');
      return;
    }

    const account = TEST_ACCOUNTS[email.toLowerCase()];
    if (!account || account.password !== password) {
      setError('That test account/password combination is not valid.');
      return;
    }

    setLoading(true);

    const demoUser = {
      id: `demo_${email}`,
      username: account.username,
      email,
      avatar: '⭐',
      bio: '',
      favoriteTopics: [],
      selectedGenres: [],
      achievements: [],
      antiSocialMode: false,
      hasSeenTutorial: true,
      created_at: new Date().toISOString()
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('five-alike-user', JSON.stringify(demoUser));
    }
    setUser(demoUser);
    onUserChange(demoUser);
    setLoading(false);
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('five-alike-user');
    }
    setUser(null);
    onUserChange(null);
  };

  if (user) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          👋 Welcome back, {user.username}!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          You are browsing in demo mode. Your changes stay on this device.
        </p>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        👋 Demo Login
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="music@test.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="test123"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
        {error && <div className="text-sm text-red-600 dark:text-red-400">{error}</div>}
        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors"
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </div>
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 text-sm text-blue-800 dark:text-blue-200">
        <p className="font-medium mb-1">Test Accounts:</p>
        <p>Email: music@test.com • Password: test123</p>
        <p>Email: graz@test.com • Password: 123</p>
      </div>
    </div>
  );
}
