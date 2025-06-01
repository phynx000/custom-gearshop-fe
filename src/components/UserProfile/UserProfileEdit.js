import React, { useState, useEffect } from "react";
import { Card, Form, Button, Alert, Row, Col } from "react-bootstrap";

const UserProfileEdit = ({ profile, onUpdate, updating }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Tên không được để trống";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Họ không được để trống";
    }

    if (
      formData.phone &&
      !/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    try {
      await onUpdate(formData);
      setSuccess(true);
      setErrors({});

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      // Errors will be handled by the parent component
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-pencil-square me-2"></i>
          Chỉnh sửa thông tin cá nhân
        </h5>
      </Card.Header>
      <Card.Body>
        {success && (
          <Alert variant="success" className="mb-3">
            <i className="bi bi-check-circle me-2"></i>
            Cập nhật thông tin thành công!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Họ *</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  isInvalid={!!errors.last_name}
                  placeholder="Nhập họ của bạn"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Tên *</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  isInvalid={!!errors.first_name}
                  placeholder="Nhập tên của bạn"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  placeholder="Nhập số điện thoại"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Số điện thoại sẽ được sử dụng để liên lạc khi có đơn hàng
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="bg-light"
                />
                <Form.Text className="text-muted">
                  Email không thể thay đổi
                </Form.Text>
              </Form.Group>
            </Col>

            <Col xs={12} className="mb-3">
              <Form.Group>
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ của bạn"
                />
                <Form.Text className="text-muted">
                  Địa chỉ mặc định sẽ được sử dụng khi đặt hàng
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button
              variant="success"
              type="submit"
              disabled={updating}
              className="px-4"
            >
              {updating ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <i className="bi bi-check-lg me-2"></i>
                  Cập nhật thông tin
                </>
              )}
            </Button>

            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setFormData({
                  first_name: profile?.first_name || "",
                  last_name: profile?.last_name || "",
                  phone: profile?.phone || "",
                  address: profile?.address || "",
                });
                setErrors({});
                setSuccess(false);
              }}
              disabled={updating}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Hoàn tác
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfileEdit;
