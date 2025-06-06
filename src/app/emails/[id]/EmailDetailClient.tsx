"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';
import Link from 'next/link';

interface EmailDetail {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  snippet: string;
  body: string;
  summarized: boolean;
  summary?: string;
}

export default function EmailDetailClient({ emailId }: { emailId: string }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState<EmailDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summarizing, setSummarizing] = useState(false);
  
  // Debug logging
  console.log(`EmailDetailClient rendered with emailId: ${emailId}`);
  console.log(`Session status: ${status}`);
  console.log(`Loading state: ${loading}`);
  console.log(`Email state:`, email);

  useEffect(() => {
    console.log('useEffect triggered with status:', status);
    // Track if the component is mounted
    let isMounted = true;
    
    // Handle authentication status
    if (status === 'loading') {
      // Auth is still loading, don't do anything yet
      console.log('Auth is still loading, waiting...');
      return;
    }
    
    if (status === 'unauthenticated') {
      // User is not authenticated, redirect to sign in
      console.log('User is not authenticated, redirecting to sign in');
      router.push('/auth/signin');
      return;
    }
    
    // At this point, status must be 'authenticated'
    console.log('User is authenticated, proceeding to fetch email');
    
    // Don't fetch if we already have the email or we're already loading
    if (email || !emailId) {
      console.log('Skipping fetch: email already loaded or no emailId');
      return;
    }
    
    const fetchEmailDetail = async () => {
      try {
        console.log(`Starting to fetch email with ID: ${emailId}`);
        setLoading(true);
        
        const response = await fetch(`/api/emails/${emailId}`);
        console.log('API response received:', response.status);
        
        if (!response.ok) {
          throw new Error(`Error fetching email: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Email data parsed:', data);
        
        // Only update state if component is still mounted
        if (isMounted) {
          console.log('Setting email data in state');
          setEmail(data.email || null);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Failed to fetch email:', err);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setError(err.message || 'Failed to fetch email');
          setLoading(false);
        }
      }
    };

    fetchEmailDetail();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      console.log('Component unmounting, cleaning up');
      isMounted = false;
    };
  }, [status, emailId, router, email]);

  // Function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // Function to handle summarization (placeholder for now)
  const handleSummarize = async () => {
    setSummarizing(true);
    // This will be implemented in the next stage with OpenAI
    setTimeout(() => {
      setSummarizing(false);
      // For now, just show a placeholder summary
      setEmail(prev => 
        prev ? { 
          ...prev, 
          summarized: true, 
          summary: "This is a placeholder summary. In the next stage, we'll integrate OpenAI to generate real summaries of your emails." 
        } : null
      );
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-[60vh]">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md max-w-4xl mx-auto my-8">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
        <p className="text-sm mt-2">Please try again later or check your API permissions.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-md max-w-4xl mx-auto my-8 text-center">
        <p className="text-gray-600 dark:text-gray-300">Email not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Email header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold mb-2">{email.subject}</h1>
          <Link href="/dashboard" className="text-blue-600 hover:underline text-sm">
            Back to Inbox
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 dark:text-gray-400">
          <div>
            <p><span className="font-semibold">From:</span> {email.from}</p>
            <p><span className="font-semibold">To:</span> {email.to}</p>
          </div>
          <p className="mt-2 sm:mt-0">{formatDate(email.date)}</p>
        </div>
      </div>

      {/* Summary section (if available) */}
      {email.summarized && email.summary && (
        <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <p>{email.summary}</p>
        </div>
      )}

      {/* Summarize button */}
      <div className="mb-6">
        <button
          onClick={handleSummarize}
          disabled={summarizing || email.summarized}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center"
        >
          {summarizing ? (
            <>
              <Spinner size="small" className="mr-2" /> Summarizing...
            </>
          ) : email.summarized ? (
            'Summarized'
          ) : (
            'Summarize Email'
          )}
        </button>
      </div>

      {/* Email body */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm">
        <div 
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: email.body }}
        />
      </div>
    </div>
  );
}
