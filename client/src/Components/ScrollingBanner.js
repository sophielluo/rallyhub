import React, { useState, useEffect } from 'react';

const ScrollingBanner = ({ images, onImageChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % images.length;
        onImageChange(newIndex);
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images, onImageChange]);

  return (
    <div className="scrolling-banner">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Banner ${index + 1}`}
          className={`banner-image ${index === currentIndex ? 'active' : ''}`}
          style={{
            transform: `translateX(${(index - currentIndex) * 100}%)`,
          }}
        />
      ))}
    </div>
  );
};

export default ScrollingBanner;