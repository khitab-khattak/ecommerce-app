import "./CheckoutPage.css";
import "./checkout-header.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
export function CheckoutPage({ cart }) {
  let totalQuantity = 0;
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState([null]);

  useEffect(() => {
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
  }, []);

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
              {totalQuantity}
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
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} />
          <PaymentSummary paymentSummary={paymentSummary}/>
        </div>
      </div>
    </>
  );
}
