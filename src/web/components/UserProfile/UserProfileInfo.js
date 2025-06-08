import React from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

const UserProfileInfo = ({ profile }) => {
  if (!profile) {
    return (
      <Card>
        <Card.Body>
          <p className="text-muted">Không có thông tin người dùng.</p>
        </Card.Body>
      </Card>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAccountStatus = () => {
    return profile.is_active ? (
      <Badge bg="success">Hoạt động</Badge>
    ) : (
      <Badge bg="secondary">Không hoạt động</Badge>
    );
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">
            <i className="bi bi-person me-2"></i>
            Thông tin cá nhân
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Tên người dùng
              </label>
              <p className="mb-0 fw-medium">
                {profile.username || "Chưa cập nhật"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">Email</label>
              <p className="mb-0 fw-medium">
                {profile.email || "Chưa cập nhật"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">Họ</label>
              <p className="mb-0 fw-medium">
                {profile.last_name || "Chưa cập nhật"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">Tên</label>
              <p className="mb-0 fw-medium">
                {profile.first_name || "Chưa cập nhật"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Số điện thoại
              </label>
              <p className="mb-0 fw-medium">
                {profile.phone || "Chưa cập nhật"}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Trạng thái tài khoản
              </label>
              <div>{getAccountStatus()}</div>
            </Col>
            <Col xs={12} className="mb-3">
              <label className="form-label text-muted small">Địa chỉ</label>
              <p className="mb-0 fw-medium">
                {profile.address || "Chưa cập nhật"}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5 className="mb-0">
            <i className="bi bi-clock-history me-2"></i>
            Thông tin tài khoản
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Ngày tạo tài khoản
              </label>
              <p className="mb-0 fw-medium">
                {formatDate(profile.date_joined)}
              </p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Lần đăng nhập cuối
              </label>
              <p className="mb-0 fw-medium">{formatDate(profile.last_login)}</p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                ID người dùng
              </label>
              <p className="mb-0 fw-medium text-muted">#{profile.id}</p>
            </Col>
            <Col md={6} className="mb-3">
              <label className="form-label text-muted small">
                Loại tài khoản
              </label>
              <p className="mb-0 fw-medium">
                {profile.is_superuser ? (
                  <Badge bg="warning">Quản trị viên</Badge>
                ) : profile.is_staff ? (
                  <Badge bg="info">Nhân viên</Badge>
                ) : (
                  <Badge bg="light" text="dark">
                    Khách hàng
                  </Badge>
                )}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserProfileInfo;
