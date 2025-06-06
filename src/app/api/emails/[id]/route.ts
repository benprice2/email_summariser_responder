import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getEmailById } from '@/lib/gmail';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Get the authenticated session
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Await the params before accessing properties
    const params = await context.params;
    const emailId = params.id;
    
    if (!emailId) {
      return NextResponse.json(
        { error: 'Email ID is required' },
        { status: 400 }
      );
    }

    // Fetch the specific email using the Gmail API client
    const email = await getEmailById(session, emailId);
    
    return NextResponse.json({ email });
  } catch (error: any) {
    // Await params again to access id in error handling
    const errorParams = await context.params;
    console.error(`Error fetching email ${errorParams.id}:`, error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch email' },
      { status: 500 }
    );
  }
}
