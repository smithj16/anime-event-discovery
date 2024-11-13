'use client';

import { useState, useEffect } from "react";

const images = [
  "/images/loginPageImages/anime.jpg",
  "/images/loginPageImages/anime2.jpg",
  "/images/loginPageImages/anime3.jpg",
  "/images/loginPageImages/anime5.jpg"
];

function BackgroundChanger({ children }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialImage = new Image();
      initialImage.src = images[currentImage];
      initialImage.onload = () => setIsImageLoaded(true);

      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          }).catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
        });
      }

      const intervalId = setInterval(() => {
        const nextImageIndex = (currentImage + 1) % images.length;
        preloadImage(images[nextImageIndex], () => {
          setCurrentImage(nextImageIndex);
        });
      }, 4000);

      return () => clearInterval(intervalId);
    }
  }, [currentImage]);

  const preloadImage = (src, callback) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
  };

  return (
    <div className={`background-changer flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8 ${isImageLoaded ? 'loaded' : 'loading'}`}>
      {children}
      <style jsx>{`
        .background-changer {
          background-image: url(${images[currentImage]});
          transition: background-image 1s ease-in-out, opacity 0.5s ease-in-out;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .background-changer.loading {
          opacity: 0;
        }
        .background-changer.loaded {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default BackgroundChanger;
