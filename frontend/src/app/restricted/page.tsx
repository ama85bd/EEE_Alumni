'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const Restricted = () => {
  const router = useRouter();
  const params: any = useSearchParams();
  const message = params.get('message');
  const helpUrl = params.get('helpUrl');

  useEffect(() => {
    if (!message) {
      // Redirect if message is not available
      router.push('/'); // or any default page
    }
  }, [message, router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h1 className='text-xl font-bold'>{message || 'Access Denied'}</h1>
      <a href={helpUrl || '/'} className='mt-4 text-blue-500 underline'>
        Go Home
      </a>
    </div>
  );
};

export default Restricted;
