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
    // Simulate API call
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend API
    // For now, we'll just simulate a successful submission
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  const contactInfo = [
    {
      icon: <BsGeoAlt />,
      title: "Address",
      details: "123 Tech Street, Innovation District, San Francisco, CA 94105",
    },
    {
      icon: <BsTelephone />,
      title: "Phone",
      details: "+1 (555) 123-4567",
    },
    {
      icon: <BsEnvelope />,
      title: "Email",
      details: "contact@gearshop.com",
    },
    {
      icon: <BsClock />,
      title: "Business Hours",
      details:
        "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    },
  ];

  const socialLinks = [
    {
      icon: <BsFacebook />,
      url: "https://facebook.com/gearshop",
      label: "Facebook",
    },
    {
      icon: <BsInstagram />,
      url: "https://instagram.com/gearshop",
      label: "Instagram",
    },
    {
      icon: <BsTwitter />,
      url: "https://twitter.com/gearshop",
      label: "Twitter",
    },
    {
      icon: <BsYoutube />,
      url: "https://youtube.com/gearshop",
      label: "YouTube",
    },
  ];

  const faqData = [
    {
      question: "What are your shipping options?",
      answer:
        "We offer standard (5-7 business days) and express (2-3 business days) shipping options.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in original packaging.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email to monitor your package.",
    },
    {
      question: "Do you offer customer support?",
      answer:
        "Yes, our customer support team is available Monday-Friday 9 AM - 6 PM via phone, email, or live chat.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.",
    },
  ];

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 className={styles.heroTitle}>Get in Touch</h1>
              <p className={styles.heroSubtitle}>
                Have questions about our products or need assistance? We're here
                to help!
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Information and Form */}
      <section className={styles.contactSection}>
        <Container>
          <Row>
            {/* Contact Information */}
            <Col lg={4} md={12} className="mb-4">
              <div className={styles.contactInfo}>
                <h3 className={styles.sectionTitle}>Contact Information</h3>

                {contactInfo.map((info, index) => (
                  <div key={index} className={styles.contactItem}>
                    <div className={styles.contactIcon}>{info.icon}</div>
                    <div className={styles.contactDetails}>
                      <h5>{info.title}</h5>
                      <p style={{ whiteSpace: "pre-line" }}>{info.details}</p>
                    </div>
                  </div>
                ))}

                {/* Social Media Links */}
                <div className={styles.socialSection}>
                  <h5>Follow Us</h5>
                  <div className={styles.socialLinks}>
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={8} md={12}>
              <Card className={styles.formCard}>
                <Card.Header className={styles.formHeader}>
                  <h3>Send us a Message</h3>
                </Card.Header>
                <Card.Body>
                  <ContactForm onSubmit={handleFormSubmit} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <Container>
          <Row>
            <Col>
              <h3 className={styles.sectionTitle}>Find Our Store</h3>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.8949676183896!2d-122.4094!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c2c66b5b7%3A0x1da29a4ad1b8e30d!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1628185539140!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Store Location"
                ></iframe>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <Container>
          <Row>
            <Col>
              <h3 className={styles.sectionTitle}>
                Frequently Asked Questions
              </h3>
            </Col>
          </Row>
          <Row>
            {faqData.map((faq, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className={styles.faqCard}>
                  <Card.Body>
                    <h5 className={styles.faqQuestion}>{faq.question}</h5>
                    <p className={styles.faqAnswer}>{faq.answer}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
