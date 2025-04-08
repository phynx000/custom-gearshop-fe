import React from "react";

const SellingPointItem = ({ item }) => {
  return (
    <div className="d-flex align-items-start gap-2 mb-3 mt-3 col selling-point-item ">
      <i className={`bi ${item.icon} fs-4 text-primary`}></i>
      <div>
        <h6 className="mb-1">{item.title}</h6>
        <p className="mb-0 text-muted">{item.description}</p>
      </div>
    </div>
  );
};

export default SellingPointItem;
