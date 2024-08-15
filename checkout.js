import { getFromLocalStorge } from "../data/cart.js";
import { countCart, removeFromCart, UpdateCart, updateCartElement, updateCartItemDeliveryOption } from "./data/cart.js";
import { deliveryOptions } from "./data/deliveryOptions.js";
import { getProductById } from "./services/findProduct.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { MakeOrder } from "./services/MakeOrder.js";
import { getOrders, saveOrder } from "./data/orders.js";
//import { renderOrdersPage } from "./Orders.js";


let cart = getFromLocalStorge();
let itemsnum = countCart();
let Today = dayjs();

document.querySelector(".return-to-home-link").textContent = `${itemsnum} items`
console.log(cart);
const order = document.querySelector(".order-summary");

CalcOrder();

cart.forEach(cartItem => {
  let matchingProduct = getProductById(cartItem.productId);
  order.innerHTML += `<div class="cart-item-container a${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${(Today.add(deliveryOptions[cartItem.deliveryOptionid].deliveryDays, "day")).format("dddd, MMMM D")}
        </div>
    
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
    
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-${matchingProduct.id}" data-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-input-${matchingProduct.id}" hidden data-id="${matchingProduct.id}" type="number" min="1" max="10" value='1'> 
              <span class="save-quantity-link link-primary js-save-${matchingProduct.id}" hidden data-id="${matchingProduct.id}" >Save</span>
              <span class="delete-quantity-link link-primary" data-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
    
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionid === 0 ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-option="0">
              <div>
                <div class="delivery-option-date">
                  ${(Today.add(7, 'day')).format("dddd, MMMM D")}
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionid === 1 ? "checked" : ""}  class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-option="1">
              <div>
                <div class="delivery-option-date">
                ${(Today.add(3, 'day')).format("dddd, MMMM D")}
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" ${cartItem.deliveryOptionid === 2 ? "checked" : ""} class="delivery-option-input" name="delivery-option-${matchingProduct.id}" data-option="2">
              <div>
                <div class="delivery-option-date">
                ${(Today.add(1, 'day')).format("dddd, MMMM D")}
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  console.log(matchingProduct);
});



function updateCheckoutHeader() {
  itemsnum = countCart();
  document.querySelector(".return-to-home-link").textContent = `${itemsnum} items`
}

document.querySelectorAll(".delete-quantity-link").forEach(btn => {
  btn.addEventListener('click', event => {
    console.log(btn.dataset.id);
    removeFromCart(btn.dataset.id);
    updateCheckoutHeader();
    CalcOrder();
    order.querySelector(`.a${btn.dataset.id}`).remove();
  })
});

document.querySelectorAll(".update-quantity-link").forEach(btn => {
  btn.addEventListener('click', (event) => {
    document.querySelector(`.js-update-${btn.dataset.id}`).setAttribute("hidden", "");
    document.querySelector(`.js-save-${btn.dataset.id}`).removeAttribute("hidden");
    document.querySelector(`.js-input-${btn.dataset.id}`).removeAttribute("hidden");
  })
})

document.querySelectorAll(".save-quantity-link").forEach(btn => {
  btn.addEventListener('click', (event) => {
    let value = document.querySelector(`.js-input-${btn.dataset.id}`).value
    if (value) {
      updateCartElement(btn.dataset.id, parseInt(value));
      document.querySelector(`.js-quantity-${btn.dataset.id}`).textContent = value;
      updateCheckoutHeader();
      CalcOrder();
    }
    document.querySelector(`.js-update-${btn.dataset.id}`).removeAttribute("hidden", "");
    document.querySelector(`.js-save-${btn.dataset.id}`).setAttribute("hidden", "");
    document.querySelector(`.js-input-${btn.dataset.id}`).setAttribute("hidden", "");
  })
})

document.querySelectorAll(".delivery-option-input").forEach(input => {
  input.addEventListener('click', event => {
    const id = input.name.slice(16);
    console.log(updateCartItemDeliveryOption(id, input.dataset.option));
    cart = getFromLocalStorge();
    console.log(cart);
    order.querySelector(`.a${id}`).querySelector(".delivery-date").textContent =
      `Delivery date: ${(Today.add(deliveryOptions[input.dataset.option].deliveryDays, "day")).format("dddd, MMMM D")}`;
    CalcOrder();
  });
});

function CalcOrder() {
  let totalPrice = 0;
  let totalOrder = 0;
  cart = getFromLocalStorge();
  if (cart.length > 0) {
    cart.forEach(cartItem => {
      let product = getProductById(cartItem.productId);
      totalPrice += product.priceCents * cartItem.quantity;
      totalOrder += deliveryOptions[cartItem.deliveryOptionid].deliveryPrice;
    });
  }
  const paymentRows = document.querySelectorAll(".payment-summary-row");
  let total = totalOrder + totalPrice;
  console.log(totalPrice);

  paymentRows[0].querySelector("div").innerText = `Items (${itemsnum}):`
  paymentRows[0].querySelector(".payment-summary-money").textContent = `$${(totalPrice / 100).toFixed(2)}`;
  paymentRows[1].querySelector(".payment-summary-money").textContent = `$${(totalOrder / 100).toFixed(2)}`;
  paymentRows[2].querySelector(".payment-summary-money").textContent = `$${(total / 100).toFixed(2)}`;
  paymentRows[3].querySelector(".payment-summary-money").textContent = `$${(total * 0.1 / 100).toFixed(2)}`;
  paymentRows[4].querySelector(".payment-summary-money").textContent = `$${(Math.round(total * 1.1) / 100).toFixed(2)}`;
}

document.querySelector(".place-order-button").addEventListener('click', async () => {
  const orderDetails = await MakeOrder(cart);
  saveOrder(orderDetails);
  console.log(getOrders());
  localStorage.removeItem('cart');
  location.pathname = '/orders.html';
});