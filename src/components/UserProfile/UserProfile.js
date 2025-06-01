import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Alert } from "react-bootstrap";
import { useUserProfile, useUserOrders } from "../../hook/useUserProfile";
import UserProfileInfo from "./UserProfileInfo";
import UserOrderHistory from "./UserOrderHistory";
import UserProfileEdit from "./UserProfileEdit";
import UserPasswordChange from "./UserPasswordChange";
import "./UserProfile.scss";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { profile, loading, error, updating, updateProfile } = useUserProfile();
  const {
    orders,
    loading: ordersLoading,
    error: ordersError,
    refreshOrders,
  } = useUserOrders();

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p className="mt-3">Đang tải thông tin cá nhân...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12}>
          <h2 className="mb-4">
            <i className="bi bi-person-circle me-2"></i>
            Trang cá nhân
          </h2>
        </Col>
      </Row>

      <Row>
        <Col lg={3} md={4} className="mb-4">
          {/* Sidebar Navigation */}
          <Card className="profile-sidebar">
            <Card.Body>
              <div className="text-center mb-3">
                <div className="profile-avatar">
                  <i className="bi bi-person-circle fs-1 text-success"></i>
                </div>
                <h5 className="mt-2 mb-1">
                  {profile?.first_name} {profile?.last_name}
                </h5>
                <p className="text-muted small mb-0">{profile?.email}</p>
              </div>

              <Nav variant="pills" className="flex-column profile-nav">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "profile"}
                    onClick={() => setActiveTab("profile")}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-person me-2"></i>
                    Thông tin cá nhân
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "edit"}
                    onClick={() => setActiveTab("edit")}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Chỉnh sửa thông tin
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "orders"}
                    onClick={() => setActiveTab("orders")}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-bag-check me-2"></i>
                    Lịch sử đơn hàng
                    {orders.length > 0 && (
                      <span className="badge bg-success ms-auto">
                        {orders.length}
                      </span>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "password"}
                    onClick={() => setActiveTab("password")}
                    className="d-flex align-items-center"
                  >
                    <i className="bi bi-key me-2"></i>
                    Đổi mật khẩu
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9} md={8}>
          {/* Main Content */}
          <div className="profile-content">
            {activeTab === "profile" && <UserProfileInfo profile={profile} />}

            {activeTab === "edit" && (
              <UserProfileEdit
                profile={profile}
                onUpdate={updateProfile}
                updating={updating}
              />
            )}

            {activeTab === "orders" && (
              <UserOrderHistory
                orders={orders}
                loading={ordersLoading}
                error={ordersError}
                onRefresh={refreshOrders}
              />
            )}
            {activeTab === "password" && <UserPasswordChange />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
