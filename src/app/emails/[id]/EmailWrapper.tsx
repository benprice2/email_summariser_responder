"use client";

import dynamic from 'next/dynamic';

// Dynamically import the client component with no SSR to avoid hydration issues
// This is allowed in a client component
const EmailDetailClient = dynamic(() => import('./EmailDetailClient'), { ssr: false });

// Client wrapper component that receives the emailId from the server component
export default function EmailWrapper({ emailId }: { emailId: string }) {
  return <EmailDetailClient emailId={emailId} />;
}
