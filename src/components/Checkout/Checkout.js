import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { useNavigate } from "react-router-dom";
import {
  createVnpayOrder,
  createCodOrder,
  formatVnpayOrderData,
} from "../../services/paymentService";
import { clearCartAfterPayment } from "../../services/cartService";
import { verifyTokenValidity } from "../../utils/auth";

const Checkout = () => {
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
        const codOrderData = {
          products: formData.products.map(({ id, quantity }) => ({
            id,
            quantity,
          })),
          shipping: formData.shipping,
          paymentMethod: formData.paymentMethod,
          totalAmount: calculateTotal(),
        };

        // Call COD order API
        await createCodOrder(codOrderData);

        // Clear cart after successful COD order
        await clearCartAfterPayment();

        setSuccess(true);
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

  return (
    <div className="checkout-container">
      <h2>Đặt hàng</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Products Section */}
        <div className="form-section">
          <h3>Sản phẩm</h3>
          <div className="products-list">
            {formData.products.map((item) => (
              <div key={item.id} className="product-item">
                <img
                  src={item.product.images[0].image}
                  alt={item.product.name}
                />
                <div className="product-details">
                  <h4>{item.product.name}</h4>
                  <p className="price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.product.original_price)}
                  </p>
                </div>
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.product.original_price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="total-amount">
              Tổng tiền:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(calculateTotal())}
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="form-section">
          <h3>Thông tin giao hàng</h3>
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.shipping.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ *</label>
            <textarea
              id="address"
              name="address"
              value={formData.shipping.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.shipping.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.shipping.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Ghi chú</label>
            <textarea
              id="note"
              name="note"
              value={formData.shipping.note}
              onChange={handleInputChange}
              placeholder="Ghi chú cho đơn hàng (tùy chọn)"
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="form-section">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-methods">
            <div className="payment-method">
              <input
                type="radio"
                id="cod"
                name="paymentMethod"
                value="COD"
                checked={formData.paymentMethod === "COD"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
            </div>

            <div className="payment-method">
              <input
                type="radio"
                id="vnpay"
                name="paymentMethod"
                value="VNPAY"
                checked={formData.paymentMethod === "VNPAY"}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="vnpay">Thanh toán qua VNPAY</label>

              {formData.paymentMethod === "VNPAY" && (
                <div className="payment-info">
                  <p>
                    Bạn sẽ được chuyển đến cổng thanh toán VNPAY để hoàn tất
                    giao dịch sau khi nhấn "Hoàn tất đặt hàng".
                  </p>
                  <div className="vnpay-logo">
                    <img
                      src="/images/vnpay-logo.png"
                      alt="VNPAY"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            Đặt hàng thành công! Cảm ơn bạn đã mua sắm.
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting || formData.products.length === 0}
        >
          {isSubmitting
            ? "Đang xử lý..."
            : formData.paymentMethod === "VNPAY"
            ? "Tiến hành thanh toán qua VNPAY"
            : "Hoàn tất đặt hàng"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
