import React from "react";
import { Container, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserRole } from "../../../hook/useUserRole";
import {
  getRoleDisplayName,
  hasAdminAccess,
  isCustomer,
} from "../../../utils/roleUtils";

const RoleTestPage = () => {
  const { roleData, loading, error } = useUserRole();

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang tải thông tin quyền...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Card className="text-center">
          <Card.Body>
            <Card.Title className="text-danger">Lỗi</Card.Title>
            <Card.Text>{error}</Card.Text>
            <Button variant="primary" as={Link} to="/">
              Về trang chủ
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header>
          <h4>Thông tin quyền người dùng</h4>
        </Card.Header>
        <Card.Body>
          {roleData ? (
            <div>
              <h5>
                Role hiện tại:
                <Badge bg="primary" className="ms-2">
                  {getRoleDisplayName(roleData)}
                </Badge>
              </h5>

              <div className="mt-4">
                <h6>Chi tiết quyền:</h6>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Admin
                    <Badge bg={roleData.is_admin ? "success" : "secondary"}>
                      {roleData.is_admin ? "Có" : "Không"}
                    </Badge>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Staff
                    <Badge bg={roleData.is_staff ? "success" : "secondary"}>
                      {roleData.is_staff ? "Có" : "Không"}
                    </Badge>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Customer
                    <Badge bg={roleData.is_customer ? "success" : "secondary"}>
                      {roleData.is_customer ? "Có" : "Không"}
                    </Badge>
                  </li>
                </ul>
              </div>

              <div className="mt-4">
                <h6>Quyền truy cập:</h6>
                <p>
                  <strong>Admin Panel:</strong>{" "}
                  <Badge bg={hasAdminAccess(roleData) ? "success" : "danger"}>
                    {hasAdminAccess(roleData) ? "Có quyền" : "Không có quyền"}
                  </Badge>
                </p>
                <p>
                  <strong>Customer Features:</strong>{" "}
                  <Badge bg={isCustomer(roleData) ? "success" : "danger"}>
                    {isCustomer(roleData) ? "Có quyền" : "Không có quyền"}
                  </Badge>
                </p>
              </div>

              <div className="mt-4">
                <h6>Thông tin khác:</h6>
                <p>
                  <strong>Username:</strong> {roleData.username}
                </p>
                <p>
                  <strong>User ID:</strong> {roleData.id}
                </p>
                <p>
                  <strong>Tên:</strong> {roleData.first_name}{" "}
                  {roleData.last_name}
                </p>
              </div>

              <div className="mt-4">
                <h6>Test Navigation:</h6>
                <div className="d-flex gap-2">
                  <Button variant="primary" as={Link} to="/check-role">
                    Test Role Redirect
                  </Button>
                  {hasAdminAccess(roleData) && (
                    <Button variant="warning" as={Link} to="/admin">
                      Admin Panel
                    </Button>
                  )}
                  <Button variant="secondary" as={Link} to="/">
                    Trang chủ
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <p>Không có thông tin role</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RoleTestPage;
