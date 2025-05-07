import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.scss";
import useProductDetail from "../../hook/useProductDetail";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState("8GB / 256GB");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const thumbnailsContainerRef = useRef(null);

  const { product } = useProductDetail();

  // console.log("product currently: ", product);
  const images = product.images || [];
  // console.log("images: ", images);

  const stores = [
    {
      city: "Ho Chi Minh",
      district: "District 1",
      name: "Central Store",
      stock: 5,
    },
    {
      city: "Ho Chi Minh",
      district: "District 3",
      name: "Tech Store",
      stock: 3,
    },
    { city: "Ha Noi", district: "Cau Giay", name: "Hanoi Center", stock: 8 },
    { city: "Ha Noi", district: "Dong Da", name: "Flagship Store", stock: 4 },
  ];

  const cities = [...new Set(stores.map((store) => store.city))];
  const districts = selectedCity
    ? [
        ...new Set(
          stores
            .filter((store) => store.city === selectedCity)
            .map((store) => store.district)
        ),
      ]
    : [];
  const availableStores = stores.filter(
    (store) =>
      store.city === selectedCity && store.district === selectedDistrict
  );

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [productId]);

  const scrollThumbnails = (direction) => {
    if (thumbnailsContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleImageNavigation = (direction) => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error)
    return <div className="error">Error loading product: {error.message}</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <h1>{product.name}</h1>
        </div>

        <div className="product-detail-content">
          <div className="product-detail-left">
            <div className="product-detail-slider">
              <div className="product-detail-images">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image}
                    alt={`${product.name} - View ${index + 1}`}
                    className={`product-image ${
                      currentImageIndex === index ? "active" : ""
                    }`}
                  />
                ))}
                <div className="slider-controls">
                  <button onClick={() => handleImageNavigation("prev")}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button onClick={() => handleImageNavigation("next")}>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>

              <div className="thumbnails-wrapper">
                <button
                  className="thumbnail-scroll-btn"
                  onClick={() => scrollThumbnails("left")}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div
                  className="thumbnails-container"
                  ref={thumbnailsContainerRef}
                >
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        currentImageIndex === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img src={image.image} alt={`Thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button
                  className="thumbnail-scroll-btn"
                  onClick={() => scrollThumbnails("right")}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>

            <div className="box-contents-section">
              <h3>Trong hộp có gì ?</h3>
              <ul className="box-contents-list">
                {product.box_content.box_content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="store-availability-section">
              <h3>Cửa hàng còn hàng</h3>
              <div className="store-selectors">
                <div className="selector-group">
                  <label>Chọn tỉnh thành</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setSelectedDistrict("");
                    }}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="selector-group">
                  <label>Chọn quận/huyện</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedCity}
                  >
                    <option value="">Select a district</option>
                    {districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedCity && selectedDistrict && (
                <div className="available-stores">
                  <h4>Available Stores</h4>
                  <ul className="stores-list">
                    {availableStores.map((store, index) => (
                      <li key={index}>
                        <span className="store-name">{store.name}</span>
                        <span className="store-stock">
                          {store.stock} units available
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="product-options-container">
            <div className="product-info">
              <div className="product-price">
                <span className="current-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.original_price)}
                </span>
                {/* hiển thị giá giảm ở đây */}
                {/* {product.original_price && (
                  <span className="original-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.originalPrice)}
                  </span>
                )} */}
              </div>
            </div>

            <div className="product-options">
              <div className="option-group">
                <h4>Select Version</h4>
                <div className="option-list">
                  {/* {product.versions.map((version, index) => (
                    <button
                      key={index}
                      className={`option-item ${
                        selectedVersion === version ? "selected" : ""
                      }`}
                      onClick={() => setSelectedVersion(version)}
                    >
                      {version}
                    </button>
                  ))} */}
                </div>
              </div>

              <div className="option-group">
                <h4>Select Color</h4>
                <div className="option-list">
                  {/* {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`option-item ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))} */}
                </div>
              </div>
            </div>

            <div className="purchase-buttons">
              <button className="btn-buy-now">Buy Now</button>
              <button className="btn-add-to-cart">Add to Cart</button>
            </div>

            <div className="special-offers-section">
              <h3>Special Offers</h3>
              <ul className="special-offers-list">
                {/* {product.specialOffers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
