import { products } from "../data/products.js";

export function getProductById(ID) {
    let product;
    products.forEach((element) => {
        if (element.id === ID)
        product=element;
    });
    return product;
}