import React, { useEffect, useState } from "react";

import home_slider_1 from "../../assets/images/home_slider_1.webp";
import home_slider_2 from "../../assets/images/home_slider_2.jpg";
import home_slider_3 from "../../assets/images/home_slider_3.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [home_slider_1, home_slider_2, home_slider_3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // Chuyển ảnh sau 3 giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, [images.length]);

  return (
    <div className="casourel">
      <div className="casourel-images">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            className={`carousel-image ${
              currentIndex === index ? "active" : ""
            }`}
            alt={`carousel-${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
