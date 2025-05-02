import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useState } from "react";
import { Link, NavLink, BrowserRouter } from "react-router-dom";
import SidebarWrapper from "../CategorySideBar/SidebarWrapper";

const Navigation = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="container-fluid">
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div className="show-category" onClick={handleShow}>
              <i className="bi bi-list"></i>Danh mục sản phẩm
            </div>
            <Navbar className="bg-body-tertiary justify-content-between"></Navbar>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <SidebarWrapper show={show} onClose={handleClose} />
    </Navbar>
  );
};

export default Navigation;
