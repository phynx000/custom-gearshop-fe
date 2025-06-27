import React, { useState, useEffect } from "react";
import "./Checkout.scss";
import { useCheckout } from "../../../hook/useCheckout";

const Checkout = () => {
  const {
    handleSubmit,
    handlePaymentMethodChange,
    handleInputChange,
    handleQuantityChange,
    success,
    error,
    isSubmitting,
    formData,
    calculateTotal,
  } = useCheckout();

  return (
    <div className="checkout-container">
      <h2>Đặt hàng</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Products Section */}
        <div className="form-section">
          <h3>🛍️ Sản phẩm</h3>
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
          <h3>🚚 Thông tin giao hàng</h3>
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
          <h3>💳 Phương thức thanh toán</h3>
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
              <label htmlFor="cod">🚚 Thanh toán khi nhận hàng (COD)</label>
              {formData.paymentMethod === "COD" && (
                <div className="payment-info">
                  <p>
                    Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng. Phí giao hàng
                    sẽ được tính thêm nếu có.
                  </p>
                  <div
                    style={{
                      color: "#27ae60",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    ✅ An toàn - Thuận tiện - Đáng tin cậy
                  </div>
                </div>
              )}
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
              <label htmlFor="vnpay">💳 Thanh toán qua VNPAY</label>

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
          {isSubmitting ? (
            <span>
              <span className="loading-spinner"></span>
              Đang xử lý...
            </span>
          ) : formData.paymentMethod === "VNPAY" ? (
            "Tiến hành thanh toán qua VNPAY"
          ) : (
            "Hoàn tất đặt hàng"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
