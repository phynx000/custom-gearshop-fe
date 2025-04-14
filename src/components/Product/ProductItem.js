import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductItem = ({ product }) => {
  // this line is used to check if the product is null or undefined
  // if so, it means that not try render anything
  if (!product) {
    return <div>Loading...</div>;
  }

  const firstImage =
    product?.images?.length > 0
      ? product.images[0].image
      : "https://via.placeholder.com/150";

  return (
    <Card style={{ width: "15rem" }} className="product-item-card">
      <Card.Img variant="top" src={firstImage} />
      <Card.Body>
        <Card.Title>{product.name || "error"}</Card.Title>
        <Card.Text>{product.price}</Card.Text>
        <Button variant="primary" className="btn-addtocard">
          Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
