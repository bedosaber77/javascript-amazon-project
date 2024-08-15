import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getProductById } from "./services/findProduct.js";
import { MakeOrder } from "./services/MakeOrder.js";
import { getFromLocalStorge,countCart } from "./data/cart.js";
import { getOrders } from "./data/orders.js";

const orders = getOrders();
let itemsnum = countCart();


renderOrdersPage(orders);



export function renderOrdersPage(orders) {
    console.log(orders);
        orders.forEach((order) => {
            let header = ` <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${((order.totalCostCents / 100)).toFixed(2)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>
    `
            let html = renderOrder(order);

            document.querySelector(".orders-grid").innerHTML = `<div class="order-container">` + header + html + `</div>` + document.querySelector(".orders-grid").innerHTML;
        });
}

function renderOrder(orderDetails) {
    let html = '';
    orderDetails.products.forEach((product) => {
        let prod = getProductById(product.productId);
        html += ` <div class="product-image-container">
        <img src="${prod.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${prod.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${dayjs(product.estimatedDeliveryTime).format("MMMM D")}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>`
    });
    return `<div class=order-details-grid>` + html + "</div>"
}
document.querySelector(".cart-quantity").textContent = itemsnum;