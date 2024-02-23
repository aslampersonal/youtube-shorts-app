import React, { useEffect, useState } from 'react';
import './Video.css';
import { FaPlay, FaPause, FaHeart, FaDownload  } from 'react-icons/fa';

const Video = ({ src, title, isPlaying, togglePlay, toggleLike, toggleDownload, videoRef, likedVideos, currentVideoIndex }) => {

  const [progress, setProgress] = useState(0);
    
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        videoElement.pause();
      } else {
        if (isPlaying) {
          videoElement.play();
        }
      }
    };

    const handleProgress = () => {
        const progress = (videoElement.currentTime / videoElement.duration) * 100;
        setProgress(progress);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    videoElement.addEventListener('timeupdate', handleProgress);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      videoElement.removeEventListener('timeupdate', handleProgress);
    };
  }, [isPlaying, videoRef]);

  return (
    <div className="VideoContainer">
      <video
        src={src}
        autoPlay
        muted
        loop
        onClick={togglePlay}
        ref={videoRef}
      ></video>
      <button className="PlayPauseButton" onClick={togglePlay}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div
        className="VideoList-like-button"
        onClick={toggleLike}
      >
        <FaHeart color={likedVideos[currentVideoIndex] ? 'red' : 'white'} />
      </div>
      <div
        className="VideoList-download-button"
        onClick={toggleDownload}
      >
        <FaDownload color="white" />
      </div>
      <div className="VideoDetails">
        <h3>{title}</h3>
      </div>
      <div className="ProgressIndicator">
        <div className="ProgressBar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default Video;
