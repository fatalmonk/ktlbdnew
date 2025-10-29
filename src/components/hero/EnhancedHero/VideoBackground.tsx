import React, { useRef, useEffect, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  mobileSrc?: string;
  isMuted: boolean;
  isPaused: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  mobileSrc,
  isMuted,
  isPaused
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPaused) {
      video.pause();
    } else {
      video.play();
    }
  }, [isPaused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const videoSrc = isMobile && mobileSrc ? mobileSrc : src;

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      autoPlay
      loop
      playsInline
      muted={isMuted}
      className="absolute inset-0 w-full h-full object-cover"
    />
  );
};

export default VideoBackground;
