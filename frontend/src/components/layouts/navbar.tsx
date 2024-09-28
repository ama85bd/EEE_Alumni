'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status }: any = useSession();
  console.log('session navbar', session);
  console.log('session status', status);
  console.log(
    'session session?.userType[0].isAdmin ',
    session?.userType[0].admin
  );
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
              {session?.userType[0].admin && (
                <li>
                  <Link
                    href='/adminDashboard'
                    className='text-gray-900 dark:text-white hover:underline'
                    aria-current='page'
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li className='relative '>
                <div className='relative group'>
                  {/* Parent Dropdown Button */}
                  <button className='flex items-center justify-between w-full rounded-md bg-gray-800 text-white px-4 py-2 focus:outline-none'>
                    Menu
                    <svg
                      className='ml-2 h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>

                  {/* Parent Dropdown Menu */}
                  <div className='absolute left-0 z-10 hidden mt-0 w-48 bg-white rounded-md shadow-lg group-hover:block'>
                    <div
                      className='py-1'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='options-menu'
                    >
                      <div className='relative group'>
                        {/* First Option with Nested Dropdown */}
                        <div className='relative group'>
                          <a
                            href='#'
                            className='flex justify-between items-center block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                            role='menuitem'
                          >
                            Option 1
                            <svg
                              className='h-4 w-4 ml-2'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M10.293 15.293a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4a1 1 0 00-1.414 1.414L13.586 10H3a1 1 0 100 2h10.586l-3.293 3.293a1 1 0 000 1.414z'
                                clipRule='evenodd'
                              />
                            </svg>
                          </a>

                          {/* Nested Dropdown */}
                          <div className='absolute left-full top-0 hidden w-48 mt-1 bg-white rounded-md shadow-lg group-hover:block'>
                            <div
                              className='py-1'
                              role='menu'
                              aria-orientation='vertical'
                            >
                              <a
                                href='#'
                                className='flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                role='menuitem'
                              >
                                Nested Option 1
                              </a>
                              <a
                                href='#'
                                className='flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                role='menuitem'
                              >
                                Nested Option 2
                              </a>
                            </div>
                          </div>
                        </div>

                        <a
                          href='#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                        >
                          Option 2
                        </a>
                        <a
                          href='#'
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                          role='menuitem'
                        >
                          Option 3
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className='flex items-center'>
            <ul className='flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium'>
              {status === 'authenticated' ? (
                <li>
                  <button
                    onClick={() => signOut()}
                    className='text-gray-800 bg-gray-200 font-medium rounded-lg text-sm px-3 py-1 text-center inline-flex items-center'
                    type='button'
                  >
                    {' '}
                    {session.user?.name} - Logout
                  </button>
                </li>
              ) : (
                <>
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
                      href='/login'
                      className='text-gray-900 dark:text-white hover:underline'
                      aria-current='page'
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
