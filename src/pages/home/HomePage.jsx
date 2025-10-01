import "./HomePage.css";
import axios from "axios";
import { useEffect,useState } from "react";
import { Header } from "../../components/Header";
import { ProductGrid } from "./ProductGrid";

export function HomePage({cart,loadCart}) {
  const [products, setProducts] = useState([]);
 
  useEffect( ()=>{
    let getHomeData = async()=>{
      const response = await axios.get("/api/products");
      setProducts(response.data)
    }
    getHomeData();
  },[]);
  
 
  return (
    <>
      <title>Home</title>
      <Header cart = {cart} />

      <div className="home-page">
       <ProductGrid products={products} loadCart = {loadCart}/>
      </div>
    </>
  );
}
