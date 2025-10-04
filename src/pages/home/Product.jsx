import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";

export function Product({ products, loadCart }) {

  const [quantity, setQuantity] = useState(1);
  const addToCart = async() => {
    await  axios
        .post("/api/cart-items", {
          productId: products.id,
          quantity: quantity,
        })
          await loadCart();
    }
    const selectedQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
        console.log(quantitySelected);
      }
  return (
    <div key={products.id} className="product-container">
      <div className="product-image-container">
        <img className="product-image" data-testid="product-image-test" src={products.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">{products.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars" data-testid="product-rating-image-test"
          src={`images/ratings/rating-${products.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {products.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(products.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectedQuantity}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        onClick={ addToCart }
        className="add-to-cart-button button-primary"
      >
        Add to Cart
      </button>
    </div>
  );
}
