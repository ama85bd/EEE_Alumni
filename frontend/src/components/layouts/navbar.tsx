'use client';
import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav className='bg-gray-50 dark:bg-gray-700'>
        <div className='flex flex-wrap items-center justify-between p-4'>
          <div className='flex items-center'>
            <ul className='flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium'>
              <li>
                <Link
                  href='/'
                  className='text-gray-900 dark:text-white hover:underline'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/notice'
                  className='text-gray-900 dark:text-white hover:underline'
                  aria-current='page'
                >
                  Notice
                </Link>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-900 dark:text-white hover:underline'
                >
                  Menu2
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='text-gray-900 dark:text-white hover:underline'
                >
                  Menu3
                </a>
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            <ul className='flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium'>
              <li>
                <Link
                  href='/register'
                  className='text-gray-900 dark:text-white hover:underline'
                  aria-current='page'
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href='/notice'
                  className='text-gray-900 dark:text-white hover:underline'
                  aria-current='page'
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
