import React from "react";
import { Col, Card } from "react-bootstrap";

const SellingPointItem = ({ item }) => {
  return (
    <Col md={4} sm={6} xs={12} lg={2} className="mb-3">
      <Card className="h-100 border-0 bg-light">
        <Card.Body className="d-flex flex-column align-items-center justify-content-center py-4">
          <div className="icon-wrapper mb-3">
            <i className={`bi ${item.icon} fs-1 text-success`}></i>
          </div>
          <h6 className="fw-bold text-center">{item.title}</h6>
          <p className="mb-0 small text-center text-muted">
            {item.description}
          </p>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SellingPointItem;
