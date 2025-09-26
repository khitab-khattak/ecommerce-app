import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/CheckoutPage";
import { TrackingPage } from "./pages/TrackingPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="checkout" element={<CheckoutPage/>}/>
        <Route path="tracking" element={<TrackingPage/>}/>
        <Route path="orders" element={<OrdersPage/>}/>
        <Route/>
      </Routes>
    </>
  );
}

export default App;
