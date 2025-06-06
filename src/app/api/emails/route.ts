import { NextRequest, NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import { fetchEmails } from '@/lib/gmail';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated session
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get query parameters
    const url = new URL(req.url);
    const maxResults = url.searchParams.get('maxResults') 
      ? parseInt(url.searchParams.get('maxResults') as string, 10) 
      : 10;

    // Fetch emails using the Gmail API client
    const emails = await fetchEmails(session, maxResults);
    
    return NextResponse.json({ emails });
  } catch (error: any) {
    console.error('Error in emails API route:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}
