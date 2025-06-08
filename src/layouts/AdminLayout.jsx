import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      {/* Admin Sidebar */}
      <div
        className="admin-sidebar bg-dark text-white"
        style={{ minWidth: "250px", minHeight: "100vh" }}
      >
        <div className="p-3">
          <h4 className="text-center">Admin Panel</h4>
          <hr />
          <nav className="nav flex-column">
            <a className="nav-link text-white" href="/admin/dashboard">
              <i className="bi bi-speedometer2 me-2"></i>Dashboard
            </a>
            <a className="nav-link text-white" href="/admin/products">
              <i className="bi bi-box me-2"></i>Products
            </a>
            <a className="nav-link text-white" href="/admin/orders">
              <i className="bi bi-cart-check me-2"></i>Orders
            </a>
            <a className="nav-link text-white" href="/admin/users">
              <i className="bi bi-people me-2"></i>Users
            </a>
            <a className="nav-link text-white" href="/admin/categories">
              <i className="bi bi-tags me-2"></i>Categories
            </a>
          </nav>
        </div>
      </div>

      {/* Admin Content */}
      <div className="admin-content flex-grow-1">
        <header className="bg-white shadow-sm p-3 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Admin Dashboard</h5>
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
