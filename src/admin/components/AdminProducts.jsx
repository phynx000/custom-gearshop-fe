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
import { getAllProducts } from "../../api/productService";
import { getCategories } from "../../api/categoryService";
import "./AdminProducts.scss";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load products from API
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const [productsData, categoriesData] = await Promise.all([
        getAllProducts(),
        getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu sản phẩm");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (product) => {
    const totalStock = getTotalStock(product);

    if (totalStock === 0) {
      return <Badge bg="danger">Hết hàng</Badge>;
    } else if (totalStock < 10) {
      return <Badge bg="warning">Sắp hết</Badge>;
    } else {
      return <Badge bg="success">Còn hàng</Badge>;
    }
  };

  const getTotalStock = (product) => {
    if (!product.stock) return 0;
    return Array.isArray(product.stock)
      ? product.stock.reduce((sum, item) => sum + (item.quantity || 0), 0)
      : product.stock;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" ||
      (product.category && product.category.name === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Calculate statistics from actual data
  const stats = {
    total: products.length,
    inStock: products.filter((p) => getTotalStock(p) > 10).length,
    lowStock: products.filter((p) => {
      const stock = getTotalStock(p);
      return stock > 0 && stock <= 10;
    }).length,
    outOfStock: products.filter((p) => getTotalStock(p) === 0).length,
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
        <div className="ms-3">Đang tải dữ liệu sản phẩm...</div>
      </div>
    );
  }

  return (
    <div className="admin-products">
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
                <i className="bi bi-box me-3"></i>
                Xem sản phẩm
              </h2>
              <p className="page-subtitle">
                Xem thông tin tất cả sản phẩm trong cửa hàng
              </p>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card stats-primary">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-box"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.total}</h3>
                    <p>Tổng sản phẩm</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card stats-success">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.inStock}</h3>
                    <p>Còn hàng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card stats-warning">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-exclamation-triangle"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.lowStock}</h3>
                    <p>Sắp hết</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={3} md={6} className="mb-3">
            <Card className="stats-card stats-danger">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-x-circle"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.outOfStock}</h3>
                    <p>Hết hàng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col>
            <Card className="filters-card">
              <Card.Body>
                <Row className="align-items-center">
                  <Col lg={6} md={6} className="mb-3 mb-lg-0">
                    <InputGroup>
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>

                  <Col lg={3} md={6} className="mb-3 mb-lg-0">
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">Tất cả danh mục</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col lg={3} className="text-lg-end">
                    <span className="text-muted">
                      Tìm thấy {filteredProducts.length} sản phẩm
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Products Table */}
        <Row>
          <Col>
            <Card className="products-table-card">
              <Card.Header>
                <h5 className="card-title mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  Danh sách sản phẩm ({filteredProducts.length})
                </h5>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Hình ảnh</th>
                      <th>Thông tin sản phẩm</th>
                      <th>Danh mục</th>
                      <th>Giá</th>
                      <th>Tồn kho</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-4">
                          {loading ? "Đang tải..." : "Không có sản phẩm nào"}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const totalStock = getTotalStock(product);
                        const firstImage =
                          product.images && product.images.length > 0
                            ? product.images[0].image || product.images[0]
                            : null;

                        return (
                          <tr key={product.id}>
                            <td>
                              <div className="product-image">
                                {firstImage ? (
                                  <img
                                    src={firstImage}
                                    alt={product.name}
                                    className="rounded"
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="bg-light rounded d-flex align-items-center justify-content-center"
                                    style={{ width: "60px", height: "60px" }}
                                  >
                                    <i className="bi bi-image text-muted"></i>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="product-info">
                                <h6 className="product-name">{product.name}</h6>
                                <small className="text-muted">
                                  ID: {product.id}
                                </small>
                                {product.version && (
                                  <small className="d-block text-muted">
                                    Phiên bản: {product.version}
                                  </small>
                                )}
                                {product.product_group && (
                                  <small className="d-block text-muted">
                                    Nhóm: {product.product_group}
                                  </small>
                                )}
                              </div>
                            </td>
                            <td>
                              <Badge bg="light" text="dark">
                                {product.category?.name || "Chưa phân loại"}
                              </Badge>
                            </td>
                            <td>
                              <strong className="text-success">
                                {formatPrice(
                                  product.original_price || product.price || 0
                                )}
                              </strong>
                            </td>
                            <td>
                              <span
                                className={`stock-count ${
                                  totalStock === 0
                                    ? "text-danger"
                                    : totalStock < 10
                                    ? "text-warning"
                                    : "text-success"
                                }`}
                              >
                                {totalStock} sp
                              </span>
                            </td>
                            <td>{getStatusBadge(product)}</td>
                            <td>
                              {product.created_at
                                ? new Date(
                                    product.created_at
                                  ).toLocaleDateString("vi-VN")
                                : product.created || "-"}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Hiển thị {filteredProducts.length} sản phẩm
                </small>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminProducts;
