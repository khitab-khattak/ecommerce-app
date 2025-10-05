import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOption } from "./DeliveryOption";
import axios from "axios";
import { useState } from "react";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [quantities, setQuantities] = useState(
    Object.fromEntries(cart.map((item) => [item.productId, item.quantity]))
  );

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`/api/cart-items/${productId}`);
      await loadCart();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const changeQuantity = (productId, delta) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const newQty = Math.max(1, current + delta);
      return { ...prev, [productId]: newQty };
    });
  };

  const handleUpdateQuantity = async (productId) => {
    const newQuantity = quantities[productId];
    try {
      setUpdatingItemId(productId);
      await axios.put(`/api/cart-items/${productId}`, { quantity: newQuantity });
      await loadCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setUpdatingItemId(null);
    }
  };

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) =>
              deliveryOption.id === cartItem.deliveryOptionId
          );

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {selectedDeliveryOption
                  ? dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                      "dddd, MMMM D"
                    )
                  : "N/A"}
              </div>

              <div className="cart-item-details-grid">
                <img
                  className="product-image"
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>

                  {/* --- Improved Quantity Section --- */}
                  <div className="product-quantity">
                    <span className="quantity-label">Quantity:</span>

                    <div className="quantity-control">
                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(cartItem.productId, -1)}
                        disabled={updatingItemId === cartItem.productId}
                      >
                        –
                      </button>

                      <input
                        type="text"
                        className="quantity-input"
                        value={quantities[cartItem.productId] || ""}
                        readOnly
                      />

                      <button
                        className="quantity-btn"
                        onClick={() => changeQuantity(cartItem.productId, 1)}
                        disabled={updatingItemId === cartItem.productId}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="update-btn"
                      onClick={() => handleUpdateQuantity(cartItem.productId)}
                      disabled={updatingItemId === cartItem.productId}
                    >
                      {updatingItemId === cartItem.productId
                        ? "Updating..."
                        : "Update"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(cartItem.productId)}
                      disabled={updatingItemId === cartItem.productId}
                    >
                      Delete
                    </button>
                  </div>
                  {/* --- End Quantity Section --- */}
                </div>

                <DeliveryOption
                  deliveryOptions={deliveryOptions}
                  loadCart={loadCart}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
