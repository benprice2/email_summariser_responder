import Layout from "../../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Email Dashboard
          </h1>
          
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
            <div className="border-4 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-8 text-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="mx-auto h-12 w-12 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No emails loaded</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sign in with Google to fetch your emails
              </p>
              <div className="mt-6">
                <button
                  type="button"
                  className="btn-primary"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
