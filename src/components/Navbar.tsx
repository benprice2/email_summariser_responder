import Link from 'next/link';
import Image from 'next/image';
import AuthButton from './AuthButton';

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
            className="text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:focus:ring-gray-800"
          >
            Dashboard
          </Link>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
