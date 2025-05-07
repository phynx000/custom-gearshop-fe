import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, NavLink, BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import "./Header.scss";

const Navigation = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log("isAuth : ", isAuthenticated);
  const dispatch = useDispatch();
  const [cartItems] = React.useState(0); // This should be connected to your cart state management

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gear Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* <Navbar className="bg-body-tertiary justify-content-between"></Navbar> */}
          </Nav>

          <Nav className="search-bar">
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Bạn cần tìm kiếm gì ?"
                    className=" mr-sm-2"
                  />
                </Col>
                <Col xs="auto">
                  <Button type="submit">Tìm kiếm</Button>
                </Col>
              </Row>
            </Form>
          </Nav>

          <Nav className="ms-auto d-flex align-items-center">
            <Link to="/cart" className="cart-link">
              <i className="bi bi-cart3"></i>
              {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
            </Link>

            {isAuthenticated ? (
              <>
                <span className="name-user">Chào {user.first_name}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <Nav className="login-signup-bar">
                <Link to="/login" rel="prefetch">
                  <button className="btn-login">Đăng nhập</button>
                </Link>
                <Link to="/signup">
                  <button className="btn-signup">Đăng ký</button>
                </Link>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
