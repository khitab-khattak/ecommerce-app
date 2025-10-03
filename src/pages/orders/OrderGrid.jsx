import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export function OrderGrid({ orders, loadCart }) {
  const addToCart = async (productId, quantity) => {
    await axios.post("/api/cart-items", {
      productId,
      quantity,
    });
    await loadCart();
  };

  return (
    <div className="orders-grid">
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
                  <img src={orderProduct.product.image} alt={orderProduct.product.name}/>
                </div>

                <div className="product-details">
                  <div className="product-name">{orderProduct.product.name}</div>
                  <div className="product-delivery-date">
                    Arriving on:{" "}
                    {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
                  </div>
                  <div className="product-quantity">
                    Quantity: {orderProduct.quantity}
                  </div>
                  <button
                    className=" add-to-cart-btn"
                  
                  >
                    <img
                      className="buy-again-icon"
                      src="images/icons/buy-again.png"
                      alt="buy again"
                    />
                    <span className="buy-again-message"  onClick={() =>
                      addToCart(orderProduct.product.id, orderProduct.quantity)
                    } >Add to Cart</span>
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
