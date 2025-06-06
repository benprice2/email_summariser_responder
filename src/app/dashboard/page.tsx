"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import AuthButton from "../../components/AuthButton";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
            <p className="mb-4">Please sign in with your Google account to access the dashboard.</p>
            <div className="flex justify-center">
              <AuthButton />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <AuthButton />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, {session.user?.name}!</h2>
          <p className="mb-4">
            You are signed in with {session.user?.email}. You can now access and summarize your Gmail emails.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Recent Emails</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your emails will appear here once we implement the Gmail API integration.
            </p>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Email Stats</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Email statistics will be displayed here in the next phase.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
