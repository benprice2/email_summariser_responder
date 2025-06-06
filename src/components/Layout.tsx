import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Gmail Summarizer. All rights reserved.</p>
      </footer>
    </div>
  );
}
