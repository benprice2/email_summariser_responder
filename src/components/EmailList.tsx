"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import EmailListItem from '@/components/EmailListItem';
import { Spinner } from '@/components/ui/Spinner';

interface Email {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body: string;
  summarized: boolean;
}

export default function EmailList() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      if (!session) return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/emails?maxResults=10');
        
        if (!response.ok) {
          throw new Error(`Error fetching emails: ${response.status}`);
        }
        
        const data = await response.json();
        setEmails(data.emails || []);
      } catch (err: any) {
        console.error('Failed to fetch emails:', err);
        setError(err.message || 'Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        <p className="text-sm mt-2">Please try again later or check your API permissions.</p>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-md text-center">
        <p className="text-gray-600 dark:text-gray-300">No emails found.</p>
        <p className="text-sm mt-2">Check back later or adjust your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <EmailListItem key={email.id} email={email} />
      ))}
    </div>
  );
}
