# Gmail Summarizer

A full-stack application built with Next.js 14 that allows users to log in with Google, fetch their latest Gmail emails, summarize them using OpenAI, and generate suggested replies.

## Features

- Google OAuth authentication
- Gmail API integration
- Email summarization with OpenAI
- Suggested reply generation
- Responsive UI with TailwindCSS
- Dark mode support

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS
- **Authentication**: NextAuth.js
- **API Integration**: Gmail API, OpenAI API
- **Styling**: TailwindCSS

## Project Structure

```
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router pages
│   │   ├── dashboard/ # Dashboard page
│   │   ├── api/       # API routes (will be added)
│   │   └── ...        # Other pages
│   ├── components/    # React components
│   ├── lib/           # Utility functions and API clients
│   └── styles/        # Global styles
├── .env.local         # Environment variables (to be created)
└── ...                # Config files
```

## Development Stages

### Stage 1: Project Setup 
- Scaffolded Next.js project with App Router and TypeScript
- Configured TailwindCSS
- Set up basic folder structure
- Created Navbar and Layout components
- Added placeholder homepage and dashboard

### Stage 2: Google OAuth Integration (Next)
- Install and configure NextAuth.js
- Set up environment variables
- Create AuthButton component
- Protect dashboard route

### Upcoming Stages
- Gmail API Integration
- Email UI Components
- OpenAI API Integration
- Suggested Reply Generator
- UI Polish & Refactor
- Deployment Preparation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables (to be filled in):
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser

## License

MIT
