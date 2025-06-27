import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import OrderStatusEditor from "./OrderStatusEditor";
import { getOrders } from "../../../api/orderService";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStatus = (order) => {
    setSelectedOrder(order);
    setShowEditor(true);
  };

  const handleStatusUpdate = (updatedOrder) => {
    // Update the order in the list
    setOrders(
      orders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>
            <i className="bi bi-list-check me-3"></i>
            Quản lý trạng thái đơn hàng
          </h2>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Danh sách đơn hàng</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover>
                <thead className="table-light">
                  <tr>
                    <th>Mã đơn</th>
                    <th>Khách hàng</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Thanh toán</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>{order.user_name}</td>
                      <td>{formatPrice(order.total_price)}</td>
                      <td>
                        <span className={`badge bg-secondary`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-info`}>
                          {order.payment_status}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleEditStatus(order)}
                        >
                          <i className="bi bi-pencil me-1"></i>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Status Editor Modal */}
      <Modal show={showEditor} onHide={() => setShowEditor(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật trạng thái đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <OrderStatusEditor
              order={selectedOrder}
              onStatusUpdate={handleStatusUpdate}
              isStaff={true}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditor(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderManagement;
