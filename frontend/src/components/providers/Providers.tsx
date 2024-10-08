'use client';

import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <Toaster position='top-center' reverseOrder={false} />
        {children}
      </SessionProvider>
    </>
  );
};

export default Providers;
