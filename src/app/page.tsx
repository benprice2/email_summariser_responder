import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <div>
            <Image
              src="/logo.svg"
              alt="Gmail Summarizer Logo"
              width={120}
              height={120}
              className="mx-auto"
            />
            <h1 className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
              Gmail Summarizer
            </h1>
            <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">
              Summarize your emails and generate smart replies with AI
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="card">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">Connect Gmail</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                  Securely connect your Gmail account with Google OAuth
                </p>
              </div>
              
              <div className="card">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">AI Summaries</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                  Get concise summaries of your emails using OpenAI
                </p>
              </div>
              
              <div className="card">
                <div className="flex justify-center items-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white text-center">Smart Replies</h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-400 text-center">
                  Generate contextual replies to save you time
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <Link 
              href="/dashboard" 
              className="btn-primary inline-flex items-center px-6 py-3 text-lg"
            >
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
