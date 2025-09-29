import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/CheckoutPage";
import { TrackingPage } from "./pages/TrackingPage";
import { OrdersPage } from "./pages/OrdersPage";
import { useEffect , useState } from "react";
import axios from "axios";

function App() {
  const [cart , setCart] = useState([]);
  useEffect(()=>{
    axios.get('/api/cart-items').then((response)=>{
      setCart(response.data)
    })
  },[])
 
  return (
    <>
      <Routes>
        <Route index element={<HomePage cart = {cart}/>}/>
        <Route path="checkout" element={<CheckoutPage cart={cart}/>}/>
        <Route path="tracking" element={<TrackingPage/>}/>
        <Route path="orders" element={<OrdersPage/>}/>
        <Route/>
      </Routes>
    </>
  );
}

export default App;
