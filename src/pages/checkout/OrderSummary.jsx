import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import { DeliveryOption } from "./DeliveryOption";
export function OrderSummary({deliveryOptions,cart}){
    return (
        <div class="order-summary">
        {deliveryOptions.length > 0 &&
          cart.map((cartItem) => {
            const selectedDeliveryOption = deliveryOptions.find(
              (deliveryOption) => {
                return deliveryOption.id === cartItem.deliveryOptionId;
              }
            );
            return (
              <div key={cartItem.productId} class="cart-item-container">
                <div className="delivery-date">
                  Delivery date:{" "}
                  {dayjs(
                    selectedDeliveryOption.estimatedDeliveryTimeMs
                  ).format("dddd, MMMM, D")}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image" src={cartItem.product.image} />

                  <div class="cart-item-details">
                    <div class="product-name">{cartItem.product.name}</div>
                    <div class="product-price">
                      {formatMoney(cartItem.product.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity:{" "}
                        <span class="quantity-label">
                          {cartItem.quantity}
                        </span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary">
                        Delete
                      </span>
                    </div>
                  </div>

                 <DeliveryOption deliveryOptions={deliveryOptions} cartItem={cartItem}/>
                </div>
              </div>
            );
          })}
      </div>
    )
}