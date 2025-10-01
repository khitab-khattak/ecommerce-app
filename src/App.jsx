import { HomePage } from "./pages/home/HomePage";
import { Routes, Route } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart = {loadCart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage cart={cart} />} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
