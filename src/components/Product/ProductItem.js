import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductItem = () => {
  return (
    <Card style={{ width: "20rem" }} className="product-item col">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" className="btn-addtocard">
          Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
