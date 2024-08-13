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
        if (cartitem.id == productId) {
            cartitem.quantity += parseInt(document.querySelector(`.quantity-selector-${cartitem.id}`).value);
            flag = true;
        }
    }
    if (!flag) {
        cart.push({
            id: productId,
            quantity: parseInt(document.querySelector(`.quantity-selector-${productId}`).value)
        });
    }
    SaveTolocalStorge();
}
export function removeFromCart(id) {
    cart = cart.filter(elem => elem.id != id);
    console.log(cart);
    SaveTolocalStorge();
}
function SaveTolocalStorge() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function getFromLocalStorge() {
    return JSON.parse(localStorage.getItem('cart'));
}