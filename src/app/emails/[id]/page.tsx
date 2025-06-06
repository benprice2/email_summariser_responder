import { use } from 'react';
import EmailWrapper from './EmailWrapper';

// Server component that handles params and passes the ID to client component
export default function EmailDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use
  const unwrappedParams = use(params);
  const emailId = unwrappedParams.id;
  
  // Pass the unwrapped ID to the client wrapper component
  return <EmailWrapper emailId={emailId} />;
}
