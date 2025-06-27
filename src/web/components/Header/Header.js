import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/authSlice";
import { getAllCartItem } from "../../../api/cartService";
import { useUserRole } from "../../../hook/useUserRole";
import { hasAdminAccess } from "../../../utils/roleUtils";
import UserRoleBadge from "./UserRoleBadge";
import "./Header.scss";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { roleData } = useUserRole();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartAnimated, setCartAnimated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetch cart items on component mount and when cart is updated
  useEffect(() => {
    if (isAuthenticated) {
      getAllCartItem()
        .then((data) => {
          if (Array.isArray(data)) {
            setCartItemsCount(data.length);
            localStorage.setItem("cartItems", JSON.stringify(data));
          }
        })
        .catch(() => {
          // Fallback to localStorage if API call fails
          const storedCart = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
          );
          setCartItemsCount(storedCart.length);
        });
    } else {
      // If not authenticated, don't show cart items count
      setCartItemsCount(0);
    }
  }, [isAuthenticated]);

  // Listen for cart updates through window events
  useEffect(() => {
    const handleCartUpdate = async () => {
      if (isAuthenticated) {
        try {
          // Fetch fresh data from server
          const data = await getAllCartItem();
          if (Array.isArray(data)) {
            setCartItemsCount(data.length);
            localStorage.setItem("cartItems", JSON.stringify(data));
          }
        } catch (error) {
          // Fallback to localStorage if API call fails
          const storedCart = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
          );
          setCartItemsCount(storedCart.length);
        }
      } else {
        // If not authenticated, don't show cart items count
        setCartItemsCount(0);
      }

      // Trigger animation
      setCartAnimated(true);
      setTimeout(() => setCartAnimated(false), 500);
    };

    // Create a custom event for cart updates
    window.addEventListener("cartUpdated", handleCartUpdate);

    // Cleanup listener
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    // Reset cart count when logging out
    setCartItemsCount(0);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Navbar expand="lg" className="py-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          Gear Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarContent" />
        <Navbar.Collapse id="navbarContent">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="me-3">
              Trang chủ
            </Nav.Link>
          </Nav>

          <Form
            onSubmit={handleSearch}
            className="d-flex mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Bạn cần tìm kiếm gì?"
                aria-label="Search"
                className="border-end-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline-success"
                type="submit"
                className="d-flex align-items-center"
              >
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <Link
                to="/cart"
                className={`position-relative me-4 text-decoration-none d-flex align-items-center ${
                  cartAnimated ? "cart-bounce" : ""
                }`}
              >
                <i className="bi bi-cart3 fs-4 text-dark"></i>
                {cartItemsCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItemsCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
              </Link>
            ) : (
              <div
                className="position-relative me-4 d-flex align-items-center text-muted"
                style={{ cursor: "not-allowed" }}
                title="Vui lòng đăng nhập để xem giỏ hàng"
              >
                <i className="bi bi-cart3 fs-4"></i>
              </div>
            )}

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="success"
                  id="user-dropdown"
                  className="rounded-pill px-3 d-flex align-items-center"
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {user.first_name}
                  <UserRoleBadge />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person me-2"></i>
                    Thông tin cá nhân
                  </Dropdown.Item>
                  {roleData && hasAdminAccess(roleData) && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/admin">
                        <i className="bi bi-gear me-2"></i>
                        Quản trị hệ thống
                      </Dropdown.Item>
                    </>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Đăng xuất
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex">
                <Link to="/login" className="text-decoration-none me-2">
                  <Button variant="success" className="rounded-pill px-3">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup" className="text-decoration-none">
                  <Button variant="success" className="rounded-pill px-3">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
