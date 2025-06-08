import React, { useState } from "react";
import "./Cart.scss";
import { useCart } from "../../../hook/useCart";

const Cart = () => {
  const {
    cartItems,
    selectedItems,
    selectAll,
    totalPrice,
    loading,
    handleSelectAll,
    handleDeleteItem,
    handleQuantityChange,
    handleItemSelect,
    handleCheckout,
  } = useCart();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      if (itemToDelete.isMultiple) {
        // Xóa nhiều sản phẩm
        await handleConfirmDeleteSelected();
      } else {
        // Xóa một sản phẩm
        await handleDeleteItem(itemToDelete.id);
        setShowDeleteModal(false);
        setItemToDelete(null);
      }
    }
  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length > 0) {
      setShowDeleteModal(true);
      setItemToDelete({ isMultiple: true, count: selectedItems.length });
    }
  };
  const handleConfirmDeleteSelected = async () => {
    try {
      const totalItems = selectedItems.length;
      let deletedCount = 0;

      // Xóa tất cả sản phẩm đã chọn tuần tự với feedback
      for (const itemId of selectedItems) {
        await handleDeleteItem(itemId);
        deletedCount++;

        // Update progress (optional: could show progress in modal)
        console.log(`Đã xóa ${deletedCount}/${totalItems} sản phẩm`);
      }

      setShowDeleteModal(false);
      setItemToDelete(null);

      // Show success message for bulk deletion
      if (deletedCount === totalItems) {
        console.log(`Đã xóa thành công ${deletedCount} sản phẩm khỏi giỏ hàng`);
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

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
          {" "}
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
            {selectedItems.length > 0 && (
              <button
                className="btn btn-danger btn-sm"
                onClick={handleDeleteSelected}
                disabled={loading}
              >
                <i className="bi bi-trash me-2"></i>
                Xóa sản phẩm đã chọn ({selectedItems.length})
              </button>
            )}
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
                </div>{" "}
                <button
                  className="delete-button"
                  onClick={() => confirmDelete(item)}
                  disabled={loading}
                >
                  {loading ? (
                    <i className="bi bi-arrow-repeat spinner"></i>
                  ) : (
                    <i className="bi bi-trash"></i>
                  )}
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
            </button>{" "}
          </div>
        </>
      )}

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="modal-overlay">
          {" "}
          <div className="modal-content">
            <h3>Xác nhận xóa</h3>
            <p>
              {itemToDelete?.isMultiple
                ? `Bạn có chắc chắn muốn xóa ${itemToDelete.count} sản phẩm đã chọn khỏi giỏ hàng không?`
                : `Bạn có chắc chắn muốn xóa sản phẩm "${itemToDelete?.product?.name}" khỏi giỏ hàng không?`}
            </p>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={handleCancelDelete}
                disabled={loading}
              >
                Hủy
              </button>
              <button
                className="btn btn-danger"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="bi bi-arrow-repeat spinner me-2"></i>
                    Đang xóa...
                  </>
                ) : (
                  "Xóa"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
