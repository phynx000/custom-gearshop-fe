import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  BsGeoAlt,
  BsTelephone,
  BsEnvelope,
  BsClock,
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";
import ContactForm from "./ContactForm";
import styles from "./ContactPage.module.scss";

const ContactPage = () => {
  const handleFormSubmit = async (formData) => {
    // TODO: Implement actual form submission to backend
    console.log("Form submitted:", formData);
    // This could be an API call to send the contact form data
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className={styles.heroTitle}>Liên Hệ Với Chúng Tôi</h1>
              <p className={styles.heroSubtitle}>
                Chúng tôi luôn sẵn sàng hỗ trợ và lắng nghe ý kiến từ quý khách
                hàng
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          {/* Contact Information */}
          <Col lg={4}>
            <Card className={styles.contactInfoCard}>
              <Card.Body>
                <h3 className={styles.sectionTitle}>Thông Tin Liên Hệ</h3>

                <div className={styles.contactItem}>
                  <BsGeoAlt className={styles.contactIcon} />
                  <div>
                    <h6>Địa chỉ</h6>
                    <p>123 Đường ABC, Quận 1, TP.HCM, Việt Nam</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <BsTelephone className={styles.contactIcon} />
                  <div>
                    <h6>Số điện thoại</h6>
                    <p>+84 123 456 789</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <BsEnvelope className={styles.contactIcon} />
                  <div>
                    <h6>Email</h6>
                    <p>contact@gearshop.com</p>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <BsClock className={styles.contactIcon} />
                  <div>
                    <h6>Giờ làm việc</h6>
                    <p>Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                    <p>Thứ 7 - Chủ nhật: 9:00 - 17:00</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className={styles.socialSection}>
                  <h6>Theo dõi chúng tôi</h6>
                  <div className={styles.socialLinks}>
                    <a
                      href="https://facebook.com/gearshop"
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <BsFacebook />
                    </a>
                    <a
                      href="https://instagram.com/gearshop"
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <BsInstagram />
                    </a>
                    <a
                      href="https://twitter.com/gearshop"
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <BsTwitter />
                    </a>
                    <a
                      href="https://youtube.com/gearshop"
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                    >
                      <BsYoutube />
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Form */}
          <Col lg={8}>
            <Card className={styles.contactFormCard}>
              <Card.Body>
                <h3 className={styles.sectionTitle}>Gửi Tin Nhắn</h3>
                <p className="text-muted mb-4">
                  Có câu hỏi hoặc cần hỗ trợ? Hãy gửi tin nhắn cho chúng tôi!
                </p>

                <ContactForm onSubmit={handleFormSubmit} />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Map Section */}
        <Row className="mt-5">
          <Col>
            <Card className={styles.mapCard}>
              <Card.Body>
                <h3 className={styles.sectionTitle}>Vị Trí Cửa Hàng</h3>
                <div className={styles.mapContainer}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5168854913384!2d106.68427631462282!3d10.772461892319682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f33bbe8ae8b%3A0x2ba6a13b29a8dcd0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCYWNoIEtob2EgLSDEkEhRRyBUUC5IQ00!5e0!3m2!1svi!2s!4v1638360000000!5m2!1svi!2s"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vị trí cửa hàng GearShop"
                  ></iframe>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mt-5">
          <Col>
            <Card className={styles.faqCard}>
              <Card.Body>
                <h3 className={styles.sectionTitle}>Câu Hỏi Thường Gặp</h3>
                <Row className="g-4">
                  <Col md={6}>
                    <div className={styles.faqItem}>
                      <h6>Làm thế nào để theo dõi đơn hàng?</h6>
                      <p>
                        Bạn có thể theo dõi đơn hàng trong phần "Tài khoản" hoặc
                        sử dụng mã đơn hàng được gửi qua email.
                      </p>
                    </div>
                    <div className={styles.faqItem}>
                      <h6>Chính sách đổi trả như thế nào?</h6>
                      <p>
                        Chúng tôi hỗ trợ đổi trả trong vòng 7 ngày kể từ ngày
                        nhận hàng với điều kiện sản phẩm còn nguyên seal.
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.faqItem}>
                      <h6>Có hỗ trợ giao hàng toàn quốc không?</h6>
                      <p>
                        Có, chúng tôi giao hàng toàn quốc với nhiều hình thức
                        vận chuyển khác nhau.
                      </p>
                    </div>
                    <div className={styles.faqItem}>
                      <h6>Làm sao để được tư vấn sản phẩm?</h6>
                      <p>
                        Bạn có thể liên hệ qua hotline, chat trực tuyến hoặc đến
                        trực tiếp cửa hàng để được tư vấn.
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;
