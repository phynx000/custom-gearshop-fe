import React, { useEffect, useState } from "react";
import CategorySideBar from "./CategorySideBar";
import "./SidebarWrapper.scss"; // bạn tạo CSS riêng để style

const SidebarWrapper = ({ show, onClose }) => {
  const [shouldRender, setShouldRender] = useState(show);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => setAnimationClass("show"), 10); // nhỏ delay để kích hoạt CSS transition
    } else {
      setAnimationClass(""); // remove class để trượt ra
      setTimeout(() => setShouldRender(false), 300); // chờ animation xong rồi unmount
    }
  }, [show]);

  if (!shouldRender) return null;

  return (
    <div className="sidebar-overlay left-category-sidebar" onClick={onClose}>
      <div
        className={`sidebar ${animationClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="btn btn-close" onClick={onClose}></button>
        <div onClick={onClose} className="sidebar-content">
          <CategorySideBar />
        </div>
      </div>
    </div>
  );
};
export default SidebarWrapper;
