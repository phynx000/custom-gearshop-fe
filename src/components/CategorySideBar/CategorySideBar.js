import React, { use } from "react";
// import CategoryItem from "./CategoryItem";
import useCategory from "../../hook/useCategory";

const CategorySideBar = () => {
  const { categories, loading, error, handleChangeCategory, currentCategorys } =
    useCategory();

  return (
    <div>
      <h4>Danh Mục</h4>
      <ul className="category-list list-group category-aside ">
        <li className="category-item list-group-item list-group-item-action">
          Lap top
        </li>
      </ul>
    </div>
  );
};

export default CategorySideBar;
