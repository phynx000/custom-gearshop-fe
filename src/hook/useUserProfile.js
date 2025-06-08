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

export const useUserOrders = (filters = {}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const loadOrders = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await getUserOrders(newFilters);

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
  useEffect(() => {
    loadOrders(filters);
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    orders,
    loading,
    error,
    pagination,
    refreshOrders: loadOrders,
  };
};
