import React from "react";
// import CategoryItem from "./CategoryItem";
import { useCategory } from "../../hook/useCategory";

const CategorySideBar = () => {
  const { categories, loading, error, handleChangeCategory, currentCategory } =
    useCategory();

  return (
    <div>
      <h4>Danh Mục</h4>

      {categories.map((category) => (
        <div className="category-list">
          <img src={category.icon} className="icon-category" alt="" />
          {/*  */}
          <div className="">
            <button
              key={category.id}
              className={`category-item btn
            ${currentCategory === String(category.id) ? "active" : ""}`}
              onClick={() => handleChangeCategory(category.slug)}
            >
              {category.name}
              {/* {console.log(category.icon)}   */}
              {/* {console.log(currentCategory)} */}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySideBar;
