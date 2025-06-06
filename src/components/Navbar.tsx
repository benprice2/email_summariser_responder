import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.svg" 
            alt="Gmail Summarizer Logo" 
            width={32} 
            height={32}
            className="mr-3"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Gmail Summarizer
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <Link 
            href="/dashboard" 
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}
