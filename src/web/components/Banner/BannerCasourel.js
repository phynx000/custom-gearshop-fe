import React from "react";
import Carousel from "react-bootstrap/Carousel";
import home_slider_1 from "../../../assets/images/home_slider_1.webp";
import home_slider_2 from "../../../assets/images/home_slider_2.jpg";
import home_slider_3 from "../../../assets/images/home_slider_3.jpg";

const BannerCarousel = () => {
  const images = [
    {
      src: home_slider_1,
      alt: "First slide",
      title: "Gear Gaming Chất Lượng",
      description: "Trải nghiệm chơi game đẳng cấp với thiết bị hiện đại",
    },
    {
      src: home_slider_2,
      alt: "Second slide",
      title: "Khuyến Mãi Đặc Biệt",
      description: "Ưu đãi lớn cho sản phẩm công nghệ mới nhất",
    },
    {
      src: home_slider_3,
      alt: "Third slide",
      title: "Linh Kiện Chính Hãng",
      description: "Đảm bảo chất lượng, bảo hành dài hạn",
    },
  ];

  return (
    <Carousel fade indicators={true} controls={true}>
      {images.map((image, index) => (
        <Carousel.Item key={index} interval={5000}>
          <img
            className="d-block w-100"
            src={image.src}
            alt={image.alt}
            style={{ height: "400px", objectFit: "cover" }}
          />
          <Carousel.Caption className="d-none d-md-block">
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;
