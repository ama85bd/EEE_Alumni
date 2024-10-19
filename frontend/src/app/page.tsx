import NoticeBoard from '@/components/Notice';
import Carousel from '@/components/carousel';
import HomeComponent from '@/components/home/Home';

export default function Home() {
  return (
    <div className='flex-1 justify-between flex flex-col h-full w-full '>
      {/* <Carousel /> */}
      <HomeComponent />
      <NoticeBoard />
    </div>
  );
}
