import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { checkUserRole } from "../api/userService";

/**
 * Custom hook for managing user role data
 * @returns {Object} - { roleData, loading, error, refetch }
 */
export const useUserRole = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoleData = async () => {
    if (!isAuthenticated) {
      setRoleData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await checkUserRole();
      setRoleData(data);
    } catch (err) {
      console.error("Error fetching user role:", err);
      setError(err.message || "Không thể lấy thông tin quyền của người dùng");
      setRoleData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleData();
  }, [isAuthenticated]);

  const refetch = () => {
    fetchRoleData();
  };

  return {
    roleData,
    loading,
    error,
    refetch,
  };
};
