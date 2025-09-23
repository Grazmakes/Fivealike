'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // Try to fetch from the users table
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?select=*`, {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = response.ok ? await response.json() : null;
      const error = response.ok ? null : await response.json();
      
      if (error) {
        console.error('Connection error:', error);
        setIsConnected(false);
      } else {
        console.log('Connection successful! Data:', data);
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Connection failed:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 mb-4">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
        🧪 Memory Box Connection Test
      </h3>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors mb-3"
      >
        {loading ? 'Testing...' : 'Test Memory Box Connection'}
      </button>
      
      {isConnected === true && (
        <div className="text-green-600 dark:text-green-400 font-medium">
          ✅ Memory Box Connected! Your database is working perfectly!
        </div>
      )}
      
      {isConnected === false && (
        <div className="text-red-600 dark:text-red-400 font-medium">
          ❌ Connection failed. Check your Supabase keys in .env.local
        </div>
      )}
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
        This test checks if your app can talk to your Supabase database.
      </div>
      
      <button
        onClick={() => {
          // Trigger tutorial manually for testing
          const event = new CustomEvent('showTutorial');
          window.dispatchEvent(event);
        }}
        className="mt-2 px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm transition-colors"
      >
        📚 Show Tutorial (Manual Test)
      </button>
    </div>
  );
}