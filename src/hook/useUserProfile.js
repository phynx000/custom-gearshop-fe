import { useState, useEffect } from "react";
import {
  getUserProfile,
  getUserOrders,
  updateUserProfile,
} from "../api/userService";

export const useUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileData = await getUserProfile();
      setProfile(profileData);
    } catch (err) {
      setError(err.message || "Không thể tải thông tin người dùng");
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setUpdating(true);
      setError(null);
      const updatedProfile = await updateUserProfile(profileData);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err) {
      setError(err.message || "Không thể cập nhật thông tin người dùng");
      console.error("Error updating profile:", err);
      throw err;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    updating,
    updateProfile,
    refreshProfile: loadProfile,
  };
};

export const useUserOrders = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const loadOrders = async (newFilters = null) => {
    try {
      // If new filters are provided, update the state
      if (newFilters !== null) {
        setFilters(newFilters);
      }
      
      // Use the current filters state or the newFilters if provided
      const filtersToUse = newFilters !== null ? newFilters : filters;
      
      console.log('Loading orders with filters:', filtersToUse);
      setLoading(true);
      setError(null);
      const ordersData = await getUserOrders(filtersToUse);

      // Handle different response structures
      if (ordersData.results) {
        setOrders(ordersData.results);
        setPagination({
          count: ordersData.count,
          next: ordersData.next,
          previous: ordersData.previous,
        });
      } else if (Array.isArray(ordersData)) {
        setOrders(ordersData);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setError(err.message || "Không thể tải lịch sử đơn hàng");
      console.error("Error loading orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
    // Only run once on component mount
  useEffect(() => {
    console.log('UserOrders useEffect: Initial load');
    loadOrders();
  }, []); // Empty dependency array means it only runs once on mount

  return {
    orders,
    loading,
    error,
    pagination,
    refreshOrders: loadOrders,
  };
};
