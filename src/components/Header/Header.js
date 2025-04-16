import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, NavLink, BrowserRouter } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Gear Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar className="bg-body-tertiary justify-content-between"></Navbar>
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

          <Nav className="login-signup-bar">
            <Link to="/login" rel="prefetch">
              <button className="btn-login">Đăng nhập</button>
            </Link>
            <Link to="/signup">
              <button className="btn-signup">Đăng ký</button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
