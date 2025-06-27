import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  InputGroup,
  Alert,
  Spinner,
} from "react-bootstrap";
import { getCategories } from "../../api/categoryService";
import "./AdminCategories.scss";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Load categories on component mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu danh mục");
      console.error("Error loading categories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (category.code &&
        category.code.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const stats = {
    total: categories.length,
    active: categories.filter((cat) => cat.is_active !== false).length,
    withIcon: categories.filter((cat) => cat.icon).length,
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
        <div className="ms-3">Đang tải danh mục...</div>
      </div>
    );
  }

  return (
    <div className="admin-categories">
      <Container fluid>
        {/* Error Alert */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h2 className="page-title">
                <i className="bi bi-tags me-3"></i>
                Xem danh mục
              </h2>
              <p className="page-subtitle">
                Xem thông tin tất cả danh mục sản phẩm
              </p>
            </div>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-3">
            <Card className="stats-card stats-primary">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-tags"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.total}</h3>
                    <p>Tổng danh mục</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-3">
            <Card className="stats-card stats-success">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.active}</h3>
                    <p>Đang hoạt động</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} md={6} className="mb-3">
            <Card className="stats-card stats-info">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-image"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.withIcon}</h3>
                    <p>Có biểu tượng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Search */}
        <Row className="mb-4">
          <Col lg={6}>
            <InputGroup>
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm danh mục theo tên hoặc mã..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col lg={6} className="text-end">
            <span className="text-muted">
              Hiển thị {filteredCategories.length} / {categories.length} danh
              mục
            </span>
          </Col>
        </Row>

        {/* Categories Table */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">
                  <i className="bi bi-list me-2"></i>
                  Danh sách danh mục ({filteredCategories.length})
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-5">
                    <div className="text-muted">
                      <i className="bi bi-inbox display-1 d-block mb-3"></i>
                      {searchTerm
                        ? "Không tìm thấy danh mục nào"
                        : "Chưa có danh mục nào"}
                    </div>
                  </div>
                ) : (
                  <Table responsive hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>STT</th>
                        <th>Biểu tượng</th>
                        <th>Tên danh mục</th>
                        <th>Mã danh mục</th>
                        <th>Slug</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((category, index) => (
                        <tr key={category.id}>
                          <td>{index + 1}</td>
                          <td>
                            {category.icon ? (
                              <img
                                src={category.icon}
                                alt={category.name}
                                style={{
                                  width: "32px",
                                  height: "32px",
                                  objectFit: "cover",
                                }}
                                className="rounded"
                              />
                            ) : (
                              <div
                                className="bg-light rounded d-flex align-items-center justify-content-center"
                                style={{ width: "32px", height: "32px" }}
                              >
                                <i className="bi bi-image text-muted"></i>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="fw-bold">{category.name}</div>
                            <small className="text-muted">
                              ID: {category.id}
                            </small>
                          </td>
                          <td>
                            {category.code ? (
                              <Badge bg="secondary">{category.code}</Badge>
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td>
                            <code className="text-muted">
                              {category.slug || "-"}
                            </code>
                          </td>
                          <td>
                            <Badge
                              bg={
                                category.is_active !== false
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {category.is_active !== false
                                ? "Hoạt động"
                                : "Ngừng hoạt động"}
                            </Badge>
                          </td>
                          <td>
                            {category.created_at
                              ? new Date(
                                  category.created_at
                                ).toLocaleDateString("vi-VN")
                              : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminCategories;
