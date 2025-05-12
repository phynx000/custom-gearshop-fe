import React, { useState, useEffect } from "react";
import { getAllCartItem, updateQuantityInCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  // Notify about cart changes
  const notifyCartUpdated = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    getAllCartItem()
      .then((data) => {
        if (Array.isArray(data)) {
          setCartItems(data);
          localStorage.setItem("cartItems", JSON.stringify(data)); // cập nhật localStorage luôn
          notifyCartUpdated();
        }
      })
      .catch(() => {
        // fallback nếu lỗi
        const storedCart = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        if (storedCart) {
          setCartItems(storedCart);
        }
      });
  }, []);

  useEffect(() => {
    // Lưu lại giỏ hàng vào localStorage mỗi khi cartItems thay đổi
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    notifyCartUpdated();
  }, [cartItems]);

  // Calculate total price of selected items
  const totalPrice = selectedItems.reduce((total, itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    return total + (item ? item.product?.original_price * item.quantity : 0);
  }, 0);

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setSelectedItems(checked ? cartItems.map((item) => item.id) : []);
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  // Handle quantity change
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Cập nhật số lượng giỏ hàng qua API
      const updatedCartItem = await updateQuantityInCart(itemId, newQuantity);

      // Cập nhật giỏ hàng trong state
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: updatedCartItem.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Có lỗi khi cập nhật giỏ hàng:", error);
    }
  };

  // Handle individual item selection
  const handleItemSelect = (itemId) => {
    setSelectedItems((prev) => {
      const newSelected = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];

      // Update select all checkbox state
      setSelectAll(newSelected.length === cartItems.length);

      return newSelected;
    });
  };

  const handleCheckout = () => {
    // Get all selected items based on selected IDs
    const checkoutItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    // Save selected items to localStorage
    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));

    // Navigate to checkout page
    navigate("/checkout");
  };

  return {
    cartItems,
    setCartItems,
    selectedItems,
    setSelectedItems,
    selectAll,
    setSelectAll,
    totalPrice,
    handleSelectAll,
    handleDeleteItem,
    handleQuantityChange,
    handleItemSelect,
    handleCheckout,
    notifyCartUpdated,
  };
};
