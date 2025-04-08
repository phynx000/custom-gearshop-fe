import React from "react";
import SellingPointItem from "./SellingPointItem";

const SellingPoint = () => {
  const sellingPoints = [
    {
      title: "GIAO HỎA TỐC",
      description: "Nội thành trong 4h",
      icon: "bi-truck",
    },
    {
      title: "TRẢ GÓP ƯU ĐÃI",
      description: "Lãi suất thấp",
      icon: "bi-credit-card",
    },
    {
      title: "DEAL HOT BÙNG NỔ",
      description: "Flash sale giá cực sốc",
      icon: "bi-fire",
    },
    {
      title: "MIỄN PHÍ ĐỔI TRẢ",
      description: "Trong vòng 30 ngày miễn phí",
      icon: "bi-arrow-left-right",
    },
    {
      title: "HỖ TRỢ 24/7",
      description: "Hỗ trợ khách hàng mọi lúc",
      icon: "bi-headset",
    },
  ];

  return (
    <div className="row">
      {sellingPoints.map((point, index) => (
        <SellingPointItem key={index} item={point} />
      ))}
    </div>
  );
};

export default SellingPoint;
