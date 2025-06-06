"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/ui/Spinner';

interface EmailStatsData {
  total: number;
  unread: number;
  categories: {
    [key: string]: number;
  };
  lastWeekCount: number;
}

export default function EmailStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<EmailStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmailStats = async () => {
      if (!session) return;
      
      try {
        setLoading(true);
        
        // For now, we'll use mock data
        // In a future implementation, this would be an API call to /api/emails/stats
        setTimeout(() => {
          setStats({
            total: 253,
            unread: 12,
            categories: {
              'Primary': 156,
              'Social': 47,
              'Promotions': 38,
              'Updates': 12
            },
            lastWeekCount: 42
          });
          setLoading(false);
        }, 1000);
        
      } catch (err: any) {
        console.error('Failed to fetch email stats:', err);
        setError(err.message || 'Failed to fetch email statistics');
        setLoading(false);
      }
    };

    fetchEmailStats();
  }, [session]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full flex justify-center items-center">
        <Spinner size="default" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full">
        <p className="text-gray-600 dark:text-gray-400">No statistics available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Email Statistics</h2>
      
      <div className="space-y-6">
        {/* Main stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Emails</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.unread}</p>
          </div>
        </div>
        
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Categories</h3>
          <div className="space-y-2">
            {Object.entries(stats.categories).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">{category}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Weekly trend */}
        <div>
          <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Last 7 Days</h3>
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">New emails</span>
              <span className="text-lg font-medium text-green-600 dark:text-green-400">{stats.lastWeekCount}</span>
            </div>
          </div>
        </div>
        
        {/* Future feature teaser */}
        <div className="border border-dashed border-gray-300 dark:border-gray-600 p-3 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Coming soon: Email analytics and summarization statistics
          </p>
        </div>
      </div>
    </div>
  );
}
