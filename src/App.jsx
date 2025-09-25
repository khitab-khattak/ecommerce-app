import { HomePage } from "./pages/HomePage";
import { Routes, Route } from "react-router";
import "./App.css";
import { CheckoutPage } from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="checkout" element={<CheckoutPage/>}/>
        <Route/>
      </Routes>
    </>
  );
}

export default App;
