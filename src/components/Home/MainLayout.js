import React from "react";
import { Outlet } from "react-router-dom";
import CategorySideBar from "../CategorySideBar/CategorySideBar";
import "bootstrap-icons/font/bootstrap-icons.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="row r-1">
        <div className="category-sidebar col-3">
          <CategorySideBar />
        </div>
        <div className="main-content col-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
