import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  className?: string;
  poster?: string;
  src?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className, poster, src }) => {
  const [showImage, setShowImage] = useState(true);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
      setPlayerLoaded(true);
    }, 2000);
    
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={className}>
      {showImage && <img className='relative w-full h-full'  src={poster} alt="" />}
      {playerLoaded && (
        <ReactPlayer
          url={src}
          controls={false}
          width='100%'
          height='100%'
          playing
          loop
          muted
        />
      )}
    </div>
  );
};

export default VideoPlayer;