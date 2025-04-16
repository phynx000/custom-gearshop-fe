import React, { useState, useEffect } from "react";
import "./ProductDetailPage.scss";
import home_slider_1 from "../../assets/images/lap-asus101.webp";
import home_slider_2 from "../../assets/images/lap-asus101.webp";
import home_slider_3 from "../../assets/images/lap-asus101.webp";

const ProductDetailPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [home_slider_1, home_slider_2, home_slider_3];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <h2>Product Detail</h2>
        </div>
        <div className="product-detail-content">
          <div className="product-detail-slider col-md-6">
            <div className="product-detail-images">
              <div className="slider-controls">
                <button onClick={goToPrevious}>←</button>
                <button onClick={goToNext}>→</button>
              </div>
              {images.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  className={`product-image ${
                    currentIndex === index ? "active" : ""
                  }`}
                  alt={`carousel-${index + 1}`}
                />
              ))}
            </div>
          </div>

          <p>Product details will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
