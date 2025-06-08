import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsYoutube,
  BsGeoAlt,
  BsTelephone,
  BsEnvelope,
} from "react-icons/bs";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="gy-4">
          {/* Company Info */}
          <Col lg={4} md={6}>
            <div className={styles.footerSection}>
              <h5 className={styles.footerTitle}>Gear Shop</h5>
              <p className={styles.footerDescription}>
                Chuyên cung cấp các thiết bị công nghệ chất lượng cao với giá cả
                hợp lý. Chúng tôi cam kết mang đến trải nghiệm mua sắm tuyệt vời
                nhất cho khách hàng.
              </p>
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
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Liên kết nhanh</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/">Trang chủ</Link>
                </li>
                <li>
                  <Link to="/products">Sản phẩm</Link>
                </li>
                <li>
                  <Link to="/contact">Liên hệ</Link>
                </li>
                <li>
                  <Link to="/about">Về chúng tôi</Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Customer Support */}
          <Col lg={3} md={6}>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Hỗ trợ khách hàng</h6>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/shipping-policy">Chính sách giao hàng</Link>
                </li>
                <li>
                  <Link to="/return-policy">Chính sách đổi trả</Link>
                </li>
                <li>
                  <Link to="/warranty">Bảo hành</Link>
                </li>
                <li>
                  <Link to="/faq">Câu hỏi thường gặp</Link>
                </li>
              </ul>
            </div>
          </Col>

          {/* Contact Info */}
          <Col lg={3} md={6}>
            <div className={styles.footerSection}>
              <h6 className={styles.footerSubtitle}>Thông tin liên hệ</h6>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <BsGeoAlt className={styles.contactIcon} />
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </div>
                <div className={styles.contactItem}>
                  <BsTelephone className={styles.contactIcon} />
                  <span>+84 123 456 789</span>
                </div>
                <div className={styles.contactItem}>
                  <BsEnvelope className={styles.contactIcon} />
                  <span>contact@gearshop.com</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className={styles.footerDivider} />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <p className={styles.copyright}>
              © 2024 Gear Shop. Tất cả quyền được bảo lưu.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
