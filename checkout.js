import { getFromLocalStorge } from "../data/cart.js";
import { getProductById } from "./services/findProduct.js";

let cart = getFromLocalStorge();
document.querySelector(".return-to-home-link").textContent=`${cart.length} items`
console.log(cart);
const order = document.querySelector(".order-summary");
cart.forEach(cartItem => {
    let matchingProduct = getProductById(cartItem.id);

    console.log(matchingProduct);
});