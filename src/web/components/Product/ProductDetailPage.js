import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.scss";
import useProductDetail from "../../../hook/useProductDetail";
import {
  getProductVersions,
  getProductColors,
  getProvinces,
  getDistricts,
  getBranchesWithStock,
} from "../../../api/productService";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState(""); // eslint-disable-line no-unused-vars
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  // const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [productVersions, setProductVersions] = useState([]);
  const [productColors, setProductColors] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [versionsLoading, setVersionsLoading] = useState(false);
  const [colorsLoading, setColorsLoading] = useState(false);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [branchesLoading, setBranchesLoading] = useState(false);
  const thumbnailsContainerRef = useRef(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullSpecifications, setShowFullSpecifications] = useState(false);

  const { product, isAddingToCart, handleAddToCart } = useProductDetail();

  console.log("product currently: ", product);
  const images = product.images || [];

  // Process description data
  const getDescriptionContent = () => {
    if (!product.description || !Array.isArray(product.description)) {
      return [];
    }

    return product.description.filter(
      (item) =>
        item && typeof item === "object" && item.content && item.content.trim()
    );
  };

  const getSpecifications = () => {
    return product.specifications || [];
  };

  // Get limited specifications content (first 5 items by default)
  const getLimitedSpecifications = () => {
    const fullSpecs = getSpecifications();
    return showFullSpecifications ? fullSpecs : fullSpecs.slice(0, 5);
  };

  // Check if specifications has more content than the limit
  const hasMoreSpecifications = () => {
    return getSpecifications().length > 5;
  };

  // Get limited description content (first 3 items by default)
  const getLimitedDescriptionContent = () => {
    const fullContent = getDescriptionContent();
    return showFullDescription ? fullContent : fullContent.slice(0, 3);
  };

  // Check if description has more content than the limit
  const hasMoreDescription = () => {
    return getDescriptionContent().length > 3;
  };

  // Load provinces on component mount
  useEffect(() => {
    loadProvinces();
  }, []);

  // Load product data when product changes
  useEffect(() => {
    if (product?.id) {
      loadProductVersions(product.id);
      loadProductColors(product.id);
      setSelectedVersion(product.version || "");
    }
  }, [product?.id, product?.version]);

  // Load districts when province changes
  useEffect(() => {
    if (selectedCity) {
      loadDistricts(selectedCity);
      setSelectedDistrict(""); // Reset district selection
      setAvailableBranches([]); // Reset branches
    } else {
      setDistricts([]);
      setSelectedDistrict("");
      setAvailableBranches([]);
    }
  }, [selectedCity]);

  // Load branches when district or color changes
  useEffect(() => {
    if (product?.id && selectedCity && selectedDistrict) {
      loadBranchesWithStock(product.id, {
        provinceId: selectedCity,
        districtId: selectedDistrict,
        color: selectedColor,
      });
    } else {
      setAvailableBranches([]);
    }
  }, [product?.id, selectedCity, selectedDistrict, selectedColor]);

  const loadProvinces = async () => {
    try {
      setProvincesLoading(true);
      const provincesData = await getProvinces();
      setProvinces(provincesData);
    } catch (error) {
      console.error("Error loading provinces:", error);
    } finally {
      setProvincesLoading(false);
    }
  };

  const loadDistricts = async (provinceId) => {
    try {
      setDistrictsLoading(true);
      const districtsData = await getDistricts(provinceId);
      setDistricts(districtsData);
    } catch (error) {
      console.error("Error loading districts:", error);
      setDistricts([]);
    } finally {
      setDistrictsLoading(false);
    }
  };

  const loadBranchesWithStock = async (productId, options = {}) => {
    try {
      setBranchesLoading(true);
      const branchesData = await getBranchesWithStock(productId, options);
      setAvailableBranches(branchesData.branches || []);
    } catch (error) {
      console.error("Error loading branches with stock:", error);
      setAvailableBranches([]);
    } finally {
      setBranchesLoading(false);
    }
  };
  useEffect(() => {
    if (product?.id) {
      loadProductVersions(product.id);
      loadProductColors(product.id);
      setSelectedVersion(product.version || "");
    }
  }, [product?.id, product?.version]);

  const loadProductVersions = async (currentProductId) => {
    try {
      setVersionsLoading(true);
      const versionsData = await getProductVersions(currentProductId);
      setProductVersions(versionsData.versions || []);
    } catch (error) {
      console.error("Error loading product versions:", error);
    } finally {
      setVersionsLoading(false);
    }
  };

  const handleVersionChange = (versionProduct) => {
    navigate(`/product/${versionProduct.id}`);
  };

  // Load product colors when product changes
  const loadProductColors = async (currentProductId) => {
    try {
      setColorsLoading(true);
      const colorsData = await getProductColors(currentProductId);
      setProductColors(colorsData.colors || []);

      // If there are colors, select the first one by default
      if (colorsData.colors && colorsData.colors.length > 0) {
        setSelectedColor(colorsData.colors[0]);
      }
    } catch (error) {
      console.error("Error loading product colors:", error);
      // If colors API fails, show default "single color" message
      setProductColors([]);
    } finally {
      setColorsLoading(false);
    }
  };

  // Handle color selection change
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  useEffect(() => {
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

  if (loading) return <div className="loading">Đang tải sản phẩm...</div>;
  if (error)
    return <div className="error">Error loading product: {error.message}</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-detail-header">
          <h1>{product.name}</h1>
          {product.product_group && (
            <p className="product-group">
              Dòng sản phẩm: {product.product_group}
            </p>
          )}
        </div>

        <div className="product-detail-content">
          <div className="product-detail-left">
            {/* Image Slider */}
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

            {/* Product Description Section - Only keep description on left */}
            <div className="product-description-section">
              <h3>Thông tin sản phẩm</h3>
              <div className="description-content">
                {getLimitedDescriptionContent().length > 0 ? (
                  <>
                    {getLimitedDescriptionContent().map((item, index) => {
                      if (item.type === "title") {
                        return (
                          <h4 key={index} className="description-title">
                            {item.content}
                          </h4>
                        );
                      } else if (item.type === "text") {
                        return (
                          <p key={index} className="description-text">
                            {item.content}
                          </p>
                        );
                      }
                      return null;
                    })}

                    {hasMoreDescription() && (
                      <div className="description-toggle">
                        <button
                          className="toggle-button"
                          onClick={() =>
                            setShowFullDescription(!showFullDescription)
                          }
                        >
                          <span>
                            {showFullDescription ? "Ẩn bớt" : "Hiển thị thêm"}
                          </span>
                          <i
                            className={`fas ${
                              showFullDescription
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="no-description">
                    Chưa có mô tả chi tiết cho sản phẩm này.
                  </p>
                )}
              </div>
            </div>

            {/* Box Contents */}
            <div className="box-contents-section">
              <h3>Trong hộp có gì ?</h3>
              <ul className="box-contents-list">
                {Array.isArray(product?.box_content?.box_content) &&
                  product.box_content.box_content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
              </ul>
            </div>

            {/* Store Availability */}
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
                    disabled={provincesLoading}
                  >
                    <option value="">
                      {provincesLoading ? "Đang tải..." : "Chọn tỉnh/thành phố"}
                    </option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="selector-group">
                  <label>Chọn quận/huyện</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    disabled={!selectedCity || districtsLoading}
                  >
                    <option value="">
                      {districtsLoading ? "Đang tải..." : "Chọn quận/huyện"}
                    </option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {branchesLoading && (
                <div className="loading-branches">
                  <i className="fas fa-spinner fa-spin"></i> Đang tải thông tin
                  cửa hàng...
                </div>
              )}

              {selectedCity &&
                selectedDistrict &&
                availableBranches.length > 0 && (
                  <div className="available-stores">
                    <h4>
                      Cửa hàng có sẵn ({availableBranches.length} chi nhánh)
                    </h4>
                    <ul className="stores-list">
                      {availableBranches.map((branch, index) => {
                        // Find the stock for the selected color
                        const selectedColorStock =
                          selectedColor && branch.available_colors
                            ? branch.available_colors.find(
                                (colorStock) =>
                                  colorStock.color === selectedColor
                              )
                            : null;

                        return (
                          <li key={branch.id || index}>
                            <div className="store-info">
                              <span className="store-name">{branch.name}</span>
                              <span className="store-address">
                                {branch.address}, {branch.ward_name},{" "}
                                {branch.district_name}, {branch.province_name}
                              </span>
                              {branch.phone && (
                                <span className="store-phone">
                                  <i className="fas fa-phone"></i>{" "}
                                  {branch.phone}
                                </span>
                              )}
                              <span className="store-stock">
                                <i className="fas fa-box"></i>{" "}
                                {branch.total_stock} sản phẩm có sẵn
                                {selectedColorStock && (
                                  <span className="color-stock">
                                    ({selectedColorStock.total_quantity} màu{" "}
                                    {selectedColor})
                                  </span>
                                )}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

              {selectedCity &&
                selectedDistrict &&
                !branchesLoading &&
                availableBranches.length === 0 && (
                  <div className="no-branches">
                    <i className="fas fa-info-circle"></i>
                    Không có cửa hàng nào có sẵn sản phẩm này trong khu vực đã
                    chọn.
                  </div>
                )}
            </div>
          </div>

          <div className="product-options-container">
            {/* Product Info */}
            <div className="product-info">
              <div className="product-price">
                <span className="current-price">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.original_price)}
                </span>
              </div>
            </div>

            {/* Product Options */}
            <div className="product-options">
              {(productVersions.length > 0 || product.version) && (
                <div className="option-group">
                  <h4>Chọn phiên bản</h4>
                  {versionsLoading ? (
                    <div className="loading-versions">
                      Đang tải phiên bản...
                    </div>
                  ) : (
                    <div className="option-list">
                      <button
                        className="option-item selected current-version"
                        disabled
                      >
                        {product.version || "Phiên bản hiện tại"}
                        <span className="current-label">(Hiện tại)</span>
                      </button>

                      {productVersions.map((versionProduct) => (
                        <button
                          key={versionProduct.id}
                          className="option-item version-option"
                          onClick={() => handleVersionChange(versionProduct)}
                          title={`Chuyển đến ${versionProduct.name}`}
                        >
                          <div className="version-info">
                            <span className="version-name">
                              {versionProduct.version}
                            </span>
                            <span className="version-price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(versionProduct.original_price)}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="option-group">
                <h4>Chọn màu sắc</h4>
                <div className="option-list">
                  {colorsLoading ? (
                    <div className="loading-colors">Đang tải màu sắc...</div>
                  ) : productColors.length > 0 ? (
                    productColors.map((color, index) => (
                      <button
                        key={index}
                        className={`option-item color-option ${
                          selectedColor === color ? "selected" : ""
                        }`}
                        onClick={() => handleColorChange(color)}
                        title={`Chọn màu ${color}`}
                      >
                        {color}
                        {selectedColor === color && (
                          <i className="fas fa-check"></i>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="no-options">Chỉ có một màu sắc</div>
                  )}
                </div>
              </div>
            </div>

            {/* Purchase Buttons */}
            <div className="purchase-buttons">
              <button className="btn-buy-now">Mua ngay</button>
              <button
                className={`btn-add-to-cart ${isAddingToCart ? "adding" : ""}`}
                onClick={() => handleAddToCart(product.id, 1)}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>
            </div>

            {/* Special Offers */}
            <div className="special-offers-section">
              <h3>Ưu đãi đặc biệt</h3>
              <ul className="special-offers-list">
                <li>Miễn phí giao hàng toàn quốc</li>
                <li>Bảo hành chính hãng 12 tháng</li>
                <li>Hỗ trợ đổi trả trong 7 ngày</li>
              </ul>
            </div>

            {/* Product Specifications Section - With toggle functionality */}
            <div className="product-specifications-section">
              <h3>Thông số kỹ thuật</h3>
              <div className="specifications-content">
                {getLimitedSpecifications().length > 0 ? (
                  <>
                    <table className="specifications-table-alt">
                      <tbody>
                        {getLimitedSpecifications().map((spec, index) => (
                          <tr key={spec.id || index}>
                            <td>{spec.key}</td>
                            <td>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Show More/Less Button for Specifications */}
                    {hasMoreSpecifications() && (
                      <div className="specifications-toggle">
                        <button
                          className="toggle-button"
                          onClick={() =>
                            setShowFullSpecifications(!showFullSpecifications)
                          }
                        >
                          <span>
                            {showFullSpecifications
                              ? "Ẩn bớt"
                              : "Hiển thị thêm"}
                          </span>
                          <i
                            className={`fas ${
                              showFullSpecifications
                                ? "fa-chevron-up"
                                : "fa-chevron-down"
                            }`}
                          ></i>
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="no-specifications">
                    Chưa có thông số kỹ thuật cho sản phẩm này.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
