import React from "react";
import CategorySideBar from "./CategorySideBar";
import { Offcanvas } from "react-bootstrap";
import "./SidebarWrapper.scss";

const SidebarWrapper = ({ show, onClose }) => {
  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="start"
      backdrop={true}
      className="sidebar-offcanvas"
    >
      <Offcanvas.Header closeButton>
        {/* <Offcanvas.Title>Danh mục sản phẩm</Offcanvas.Title> */}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <CategorySideBar />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SidebarWrapper;
