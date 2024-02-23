import React, { useState, useRef } from 'react';
import Video from './Video';
import videosData from '../data/videosData';
import { MdKeyboardArrowUp, MdKeyboardArrowDown  } from "react-icons/md";

const VideoList = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedVideos, setLikedVideos] = useState(Array(videosData.length).fill(false));
  const videoRef = useRef(null);

  const handleSwipe = (direction) => {
    if (direction === 'up' && currentVideoIndex < videosData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else if (direction === 'down' && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    const updatedLikedVideos = [...likedVideos];
    updatedLikedVideos[currentVideoIndex] = !updatedLikedVideos[currentVideoIndex];
    setLikedVideos(updatedLikedVideos);
  };

  const toggleDownload = () => {
    // Implement download logic here
    const videoElement = videoRef.current;
    const videoUrl = videosData[currentVideoIndex].src;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `${videosData[currentVideoIndex].title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="VideoList">
      <div
        className="VideoList-swipe-up"
        onClick={() => handleSwipe('down')}
        style={currentVideoIndex===0?{display:"none"}:{}}
      >
        <MdKeyboardArrowUp className='arrow-btns' />
      </div>
      <Video
        src={videosData[currentVideoIndex].src}
        title={videosData[currentVideoIndex].title}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        toggleLike={toggleLike}
        toggleDownload={toggleDownload}
        videoRef={videoRef}
        likedVideos={likedVideos}
        currentVideoIndex={currentVideoIndex}
      />
      <div
        className="VideoList-swipe-down"
        onClick={() => handleSwipe('up')}
        style={currentVideoIndex===videosData.length-1?{display:"none"}:{}}
      >
        <MdKeyboardArrowDown className='arrow-btns' />
      </div>
    </div>
  );
};

export default VideoList;
