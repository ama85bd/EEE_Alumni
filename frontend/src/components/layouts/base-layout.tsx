import Providers from '../providers/Providers';

import { default as Navbar } from './navbar';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>
        <Navbar />
        <div className='flex max-w-full px-8 content-center justify-center h-screen pt-10'>
          <main className='flex flex-col w-full w-lg gap-4'>
            <div className='w-full  border border-gray-300 rounded-lg shadow-lg bg-white p-8'>
              {children}
            </div>
          </main>
        </div>
      </Providers>
    </>
  );
};

export default BaseLayout;
