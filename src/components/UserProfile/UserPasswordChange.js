import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { changePassword } from "../../services/userService";

const UserPasswordChange = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.current_password) {
      newErrors.current_password = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!formData.new_password) {
      newErrors.new_password = "Vui lòng nhập mật khẩu mới";
    } else if (formData.new_password.length < 6) {
      newErrors.new_password = "Mật khẩu mới phải có ít nhất 6 ký tự";
    }

    if (!formData.confirm_password) {
      newErrors.confirm_password = "Vui lòng xác nhận mật khẩu mới";
    } else if (formData.new_password !== formData.confirm_password) {
      newErrors.confirm_password = "Mật khẩu xác nhận không khớp";
    }

    if (formData.current_password === formData.new_password) {
      newErrors.new_password = "Mật khẩu mới phải khác mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
      });

      setSuccess(true);
      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Error changing password:", err);

      if (err.response?.status === 400) {
        setError("Mật khẩu hiện tại không đúng");
      } else if (err.response?.status === 401) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
      } else {
        setError("Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-key me-2"></i>
          Đổi mật khẩu
        </h5>
      </Card.Header>
      <Card.Body>
        {success && (
          <Alert variant="success" className="d-flex align-items-center">
            <i className="bi bi-check-circle me-2"></i>
            Đổi mật khẩu thành công!
          </Alert>
        )}

        {error && (
          <Alert variant="danger" className="d-flex align-items-center">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <Form.Label>
              <i className="bi bi-lock"></i>
              Mật khẩu hiện tại
            </Form.Label>
            <Form.Control
              type="password"
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              className={errors.current_password ? "is-invalid" : ""}
              placeholder="Nhập mật khẩu hiện tại"
            />
            {errors.current_password && (
              <div className="invalid-feedback">{errors.current_password}</div>
            )}
          </div>

          <div className="form-group">
            <Form.Label>
              <i className="bi bi-lock-fill"></i>
              Mật khẩu mới
            </Form.Label>
            <Form.Control
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              className={errors.new_password ? "is-invalid" : ""}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
            />
            {errors.new_password && (
              <div className="invalid-feedback">{errors.new_password}</div>
            )}
          </div>

          <div className="form-group">
            <Form.Label>
              <i className="bi bi-lock-fill"></i>
              Xác nhận mật khẩu mới
            </Form.Label>
            <Form.Control
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className={errors.confirm_password ? "is-invalid" : ""}
              placeholder="Nhập lại mật khẩu mới"
            />
            {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password}</div>
            )}
          </div>

          <div className="form-actions">
            <Button
              type="submit"
              className="btn-profile-primary"
              disabled={loading}
            >
              {loading ? (
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
                  Đổi mật khẩu
                </>
              )}
            </Button>
          </div>
        </Form>

        <Alert variant="info" className="mt-4">
          <i className="bi bi-info-circle me-2"></i>
          <strong>Lưu ý:</strong>
          <ul className="mb-0 mt-2">
            <li>Mật khẩu mới phải có ít nhất 6 ký tự</li>
            <li>Mật khẩu mới phải khác mật khẩu hiện tại</li>
            <li>Sau khi đổi mật khẩu, bạn sẽ cần đăng nhập lại</li>
          </ul>
        </Alert>
      </Card.Body>
    </Card>
  );
};

export default UserPasswordChange;
