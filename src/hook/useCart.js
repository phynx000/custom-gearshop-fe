import { useState, useEffect, useCallback } from "react";
import {
  getAllCartItem,
  updateQuantityInCart,
  removeFromCart,
} from "../services/cartService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);

  // Notify about cart changes
  const notifyCartUpdated = () => {
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const removeItemFromCart = useCallback(
    async (itemId) => {
      try {
        setLoading(true);

        await removeFromCart(itemId);

        // Cập nhật cart local sau khi xóa thành công
        if (cart) {
          const updatedItems = cart.items.filter((item) => item.id !== itemId);
          const updatedCart = {
            ...cart,
            items: updatedItems,
            total_price: updatedItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
            total_items: updatedItems.reduce(
              (sum, item) => sum + item.quantity,
              0
            ),
          };
          setCart(updatedCart);
        }

        return { success: true };
      } catch (error) {
        console.error("Có lỗi xảy ra khi xóa sản phẩm:", error);
        return { success: false, error: error.message };
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

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

  // Tính lại tổng tiền
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
  const handleDeleteItem = async (itemId) => {
    try {
      setLoading(true);

      // Gọi API để xóa sản phẩm khỏi giỏ hàng
      await removeFromCart(itemId);

      // Cập nhật state local sau khi xóa thành công
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      setSelectedItems((prev) => prev.filter((id) => id !== itemId));

      // Hiển thị thông báo thành công
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");

      // Notify cart updated
      notifyCartUpdated();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);

      // Show specific error message
      const errorMessage = error.message || "Có lỗi xảy ra khi xóa sản phẩm";
      toast.error(errorMessage);

      // If authentication error, potentially redirect to login
      if (errorMessage.includes("đăng nhập")) {
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
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
    loading,
    handleSelectAll,
    handleDeleteItem,
    handleQuantityChange,
    handleItemSelect,
    handleCheckout,
    removeItemFromCart,
    notifyCartUpdated,
    cart,
  };
};
