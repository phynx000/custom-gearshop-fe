import React, { useState } from "react";
import "./ProductDetailPage.scss";

const ProductOptions = ({ versions = [], colors = [] }) => {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="">
      <div className="option-group">
        <h4>Chọn phiên bản:</h4>
        <div className="option-list">
          {versions.map((version, index) => (
            <button
              key={index}
              className={`option-item ${
                selectedVersion === version ? "selected" : ""
              }`}
              onClick={() => setSelectedVersion(version)}
            >
              {version}
            </button>
          ))}
        </div>
      </div>

      <div className="option-group">
        <h4>Chọn màu sắc:</h4>
        <div className="option-list">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`option-item color-option ${
                selectedColor === color ? "selected" : ""
              }`}
              // style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductOptions;
