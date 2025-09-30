import { fromatMoney } from "../utils/money";
import "./CheckoutPage.css";
import "./checkout-header.css";
import { Link } from "react-router-dom";
export function CheckoutPage({ cart }) {
  return (
    <>
      <title>Checkout</title>
      <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section">
            <Link to="/">
              <img class="logo" src="images/logo.png" />
              <img class="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div class="checkout-header-middle-section">
            Checkout (
            <a class="return-to-home-link" href="/">
              {cart.items}
            </a>
            )
          </div>

          <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div class="checkout-page">
        <div class="page-title">Review your order</div>

        <div class="checkout-grid">
          <div class="order-summary">
            {cart.map((cartItem) => {
              return (
                <div key={cartItem.productId} class="cart-item-container">
                  <div className="delivery-date">
                    {new Date(cartItem.createdAt).toLocaleDateString("en-US", {
                      weekday: "long", // e.g. Monday
                      year: "numeric", // e.g. 2025
                      month: "long", // e.g. September
                      day: "numeric",
                    })}
                  </div>

                  <div class="cart-item-details-grid">
                    <img
                      class="product-image"
                      src={cartItem.product.image}
                    />

                    <div class="cart-item-details">
                      <div class="product-name">
                       {cartItem.product.name}
                      </div>
                      <div class="product-price">{fromatMoney(cartItem.product.priceCents)}</div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                          Update
                        </span>
                        <span class="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      <div class="delivery-option">
                        <input
                          type="radio"
                          checked
                          class="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div class="delivery-option-date">
                            Tuesday, June 21
                          </div>
                          <div class="delivery-option-price">FREE Shipping</div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input
                          type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div class="delivery-option-date">
                            Wednesday, June 15
                          </div>
                          <div class="delivery-option-price">
                            $4.99 - Shipping
                          </div>
                        </div>
                      </div>
                      <div class="delivery-option">
                        <input
                          type="radio"
                          class="delivery-option-input"
                          name="delivery-option-1"
                        />
                        <div>
                          <div class="delivery-option-date">
                            Monday, June 13
                          </div>
                          <div class="delivery-option-price">
                            $9.99 - Shipping
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div class="payment-summary">
            <div class="payment-summary-title">Payment Summary</div>

            <div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
