import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminLayout = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="admin-layout d-flex">
      {/* Admin Sidebar */}
      <div
        className="admin-sidebar bg-dark text-white"
        style={{ minWidth: "250px", minHeight: "100vh" }}
      >
        <div className="p-3">
          <h4 className="text-center">Trang quản trị viên</h4>
          <hr />{" "}
          <nav className="nav flex-column">
            <Link
              className={`nav-link text-white ${
                isActive("dashboard") ? "active bg-primary" : ""
              }`}
              to="/admin/dashboard"
            >
              <i className="bi bi-pie-chart me-2"></i>Thống kê
            </Link>{" "}
            {/* <Link
              className={`nav-link text-white ${
                isActive("products") ? "active bg-primary" : ""
              }`}
              to="/admin/products"
            >
              <i className="bi bi-box me-2"></i>Xem sản phẩm
            </Link> */}
            <Link
              className={`nav-link text-white ${
                isActive("inventory") ? "active bg-primary" : ""
              }`}
              to="/admin/inventory"
            >
              <i className="bi bi-boxes me-2"></i>Quản lý tồn kho
            </Link>
            <Link
              className={`nav-link text-white ${
                isActive("orders") ? "active bg-primary" : ""
              }`}
              to="/admin/orders"
            >
              <i className="bi bi-cart-check me-2"></i>Quản lý đơn hàng
            </Link>
          </nav>
        </div>
      </div>

      {/* Admin Content */}
      <div className="admin-content flex-grow-1">
        <header className="bg-white shadow-sm p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Dashboard</h5>
            <div>
              <a href="/" className="btn btn-outline-primary me-2">
                <i className="bi bi-house me-1"></i>View Website
              </a>
              <button className="btn btn-outline-danger">
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-3">
          <Outlet />
        </main>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AdminLayout;
