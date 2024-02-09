import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);
  
  return (
    <div className='h-screen w-screen bg-black'>
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft onClick={() => router.push(`/`)} className='text-white' size={40}/>
        
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">
            Đang xem: 
          </span> 
          {data?.title}
        </p>
      </nav>
      <video 
        src={data?.videoUrl}
        autoPlay
        controls
        className='h-full w-full'
      >

      </video>
    </div>
  );
}

export default Watch;