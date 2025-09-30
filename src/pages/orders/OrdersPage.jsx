import "./orders.css";
import { Header } from "../../components/Header";
import { Link } from "react-router";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { OrderGrid } from "./OrderGrid";
export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);

  return (
    <>
      <title>Orders</title>
      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

      <OrderGrid orders= {orders}/>
      </div>
    </>
  );
}
