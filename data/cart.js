export const cart = [];
export function UpdateCart() {
    let cartQuantity = document.querySelector(".cart-quantity");
    let q = 0;
    cart.forEach(element => {
        q += element.quantity;
    })
    cartQuantity.innerText = q;
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
}