export let cart = getFromLocalStorge();
if (!cart) {
    cart = [];
}
export function UpdateCart() {
    let cartQuantity = document.querySelector(".cart-quantity");
    let q = 0;
    cart.forEach(element => {
        q += element.quantity;
    })
    cartQuantity.innerText = q;
}
export function countCart() {
    let q = 0;
    cart.forEach(element => {
        q += element.quantity;
    })
    return q;
}
export function addtoCart(productId) {
    let flag = false;
    for (let cartitem of cart) {
        if (cartitem.productId == productId) {
            cartitem.quantity += parseInt(document.querySelector(`.quantity-selector-${cartitem.productId}`).value);
            flag = true;
        }
    }
    if (!flag) {
        cart.push({
            productId: productId,
            quantity: parseInt(document.querySelector(`.quantity-selector-${productId}`).value),
            deliveryOptionid: 0
        });
    }
    SaveTolocalStorge();
}
export function removeFromCart(id) {
    cart = cart.filter(elem => elem.productId != id);
    console.log(cart);
    SaveTolocalStorge();
}
function SaveTolocalStorge() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function getFromLocalStorge() {
    return JSON.parse(localStorage.getItem('cart'));
}

export function updateCartElement(id, value) {
    cart.forEach(cartItem => {
        if (cartItem.productId == id)
            cartItem.quantity = value;
    });
    SaveTolocalStorge();
}

export function updateCartItemDeliveryOption(itemid, deliveryoption) {
    let f = false
    cart.forEach(cartItem => {
        if (cartItem.productId == itemid) {
            cartItem.deliveryOptionid = parseInt(deliveryoption);
            f = true;
        }
    });
    SaveTolocalStorge();
    return f;
}