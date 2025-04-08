import React from "react";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import BannerCasourel from "../Banner/BannerCasourel";
import "bootstrap-icons/font/bootstrap-icons.css";
import SellingPoint from "../Banner/SellingPoint";
import ListFlashSale from "../Product/ListFlashSale";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-content">
        <div className="row r-1">
          <div className="category-sidebar col-3">
            <CategorySideBar />
          </div>
          <div className="carousels-banner col-9">
            <BannerCasourel />
          </div>
        </div>
        <div className="row r-2">
          <SellingPoint />
        </div>

        <div className="row r-3">
          <ListFlashSale />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
