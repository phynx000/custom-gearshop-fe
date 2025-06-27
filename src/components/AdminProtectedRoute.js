import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserRole } from "../api/userService";
import { hasAdminAccess } from "../utils/roleUtils";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [roleData, setRoleData] = useState(null);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await checkUserRole();
        setRoleData(userData);

        // Sử dụng utility function để kiểm tra quyền admin
        setHasAccess(hasAdminAccess(userData));
      } catch (error) {
        console.error("Error checking admin access:", error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAccess();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    // Redirect to home if not admin/staff
    return <Navigate to="/" replace />;
  }

  // If user is admin, redirect to external admin panel
  if (hasAccess && roleData && roleData.is_admin) {
    window.location.href = "http://localhost:8000/admin/";
    return null;
  }

  // If user is staff, allow access to internal admin panel
  return children;
};

export default AdminProtectedRoute;
