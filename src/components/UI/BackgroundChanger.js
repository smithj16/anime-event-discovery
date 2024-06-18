'use client';

import { useState, useEffect } from "react";

const images = [
  "/images/loginPageImages/anime.jpg",
  "/images/loginPageImages/anime2.jpg",
  "/images/loginPageImages/anime3.jpg",
  "/images/loginPageImages/fatestaynight.jpg"
];

function preloadImages(srcs) {
  srcs.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function BackgroundChanger({ children }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    preloadImages(images);

    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="background-changer flex min-h-screen flex-1 flex-col justify-center px-6 lg:px-8">
      {children}
      <style jsx>{`
        .background-changer {
          background-image: url(${images[currentImage]});
          transition: background-image 1s ease-in-out;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>
    </div>
  );
}

export default BackgroundChanger;
