import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createVnpayOrder,
  createCodOrder,
  formatVnpayOrderData,
  formatCodOrderData,
} from "../api/paymentService";

import { clearCartAfterPayment } from "../api/cartService";
import { verifyTokenValidity } from "../utils/auth";

export const useCheckout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    products: [],
    shipping: {
      fullName: "",
      address: "",
      phone: "",
      email: "",
      note: "",
    },
    paymentMethod: "COD",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: value,
      },
    }));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      ),
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  const calculateTotal = () => {
    const total = formData.products.reduce((total, product) => {
      return total + product.product?.original_price * product.quantity;
    }, 0);
    return Math.round(total); // ✅ Làm tròn tại đây
  };

  const validateForm = () => {
    const { shipping } = formData;
    if (
      !shipping.fullName ||
      !shipping.address ||
      !shipping.phone ||
      !shipping.email
    ) {
      setError("Vui lòng điền đầy đủ thông tin giao hàng");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      setError("Email không hợp lệ");
      return false;
    }
    if (!/^\d{10,11}$/.test(shipping.phone.replace(/\D/g, ""))) {
      setError("Số điện thoại không hợp lệ");
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const isValid = await verifyTokenValidity();
      if (!isValid) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    checkAuth();

    // Read checkout items from localStorage
    const checkoutItems = JSON.parse(
      localStorage.getItem("checkoutItems") || "[]"
    );

    // If no items in checkout, redirect back to cart
    if (checkoutItems.length === 0) {
      navigate("/cart");
      return;
    }

    // Set products with quantity from checkout items
    setFormData((prev) => ({
      ...prev,
      products: checkoutItems,
    }));

    // Cleanup function that runs when component unmounts
    return () => {
      // Remove checkoutItems from localStorage when user leaves the page
      localStorage.removeItem("checkoutItems");
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) return;

    // Verify token validity before proceeding
    const isTokenValid = await verifyTokenValidity();
    if (!isTokenValid) {
      setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === "VNPAY") {
        // Create data for VNPAY order
        const vnpayOrderData = formatVnpayOrderData({
          totalAmount: calculateTotal(),
          shipping: formData.shipping,
          products: formData.products,
        });

        // Call VNPAY API
        const response = await createVnpayOrder(vnpayOrderData);

        // Handle VNPAY response with payment URL
        if (response && response.payment_url) {
          // Redirect to VNPAY payment gateway
          window.location.href = response.payment_url;
          return; // Stop execution after redirect
        } else {
          throw new Error("No payment URL received from VNPAY");
        }
      } else {
        // Handle COD payment
        const codOrderData = formatCodOrderData({
          totalAmount: calculateTotal(),
          shipping: formData.shipping,
          products: formData.products,
        });

        // Call COD order API
        const response = await createCodOrder(codOrderData);

        // Clear cart after successful COD order
        await clearCartAfterPayment();

        // Navigate to success page with order ID
        navigate("/order-success", {
          state: {
            orderId: response.order_id || response.id,
            paymentMethod: "COD",
            totalAmount: calculateTotal(),
          },
        });
      }
    } catch (err) {
      console.error("Order error:", err);

      // Handle different types of errors
      if (
        err.message === "Authentication token not found. Please log in again."
      ) {
        setError(
          "Bạn cần đăng nhập lại để tiếp tục. Phiên đăng nhập đã hết hạn."
        );
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (err.response && err.response.status === 401) {
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (err.response && err.response.data && err.response.data.error) {
        // Show specific error message from API
        setError(err.response.data.error);
      } else {
        setError("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    handlePaymentMethodChange,
    handleInputChange,
    handleQuantityChange,
    success,
    error,
    isSubmitting,
    formData,
    calculateTotal,
  };
}; // hook scope
