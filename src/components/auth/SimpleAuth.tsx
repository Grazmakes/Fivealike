'use client';

import { useEffect, useState } from 'react';

interface SimpleAuthProps {
  onUserChange: (user: any) => void;
}

const TEST_ACCOUNTS: Record<string, { password: string; username: string }> = {
  'music@test.com': { password: 'test123', username: 'musiclover' },
  'graz@test.com': { password: '123', username: 'graz' },
  'user@example.com': { password: 'password', username: 'user' },
  'demo@fivealike.com': { password: 'demo123', username: 'demo' }
};

export default function SimpleAuth({ onUserChange }: SimpleAuthProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Clear form when switching between login and register
  const handleModeSwitch = (registering: boolean) => {
    setIsRegistering(registering);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUsername('');
    setError('');
  };

  useEffect(() => {
    // For development: Clear localStorage on page load to force fresh login
    if (typeof window !== 'undefined') {
      // Temporarily disable auto-login for testing
      const shouldClearSession = true; // Set to false to enable auto-login

      if (shouldClearSession) {
        localStorage.removeItem('five-alike-user');
        return;
      }

      // Normal session restoration logic (currently disabled for testing)
      const saved = localStorage.getItem('five-alike-user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.id && parsed.username && parsed.email) {
            setUser(parsed);
            onUserChange(parsed);
          }
        } catch (error) {
          console.log('Clearing invalid user data from localStorage');
          localStorage.removeItem('five-alike-user');
        }
      }
    }
  }, [onUserChange]);

  const handleSignIn = () => {
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    const account = TEST_ACCOUNTS[email.toLowerCase()];
    if (!account || account.password !== password) {
      setError('Invalid email or password. Please try again.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const authenticatedUser = {
        id: `user_${email}`,
        username: account.username,
        email,
        avatar: '⭐',
        bio: `Welcome to Five Alike! I'm ${account.username}`,
        favoriteTopics: [],
        selectedGenres: [],
        achievements: [],
        antiSocialMode: false,
        hasSeenTutorial: false,
        created_at: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('five-alike-user', JSON.stringify(authenticatedUser));
      }
      setUser(authenticatedUser);
      onUserChange(authenticatedUser);
      setLoading(false);
    }, 800);
  };

  const handleRegister = () => {
    setError('');

    if (!email || !password || !username) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Check if email already exists in test accounts
    if (TEST_ACCOUNTS[email.toLowerCase()]) {
      setError('An account with this email already exists. Please sign in instead.');
      return;
    }

    // In a real app, you would check against your database here

    setLoading(true);

    setTimeout(() => {
      // In real app, this would be saved to database
      // For demo purposes, we'll simulate account creation without modifying the global object

      const newUser = {
        id: `user_${email}`,
        username: username.trim(),
        email,
        avatar: '✨',
        bio: `New to Five Alike! I'm ${username.trim()}`,
        favoriteTopics: [],
        selectedGenres: [],
        achievements: ['first_steps'],
        antiSocialMode: false,
        hasSeenTutorial: false,
        created_at: new Date().toISOString()
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('five-alike-user', JSON.stringify(newUser));
      }
      setUser(newUser);
      onUserChange(newUser);
      setLoading(false);
    }, 1000);
  };

  const handleSignOut = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('five-alike-user');
    }
    setUser(null);
    onUserChange(null);
  };

  // Don't show anything if user is logged in - this component is only for login
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center p-4 pt-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Five Alike</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">find a list for just about anything</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
          <div className="space-y-7">
            {/* Toggle between Login and Register */}
            <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button
                onClick={() => handleModeSwitch(false)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all ${
                  !isRegistering
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => handleModeSwitch(true)}
                className={`flex-1 py-3 px-4 rounded-md text-sm font-semibold transition-all ${
                  isRegistering
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            {/* Username field (only for registration) */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a username"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 transition-all"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && (isRegistering ? handleRegister() : handleSignIn())}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isRegistering ? "Create a password (min 6 characters)" : "Enter your password"}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && (isRegistering ? handleRegister() : handleSignIn())}
              />
            </div>

            {/* Confirm Password field (only for registration) */}
            {isRegistering && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-500 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleRegister()}
                />
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded-md">
                <div className="text-sm font-medium text-red-700 dark:text-red-200">{error}</div>
              </div>
            )}

            <button
              onClick={isRegistering ? handleRegister : handleSignIn}
              disabled={loading}
              className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              {loading ? (isRegistering ? 'Creating Account...' : 'Signing in...') : (isRegistering ? 'Create Account' : 'Sign In')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
