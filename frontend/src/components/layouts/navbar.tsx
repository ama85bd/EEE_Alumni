'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from '../css/Dropdown.module.css';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const Navbar = () => {
  const { data: session, status }: any = useSession();
  console.log('session navbar', session);
  console.log('session status', status);
  console.log(
    'session session?.userType[0].isAdmin ',
    session?.userType[0].admin
  );

  const [isOpen, setIsOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleNestedDropdown = () => setNestedOpen((prev) => !prev);

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
                <div
                  className={styles.dropdown}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <button
                    onMouseEnter={toggleDropdown}
                    className={styles.dropdownButton}
                  >
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
                  {isOpen && (
                    <div className={styles.dropdownContent}>
                      <div
                        className={styles.dropdownItem}
                        onMouseEnter={toggleNestedDropdown}
                        onMouseLeave={() => setNestedOpen(false)}
                      >
                        <div style={{ display: 'flex' }}>
                          Parent Item{' '}
                          <IoIosArrowForward className='mt-1 ml-3' />
                        </div>
                        {nestedOpen && (
                          <div className={styles.nestedDropdown}>
                            <div className={styles.nestedItem}>
                              Nested Item 1
                            </div>
                            <div className={styles.nestedItem}>
                              Nested Item 2
                            </div>
                          </div>
                        )}
                      </div>
                      <div className={styles.dropdownItem}>Another Item</div>
                    </div>
                  )}
                </div>
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
