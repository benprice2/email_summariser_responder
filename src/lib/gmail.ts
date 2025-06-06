import { google } from 'googleapis';
import { Session } from 'next-auth';

// Initialize the Gmail API client
export const getGmailClient = (session: Session | null) => {
  if (!session?.accessToken) {
    throw new Error('No access token found in session');
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken as string,
    refresh_token: session.refreshToken as string,
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};

// Fetch emails from Gmail
export const fetchEmails = async (session: Session | null, maxResults = 10) => {
  try {
    const gmail = getGmailClient(session);
    
    // Get list of messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      q: 'in:inbox', // Only fetch inbox emails
    });

    const messages = response.data.messages || [];
    
    // Fetch full message details for each email
    const emails = await Promise.all(
      messages.map(async (message) => {
        const email = await gmail.users.messages.get({
          userId: 'me',
          id: message.id as string,
        });
        
        return parseEmail(email.data);
      })
    );

    return emails;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

// Parse Gmail message into a more usable format
const parseEmail = (message: any) => {
  const headers = message.payload.headers;
  
  // Extract email metadata from headers
  const subject = headers.find((header: any) => header.name === 'Subject')?.value || 'No Subject';
  const from = headers.find((header: any) => header.name === 'From')?.value || 'Unknown Sender';
  const to = headers.find((header: any) => header.name === 'To')?.value || 'Unknown Recipient';
  const date = headers.find((header: any) => header.name === 'Date')?.value || '';
  
  // Extract email body content
  let body = '';
  
  // Check if the message has parts (multipart email)
  if (message.payload.parts && message.payload.parts.length > 0) {
    // Try to find HTML or plain text part
    const textPart = message.payload.parts.find(
      (part: any) => part.mimeType === 'text/plain'
    );
    const htmlPart = message.payload.parts.find(
      (part: any) => part.mimeType === 'text/html'
    );
    
    // Prefer plain text over HTML for summarization
    const bodyData = textPart || htmlPart;
    
    if (bodyData && bodyData.body && bodyData.body.data) {
      body = Buffer.from(bodyData.body.data, 'base64').toString('utf-8');
    }
  } else if (message.payload.body && message.payload.body.data) {
    // Handle single part email
    body = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
  }
  
  return {
    id: message.id,
    threadId: message.threadId,
    labelIds: message.labelIds,
    snippet: message.snippet,
    subject,
    from,
    to,
    date,
    body,
    // Add a flag to track if this email has been summarized
    summarized: false,
  };
};

// Get a single email by ID
export const getEmailById = async (session: Session | null, emailId: string) => {
  try {
    const gmail = getGmailClient(session);
    
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: emailId,
    });
    
    return parseEmail(response.data);
  } catch (error) {
    console.error(`Error fetching email ${emailId}:`, error);
    throw error;
  }
};
