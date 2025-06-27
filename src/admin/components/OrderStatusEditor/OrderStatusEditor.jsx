import React, { useState } from "react";
import { Form, Alert, Spinner } from "react-bootstrap";
import { updateOrderStatus } from "../../../api/orderService";
import "./OrderStatusEditor.scss";

const OrderStatusEditor = ({ order, onStatusUpdate, isStaff = true }) => {
  const [status, setStatus] = useState(order?.status || "");
  const [paymentStatus, setPaymentStatus] = useState(
    order?.payment_status || ""
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error

  // Status options
  const statusOptions = [
    "Pending",
    "Confirmed",
    "Processing",
    "Delivering",
    "Delivered",
    "Completed",
    "Cancelled",
    "Refunded",
  ];

  const paymentStatusOptions = ["Paid", "Unpaid", "Pending"];

  // Vietnamese labels for status
  const statusLabels = {
    Pending: "Chờ xác nhận",
    Confirmed: "Đã xác nhận",
    Processing: "Đang xử lý",
    Delivering: "Đang giao hàng",
    Delivered: "Đã giao hàng",
    Completed: "Hoàn tất",
    Cancelled: "Đã hủy",
    Refunded: "Đã hoàn tiền",
  };

  const paymentStatusLabels = {
    Paid: "Đã thanh toán",
    Unpaid: "Chưa thanh toán",
    Pending: "Chờ thanh toán",
  };

  // Check if user is staff (simple check for now)
  if (!isStaff) {
    return (
      <Alert variant="warning">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Bạn không có quyền chỉnh sửa trạng thái đơn hàng.
      </Alert>
    );
  }

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật không?")) {
      return;
    }
    try {
      setLoading(true);
      setMessage("");

      await updateOrderStatus(order.id, newStatus, paymentStatus);

      setStatus(newStatus);
      setMessage("Cập nhật thành công");
      setMessageType("success");

      // Notify parent component
      if (onStatusUpdate) {
        onStatusUpdate({
          ...order,
          status: newStatus,
          payment_status: paymentStatus,
        });
      }

      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Lỗi khi cập nhật trạng thái");
      setMessageType("error");
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentStatusChange = async (newPaymentStatus) => {
    if (!window.confirm("Bạn có chắc chắn muốn cập nhật không?")) {
      return;
    }
    try {
      setLoading(true);
      setMessage("");

      await updateOrderStatus(order.id, status, newPaymentStatus);

      setPaymentStatus(newPaymentStatus);
      setMessage("Cập nhật thành công");
      setMessageType("success");

      // Notify parent component
      if (onStatusUpdate) {
        onStatusUpdate({
          ...order,
          status: status,
          payment_status: newPaymentStatus,
        });
      }

      // Hide message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Lỗi khi cập nhật trạng thái thanh toán");
      setMessageType("error");
      console.error("Error updating payment status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-status-editor">
      <div className="order-info mb-3">
        <h6 className="mb-2">
          <i className="bi bi-gear me-2"></i>
          Cập nhật trạng thái đơn hàng #{order?.id}
        </h6>
        <small className="text-muted">Khách hàng: {order?.user_name}</small>
      </div>

      {/* Status Message */}
      {message && (
        <Alert
          variant={messageType === "success" ? "success" : "danger"}
          className="mb-3"
        >
          <i
            className={`bi ${
              messageType === "success"
                ? "bi-check-circle"
                : "bi-exclamation-circle"
            } me-2`}
          ></i>
          {message}
        </Alert>
      )}

      <div className="status-controls">
        {/* Order Status */}
        <div className="status-group mb-3">
          <Form.Label className="fw-bold">
            <i className="bi bi-list-check me-2"></i>
            Trạng thái đơn hàng
          </Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={loading}
            className="status-select"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {statusLabels[option] || option}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Hiện tại: <strong>{statusLabels[status] || status}</strong>
          </Form.Text>
        </div>

        {/* Payment Status */}
        <div className="status-group mb-3">
          <Form.Label className="fw-bold">
            <i className="bi bi-credit-card me-2"></i>
            Trạng thái thanh toán
          </Form.Label>
          <Form.Select
            value={paymentStatus}
            onChange={(e) => handlePaymentStatusChange(e.target.value)}
            disabled={loading}
            className="payment-status-select"
          >
            {paymentStatusOptions.map((option) => (
              <option key={option} value={option}>
                {paymentStatusLabels[option] || option}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="text-muted">
            Hiện tại:{" "}
            <strong>
              {paymentStatusLabels[paymentStatus] || paymentStatus}
            </strong>
          </Form.Text>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center">
            <Spinner animation="border" size="sm" variant="primary" />
            <span className="ms-2">Đang cập nhật...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusEditor;
