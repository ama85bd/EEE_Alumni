import { FC } from 'react';
import Image from 'next/image';

interface pageProps {}

const UnderConstruction: FC<pageProps> = ({}) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold text-gray-800 mb-4'>
        🚧 Under Construction 🚧
      </h1>
      <p className='text-lg text-gray-600 mb-6'>
        We are currently working hard on our website. Please check back later!
      </p>
      <Image
        src='/under-construction.png'
        width={200}
        height={200}
        alt='Under Construction'
      />
      <a
        href='/'
        className='mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200'
      >
        Go Back Home
      </a>
    </div>
  );
};

export default UnderConstruction;
