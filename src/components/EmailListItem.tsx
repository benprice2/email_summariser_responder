"use client";

import { useState } from 'react';
import Link from 'next/link';

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

interface EmailListItemProps {
  email: Email;
}

export default function EmailListItem({ email }: EmailListItemProps) {
  const [expanded, setExpanded] = useState(false);

  // Format the sender name to be more readable
  const formatSender = (from: string) => {
    try {
      // Extract name from "Name <email@example.com>" format
      const match = from.match(/^([^<]+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
      return from;
    } catch (e) {
      return from;
    }
  };

  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      // If it's today, just show the time
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      // If it's this year, show month and day
      if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
      
      // Otherwise show full date
      return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden ${expanded ? 'border-l-4 border-blue-500' : ''}`}>
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white truncate">
              {email.subject || "(No Subject)"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              From: {formatSender(email.from)}
            </p>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">
            {formatDate(email.date)}
          </div>
        </div>
        
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {email.snippet}
        </p>
      </div>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div className="flex justify-end space-x-2">
            <Link 
              href={`/emails/${email.id}`}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              View & Summarize
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
