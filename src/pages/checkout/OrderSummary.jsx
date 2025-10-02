import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOption } from "./DeliveryOption";
import axios from "axios";
export function OrderSummary({deliveryOptions,cart,loadCart}){
    return (
        <div className="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
            );
            const cartItemDelete = async()=>{
              await axios.delete(`/api/cart-items/${cartItem.productId}`);
              await loadCart();
            }
            return (
              <div key={cartItem.productId} className="cart-item-container">
                <div className="delivery-date">
                  Delivery date:{" "}
                  {dayjs(
                    selectedDeliveryOption.estimatedDeliveryTimeMs
                  ).format("dddd, MMMM, D")}
                </div>

                <div className="cart-item-details-grid">
                  <img className="product-image" src={cartItem.product.image} />

                  <div className="cart-item-details">
                    <div className="product-name">{cartItem.product.name}</div>
                    <div className="product-price">
                      {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div className="product-quantity">
                      <span>
                        Quantity:{" "}
                        <span className="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                      <span className="update-quantity-link link-primary">
                        Update
                      </span>
                      <span className="delete-quantity-link link-primary" onClick={cartItemDelete}>
                        Delete
                      </span>
                    </div>
                  </div>

                 <DeliveryOption deliveryOptions={deliveryOptions} loadCart={loadCart} cartItem={cartItem}/>
                </div>
              </div>
            );
          })}
      </div>
    )
}