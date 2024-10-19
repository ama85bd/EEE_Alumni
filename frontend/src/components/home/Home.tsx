'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import AnimatedSentence from '../AnimatedSentence';

interface HomeProps {}

const HomeComponent: FC<HomeProps> = ({}) => {
  const { data: session, status }: any = useSession();
  const [galleries, setGalleries] = useState<any[]>([]);

  const headersData = {
    'Content-Type': 'application/json', // Modify as needed
  };

  async function getAllGallery() {
    try {
      await axios
        .get(`http://localhost:1337/api/gallery`, {
          headers: headersData,
        })
        .then((r) => {
          setGalleries(r.data);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllGallery();
  }, [session?.accessToken]);

  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === galleries.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(galleries.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);

  return (
    <main className='grid place-items-center  w-full  mx-auto shadow-2xl rounded-2xl'>
      <div
        className={`flex justify-center w-full items-center gap-4 transition-transform ease-in-out duration-500 md:rounded-2xl p-6 md:p-0`}
      >
        {galleries.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? 'block h-[80vh] w-full object-cover transition-all duration-500 ease-in-out '
                : 'hidden'
            }`}
          >
            <Image
              src={elem.image}
              alt=''
              width={800}
              height={400}
              className='w-full h-full object-cover md:rounded-3xl block bg-gray-800 opacity-90'
            />
            <div className='absolute xl:bottom-0 2xl:bottom-14 md:rounded-b-3xl bg-black bg-opacity-40 xl:inset-x-[5.1%] 2xl:inset-x-[3.4%] py-2 text-center text-5xl font-bold text-yellow-200 animate-none md:block opacity-100'>
              <AnimatedSentence text={elem?.title} />
            </div>
          </div>
        ))}
      </div>
      <div className='absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center'>
        <div
          className='absolute bottom-60 left-10 cursor-pointer '
          onClick={clickPrev}
        >
          <IoIosArrowBack className=' text-2xl font-bold' />
        </div>

        <div
          className='absolute bottom-60 right-10 cursor-pointer'
          onClick={clickNext}
        >
          <IoIosArrowForward className=' text-2xl font-bold' />
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
