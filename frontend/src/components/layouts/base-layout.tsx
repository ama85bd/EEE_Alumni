import Providers from '../providers/Providers';

import { default as Navbar } from './navbar';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Providers>
        <Navbar />
        <div className='flex max-w-full  content-center justify-center h-screen pt-10'>
          <main className='flex flex-col w-full w-lg gap-4'>{children}</main>
        </div>
      </Providers>
    </>
  );
};

export default BaseLayout;
