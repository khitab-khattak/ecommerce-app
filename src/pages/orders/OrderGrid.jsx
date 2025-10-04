import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export function OrderGrid({ orders, loadCart }) {
  const [error, setError] = useState(null);

  const addToCart = async (productId, quantity) => {
    const validQuantity = Math.min(Math.max(quantity || 1, 1), 10);

    try {
      await axios.post("/api/cart-items", {
        productId,
        quantity: validQuantity,
      });
      await loadCart();
      setError(null); // clear any previous error
    } catch (err) {
      const message = err.response?.data?.error || "Failed to add product.";
      setError(`Product ${productId}: ${message}`);
    }
  };

  return (
    <div className="orders-grid">
      {error && (
        <div className="order-error" style={{ color: "red", marginBottom: "10px" }}>
          {error}
        </div>
      )}

      {orders.map((order) => (
        <div key={order.id} className="order-container">
          {/* Order Header */}
          <div className="order-header">
            <div className="order-header-left-section">
              <div className="order-date">
                <div className="order-header-label">Order Placed:</div>
                <div>{dayjs(order.orderTimeMs).format("dddd, MMMM D")}</div>
              </div>
              <div className="order-total">
                <div className="order-header-label">Total:</div>
                <div>{formatMoney(order.totalCostCents)}</div>
              </div>
            </div>
            <div className="order-header-right-section">
              <div className="order-header-label">Order ID:</div>
              <div>{order.id}</div>
            </div>
          </div>

          {/* Order Products */}
          <div className="order-details-grid">
            {order.products.map((orderProduct) => (
              <Fragment key={orderProduct.product.id}>
                <div className="product-image-container">
                  <img
                    src={orderProduct.product.image}
                    alt={orderProduct.product.name}
                  />
                </div>

                <div className="product-details">
                  <div className="product-name">{orderProduct.product.name}</div>
                  <div className="product-delivery-date">
                    Arriving on:{" "}
                    {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                      "dddd, MMMM D"
                    )}
                  </div>
                  <div className="product-quantity">
                    Quantity: {orderProduct.quantity}
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() =>
                      addToCart(orderProduct.product.id, orderProduct.quantity)
                    }
                  >
                    <img
                      className="buy-again-icon"
                      src="images/icons/buy-again.png"
                      alt="buy again"
                    />
                    <span className="buy-again-message">Add to Cart</span>
                  </button>
                </div>

                <div className="product-actions">
                  <Link to="/tracking">
                    <button className="track-package-button button-secondary">
                      Track package
                    </button>
                  </Link>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

