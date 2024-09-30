'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from '../css/Dropdown.module.css';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Image from 'next/image';
// import logo from '../public/logo.png'; // Adjust the path to your logo file

const Navbar = () => {
  const { data: session, status }: any = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [nestedOpen, setNestedOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleNestedDropdown = () => setNestedOpen((prev) => !prev);

  return (
    <>
      <nav className='bg-green-600 dark:bg-gray-700'>
        <div className='flex flex-wrap items-center justify-between p-4 px-10'>
          <div className='flex items-center'>
            <Link
              href='/'
              style={{
                overflow: 'hidden',
                top: 0,
                position: 'absolute',
                marginRight: '3rem',
              }}
            >
              <Image
                src='/logo.png' // Path to your logo
                alt='Company Logo' // Alt text for accessibility
                width={100} // Set width
                height={30} // Set height
                priority // Optional: prioritize loading this image
              />
            </Link>
            <ul
              style={{ marginLeft: '8rem' }}
              className='flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium'
            >
              <li>
                <Link
                  href='/'
                  className='text-white dark:text-white hover:underline'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/notice'
                  className='text-white dark:text-white hover:underline'
                  aria-current='page'
                >
                  Notice
                </Link>
              </li>
              {session?.userType[0].admin && (
                <li>
                  <div
                    className={styles.dropdown}
                    onMouseLeave={() => setIsOpen(false)}
                  >
                    <button
                      onMouseEnter={toggleDropdown}
                      className={
                        'text-white dark:text-white ' + styles.dropdownButton
                      }
                    >
                      Admin
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
                            User
                            <IoIosArrowForward className='mt-1 ml-3' />
                          </div>
                          {nestedOpen && (
                            <div className={styles.nestedDropdown}>
                              <div className={styles.nestedItem}>
                                <Link
                                  href='/admin/user/request'
                                  className='text-gray-900 dark:text-gray-900 hover:underline'
                                  aria-current='page'
                                >
                                  Request
                                </Link>
                              </div>
                              <div className={styles.nestedItem}>
                                <Link
                                  href='/admin/user/active'
                                  className='text-gray-900 dark:text-gray-900 hover:underline'
                                  aria-current='page'
                                >
                                  Active
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={styles.dropdownItem}>Another Item</div>
                      </div>
                    )}
                  </div>
                </li>
              )}
              {/* {session?.userType[0].admin && (
              <li>
                <Link
                  href='/admin'
                  className='text-white dark:text-white hover:underline'
                  aria-current='page'
                >
                  Admin
                </Link>
              </li>
               )}  */}
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
                      className='text-white dark:text-white hover:underline'
                      aria-current='page'
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/login'
                      className='text-white dark:text-white hover:underline'
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
