import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import SidebarWrapper from "../CategorySideBar/SidebarWrapper";
import "./Navigation.scss";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Navbar expand="lg" variant="dark" bg="success" className="py-2">
      <Container fluid className="px-lg-5">
        <Navbar.Toggle aria-controls="navigation-menu" />
        <Navbar.Collapse id="navigation-menu">
          <Nav className="me-auto">
            <div
              className="d-flex align-items-center text-white cursor-pointer px-3 py-2"
              onClick={handleShow}
            >
              <i className="bi bi-list me-2 fs-5"></i>
              <span>Danh mục sản phẩm</span>
            </div>

            <Nav.Link as={Link} to="/products" className="text-white">
              Sản phẩm mới
            </Nav.Link>

            <Nav.Link as={Link} to="/sale" className="text-white">
              Khuyến mãi
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/contact" className="text-white">
              Liên hệ
            </Nav.Link>

            <Nav.Link as={Link} to="/about" className="text-white">
              Về chúng tôi
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <SidebarWrapper show={show} onClose={handleClose} />
    </Navbar>
  );
};

export default Navigation;
