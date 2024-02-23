import React, { useState, useRef } from 'react';
import Video from './Video';
import videosData from '../data/videosData';
import { MdKeyboardArrowUp, MdKeyboardArrowDown  } from "react-icons/md";

const VideoList = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedVideos, setLikedVideos] = useState(Array(videosData.length).fill(false));
  const videoRef = useRef(null);
  const touchStartY = useRef(0);

  const handleSwipeStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleSwipeEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (deltaY > 50 && currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    } else if (deltaY < -50 && currentVideoIndex < videosData.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleSwipeCancel = () => {
    touchStartY.current = 0;
  };

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
    const videoUrl = videosData[currentVideoIndex].src;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = `${videosData[currentVideoIndex].title}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="VideoList"
      onTouchStart={handleSwipeStart}
      onTouchEnd={handleSwipeEnd}
      onTouchCancel={handleSwipeCancel}
      >
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
