import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./Cart.scss";

// Mock cart data
const mockCartData = [
  {
    id: 1,
    productName: "Gaming Mouse",
    price: 49.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
    selected: false,
  },
  {
    id: 2,
    productName: "Mechanical Keyboard",
    price: 89.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
    selected: false,
  },
  {
    id: 3,
    productName: "Gaming Headset",
    price: 79.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
    selected: false,
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartData);
  const [selectAll, setSelectAll] = useState(false);

  // Handle individual item selection
  const handleItemSelect = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: !selectAll }))
    );
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Calculate total price of selected items
  const calculateTotal = () => {
    return cartItems
      .filter((item) => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Container className="cart-container py-4">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="cart-header mb-3">
        <Form.Check
          type="checkbox"
          label="Select All"
          checked={selectAll}
          onChange={handleSelectAll}
        />
      </div>

      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={1}>
                    <Form.Check
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleItemSelect(item.id)}
                    />
                  </Col>
                  <Col xs={2}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="img-fluid"
                    />
                  </Col>
                  <Col xs={3}>
                    <h5>{item.productName}</h5>
                  </Col>
                  <Col xs={2}>
                    <p className="mb-0">${item.price}</p>
                  </Col>
                  <Col xs={2}>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        setCartItems((prevItems) =>
                          prevItems.map((cartItem) =>
                            cartItem.id === item.id
                              ? { ...cartItem, quantity: newQuantity }
                              : cartItem
                          )
                        );
                      }}
                    />
                  </Col>
                  <Col xs={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h4>Order Summary</h4>
              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <Button variant="primary" className="w-100">
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
