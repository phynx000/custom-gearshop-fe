import React, { useState, useEffect } from "react";
import "./Cart.scss";
import "../../services/cartService";
import { getAllCartItem } from "../../services/cartService";
import { useCart } from "../../hook/useCart";

const Cart = () => {
  const {
    cartItems,
    selectedItems,
    selectAll,
    totalPrice,
    handleSelectAll,
    handleDeleteItem,
    handleQuantityChange,
    handleItemSelect,
    handleCheckout,
  } = useCart();

  console.log("cartitems: ...", cartItems);

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Trống</p>
        </div>
      ) : (
        <>
          <div className="cart-header">
            <div className="select-all">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                id="select-all"
              />
              <label htmlFor="select-all">Chọn tất cả</label>
            </div>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-select">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleItemSelect(item.id)}
                  />
                </div>

                <div className="item-image">
                  <img src={item.product.images[0].image} alt={item.name} />
                </div>
                {/* {console.log(item.product.images[0])} */}
                <div className="item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="price">
                    {/* format gía tiên thành vnd */}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.product?.original_price)}
                  </p>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
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
                  }).format(
                    (item.product?.original_price * item.quantity).toFixed(0)
                  )}
                </div>

                <button
                  className="delete-button"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="selected-items">
              Sản phẩm đã chọn: {selectedItems.length}
            </div>
            <div className="total-price">
              Tổng cộng:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice.toFixed(0))}{" "}
            </div>
            <button
              className="checkout-button"
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
