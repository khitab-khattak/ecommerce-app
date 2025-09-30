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
  useEffect(() => {
    axios.get("/api/cart-items?expand=product").then((response) => {
      setCart(response.data);
    });
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<HomePage cart={cart} />} />
        <Route path="checkout" element={<CheckoutPage cart={cart} />} />
        <Route path="tracking" element={<TrackingPage cart={cart}/>} />
        <Route path="orders" element={<OrdersPage cart={cart} />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
