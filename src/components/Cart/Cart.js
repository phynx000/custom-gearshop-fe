import React, { useState, useEffect } from "react";
import "./Cart.scss";
import "../../services/cartService";
import { getAllCartItem } from "../../services/cartService";
import { data } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    getAllCartItem().then((data) => {
      setCartItems(Array.isArray(data) ? data : []);
    });
  }, []);

  console.log("cartitems: ...", cartItems);

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

  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Handle item deletion
  const handleDeleteItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

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
                {console.log(item.product.images[0])}
                <div className="item-details">
                  <h3>{item.product?.name}</h3>
                  <p className="price">
                    $
                    {item.product?.original_price
                      ? item.product?.original_price
                      : "0.00"}
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
                  ${(item.product?.original_price * item.quantity).toFixed(2)}
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
              Selected Items: {selectedItems.length}
            </div>
            <div className="total-price">Total: ${totalPrice.toFixed(2)}</div>
            <button
              className="checkout-button"
              disabled={selectedItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
