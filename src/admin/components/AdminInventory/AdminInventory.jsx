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
  Button,
  Modal,
} from "react-bootstrap";
import { getBranchesWithStock, updateStock } from "../../../api/branchService";
import { toast } from "react-toastify";
import "./AdminInventory.scss";

const AdminInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stock edit modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStock, setEditingStock] = useState(null);
  const [editForm, setEditForm] = useState({
    color: "",
    quantity: 0,
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  // Load branches with stock on component mount
  useEffect(() => {
    loadBranchesWithStock();
  }, []);

  const loadBranchesWithStock = async () => {
    try {
      setLoading(true);
      setError("");
      const branchesData = await getBranchesWithStock();
      setBranches(branchesData);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu tồn kho");
      console.error("Error loading branches with stock:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get products from selected branch
  const getBranchProducts = () => {
    if (!selectedBranchId) {
      // Return all products from all branches
      return branches.flatMap((branch) =>
        branch.products.map((product) => ({
          ...product,
          branch_name: branch.branch_name,
          branch_address: branch.address,
        }))
      );
    }
    const selectedBranch = branches.find(
      (b) => b.branch_id === parseInt(selectedBranchId)
    );
    return selectedBranch
      ? selectedBranch.products.map((product) => ({
          ...product,
          branch_name: selectedBranch.branch_name,
          branch_address: selectedBranch.address,
        }))
      : [];
  };

  const filteredProducts = getBranchProducts().filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Calculate inventory statistics
  const getInventoryStats = () => {
    const allProducts = getBranchProducts();
    return {
      totalProducts: allProducts.length,
      inStock: allProducts.filter((p) => p.quantity > 10).length,
      lowStock: allProducts.filter((p) => p.quantity > 0 && p.quantity <= 10)
        .length,
      outOfStock: allProducts.filter((p) => p.quantity === 0).length,
      totalValue: allProducts.reduce((sum, p) => sum + p.quantity, 0),
    };
  };
  const stats = getInventoryStats();

  // Stock editing functions
  const handleEditStock = (product, index) => {
    // Use the stock_id from the product data
    // The API should provide stock_id for each product
    const stockId = product.stock_id || product.id;

    if (!stockId) {
      toast.error("Không tìm thấy ID tồn kho để cập nhật");
      return;
    }

    setEditingStock({
      ...product,
      stock_id: stockId,
      index: index,
      original_quantity: product.quantity,
    });
    setEditForm({
      color: product.color || "",
      quantity: product.quantity,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingStock(null);
    setEditForm({ color: "", quantity: 0 });
  };

  const handleUpdateStock = async () => {
    if (!editingStock) return;

    // Validation
    if (!editForm.color.trim()) {
      toast.error("Vui lòng nhập màu sắc sản phẩm");
      return;
    }

    if (editForm.quantity < 0) {
      toast.error("Số lượng không thể âm");
      return;
    }

    if (
      parseInt(editForm.quantity) === editingStock.original_quantity &&
      editForm.color.trim() === editingStock.color
    ) {
      toast.info("Không có thay đổi nào để lưu");
      return;
    }

    try {
      setUpdateLoading(true);

      // Call the API to update stock
      const response = await updateStock(editingStock.stock_id, {
        color: editForm.color.trim(),
        quantity: parseInt(editForm.quantity),
      });

      // Update the local state
      setBranches((prevBranches) => {
        return prevBranches.map((branch) => {
          return {
            ...branch,
            products: branch.products.map((product, idx) => {
              if (
                (product.stock_id || product.id) === editingStock.stock_id &&
                product.product_id === editingStock.product_id
              ) {
                return {
                  ...product,
                  color: editForm.color.trim(),
                  quantity: parseInt(editForm.quantity),
                };
              }
              return product;
            }),
          };
        });
      });

      toast.success(response.message || "Cập nhật tồn kho thành công!");
      handleCloseEditModal();
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra khi cập nhật tồn kho");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "400px" }}
      >
        <Spinner animation="border" variant="primary" />
        <div className="ms-3">Đang tải dữ liệu tồn kho...</div>
      </div>
    );
  }

  return (
    <div className="admin-inventory">
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
                <i className="bi bi-boxes me-3"></i>
                Quản lý Tồn kho
              </h2>
              <p className="page-subtitle">
                Theo dõi và quản lý tồn kho sản phẩm tại các chi nhánh
              </p>
            </div>
          </Col>
        </Row>

        {/* Statistics Cards */}
        <Row className="mb-4">
          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="stats-card stats-primary">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-boxes"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.totalProducts}</h3>
                    <p>Tổng mặt hàng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6} className="mb-3">
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

          <Col lg={2} md={4} sm={6} className="mb-3">
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

          <Col lg={2} md={4} sm={6} className="mb-3">
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

          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="stats-card stats-info">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-graph-up"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{stats.totalValue}</h3>
                    <p>Tổng số lượng</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={2} md={4} sm={6} className="mb-3">
            <Card className="stats-card stats-secondary">
              <Card.Body>
                <div className="stats-content">
                  <div className="stats-icon">
                    <i className="bi bi-building"></i>
                  </div>
                  <div className="stats-info">
                    <h3>{branches.length}</h3>
                    <p>Chi nhánh</p>
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
                  <Col lg={4} md={6} className="mb-3 mb-lg-0">
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

                  <Col lg={4} md={6} className="mb-3 mb-lg-0">
                    <Form.Select
                      value={selectedBranchId}
                      onChange={(e) => setSelectedBranchId(e.target.value)}
                    >
                      <option value="">Tất cả chi nhánh</option>
                      {branches.map((branch) => (
                        <option key={branch.branch_id} value={branch.branch_id}>
                          {branch.branch_name} - {branch.address}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>

                  <Col lg={4} className="text-lg-end">
                    <span className="text-muted">
                      Tìm thấy {filteredProducts.length} sản phẩm
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Inventory Table */}
        <Row>
          <Col>
            <Card className="inventory-table-card">
              <Card.Header>
                <h5 className="card-title mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  {selectedBranchId ? (
                    <>
                      Tồn kho tại chi nhánh:{" "}
                      {branches.find(
                        (b) => b.branch_id === parseInt(selectedBranchId)
                      )?.branch_name || ""}{" "}
                      ({filteredProducts.length})
                    </>
                  ) : (
                    <>Tồn kho tất cả chi nhánh ({filteredProducts.length})</>
                  )}
                </h5>
                {selectedBranchId && (
                  <small className="text-muted">
                    Địa chỉ:{" "}
                    {branches.find(
                      (b) => b.branch_id === parseInt(selectedBranchId)
                    )?.address || ""}
                  </small>
                )}
              </Card.Header>
              <Card.Body className="p-0">
                {" "}
                <Table responsive hover className="mb-0">
                  {" "}
                  <thead className="table-light">
                    <tr>
                      <th>Ảnh</th>
                      <th>Thông tin sản phẩm</th>
                      <th>Màu sắc</th>
                      {!selectedBranchId && <th>Chi nhánh</th>}
                      <th>Số lượng</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={selectedBranchId ? "6" : "7"}
                          className="text-center py-4"
                        >
                          {loading ? "Đang tải..." : "Không có sản phẩm nào"}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <tr
                          key={`${product.product_id}-${
                            selectedBranchId || product.branch_name
                          }-${index}`}
                        >
                          <td>
                            <div className="product-thumbnail">
                              <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="thumbnail-image"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/50x50?text=No+Image";
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="product-info">
                              <h6 className="product-name">
                                {product.product_name}
                              </h6>
                              <small className="text-muted">
                                ID: {product.product_id}
                              </small>
                            </div>
                          </td>
                          <td>
                            <Badge bg="info" text="white">
                              {product.color || "Không có"}
                            </Badge>
                          </td>
                          {!selectedBranchId && (
                            <td>
                              <div className="branch-info">
                                <strong>{product.branch_name}</strong>
                                <small className="d-block text-muted">
                                  {product.branch_address}
                                </small>
                              </div>
                            </td>
                          )}
                          <td>
                            <span
                              className={`stock-count ${
                                product.quantity === 0
                                  ? "text-danger"
                                  : product.quantity < 10
                                  ? "text-warning"
                                  : "text-success"
                              }`}
                            >
                              <strong>{product.quantity}</strong> sp
                            </span>
                          </td>{" "}
                          <td>
                            {product.quantity === 0 ? (
                              <Badge bg="danger">Hết hàng</Badge>
                            ) : product.quantity < 10 ? (
                              <Badge bg="warning">Sắp hết</Badge>
                            ) : (
                              <Badge bg="success">Còn hàng</Badge>
                            )}
                          </td>
                          <td>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              onClick={() => handleEditStock(product, index)}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Chỉnh sửa
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>{" "}
            </Card>
          </Col>
        </Row>

        {/* Stock Edit Modal */}
        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-pencil-square me-2"></i>
              Chỉnh sửa tồn kho
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editingStock && (
              <>
                {/* Product Information */}
                <div className="mb-4 p-3 bg-light rounded">
                  <div className="d-flex align-items-center">
                    {editingStock.image_url && (
                      <img
                        src={editingStock.image_url}
                        alt={editingStock.product_name}
                        className="me-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Image";
                        }}
                      />
                    )}
                    <div>
                      <h6 className="mb-1">{editingStock.product_name}</h6>
                      <small className="text-muted">
                        ID: {editingStock.product_id}
                      </small>
                      {editingStock.branch_name && (
                        <small className="d-block text-muted">
                          Chi nhánh: {editingStock.branch_name}
                        </small>
                      )}
                      <small className="text-info d-block">
                        Số lượng hiện tại: {editingStock.original_quantity} sp
                      </small>
                    </div>
                  </div>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Màu sắc</Form.Label>
                    <Form.Control
                      type="text"
                      value={editForm.color}
                      onChange={(e) =>
                        setEditForm({ ...editForm, color: e.target.value })
                      }
                      placeholder="Nhập màu sắc sản phẩm"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Số lượng tồn kho</Form.Label>
                    <Form.Control
                      type="number"
                      value={editForm.quantity}
                      onChange={(e) =>
                        setEditForm({ ...editForm, quantity: e.target.value })
                      }
                      placeholder="Nhập số lượng tồn kho"
                      min="0"
                      required
                    />
                    <Form.Text className="text-muted">
                      Nhập số lượng mới để cập nhật tồn kho
                    </Form.Text>
                  </Form.Group>

                  <Alert variant="warning" className="mb-3">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <strong>Xác nhận:</strong> Bạn có chắc chắn muốn cập nhật số
                    lượng tồn kho từ{" "}
                    <strong>{editingStock?.original_quantity}</strong> thành{" "}
                    <strong>{editForm.quantity}</strong> không?
                  </Alert>

                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={handleCloseEditModal}
                      disabled={updateLoading}
                    >
                      Hủy
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleUpdateStock}
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Đang cập nhật...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check2-circle me-1"></i>
                          Lưu thay đổi
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminInventory;
