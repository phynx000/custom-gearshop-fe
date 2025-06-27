import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkUserRole } from "../api/userService";
import { getRedirectPath } from "../utils/roleUtils";

const RoleBasedRedirect = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRoleBasedNavigation = async () => {
      if (!isAuthenticated) {
        // Nếu user chưa đăng nhập, điều hướng về login
        navigate("/login", { replace: true });
        return;
      }
      try {
        // Gọi API để check role
        const roleData = await checkUserRole();

        // Check if user is admin (redirect to external admin panel)
        if (roleData && roleData.is_admin) {
          window.location.href = "http://localhost:8000/admin/";
          return;
        }

        // For staff and other users, use utility function để lấy đường dẫn redirect
        const redirectPath = getRedirectPath(roleData);
        navigate(redirectPath, { replace: true });
      } catch (error) {
        console.error("Error checking user role:", error);
        // Nếu có lỗi, điều hướng về trang chủ
        navigate("/", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    handleRoleBasedNavigation();
  }, [isAuthenticated, navigate]);

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

  return null;
};

export default RoleBasedRedirect;
