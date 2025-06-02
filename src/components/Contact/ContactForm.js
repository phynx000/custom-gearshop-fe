import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { BsSend, BsCheckCircleFill } from "react-icons/bs";
import styles from "./ContactForm.module.scss";

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSubmit) {
        await onSubmit(formData);
      }

      setShowAlert(true);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      {showAlert && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowAlert(false)}
          className={styles.successAlert}
        >
          <BsCheckCircleFill className="me-2" />
          <strong>Gửi thành công!</strong> Cảm ơn bạn đã liên hệ. Chúng tôi sẽ
          phản hồi trong thời gian sớm nhất.
        </Alert>
      )}

      <Form onSubmit={handleSubmit} className={styles.contactForm}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Họ và tên <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập họ và tên của bạn"
                required
                className={styles.formInput}
                disabled={isSubmitting}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Email <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
                className={styles.formInput}
                disabled={isSubmitting}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Số điện thoại
              </Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="0123 456 789"
                className={styles.formInput}
                disabled={isSubmitting}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Chủ đề <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className={styles.formInput}
                disabled={isSubmitting}
              >
                <option value="">Chọn chủ đề liên hệ</option>
                <option value="product-inquiry">Hỏi về sản phẩm</option>
                <option value="order-support">Hỗ trợ đơn hàng</option>
                <option value="technical-support">Hỗ trợ kỹ thuật</option>
                <option value="warranty">Bảo hành sản phẩm</option>
                <option value="partnership">Hợp tác kinh doanh</option>
                <option value="complaint">Khiếu nại</option>
                <option value="suggestion">Góp ý</option>
                <option value="other">Khác</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className={styles.formGroup}>
              <Form.Label className={styles.formLabel}>
                Tin nhắn <span className={styles.required}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Nhập nội dung tin nhắn chi tiết của bạn..."
                required
                className={`${styles.formInput} ${styles.textArea}`}
                disabled={isSubmitting}
              />
              <Form.Text className={styles.characterCount}>
                {formData.message.length}/500 ký tự
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>

        <div className={styles.submitSection}>
          <Button
            type="submit"
            className={styles.submitButton}
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Đang gửi...
              </>
            ) : (
              <>
                <BsSend className="me-2" />
                Gửi Tin Nhắn
              </>
            )}
          </Button>

          <p className={styles.privacyNote}>
            Bằng cách gửi form này, bạn đồng ý với{" "}
            <a href="/privacy" className={styles.privacyLink}>
              Chính sách bảo mật
            </a>{" "}
            của chúng tôi.
          </p>
        </div>
      </Form>
    </div>
  );
};

export default ContactForm;
