import { products } from "./data/products.js";

const productsGrid = document.querySelector(".products-grid")

products.forEach(product => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");
    const productImgCont = document.createElement("div");
    productImgCont.classList.add("product-image-container")
    productImgCont.innerHTML = `
    <img class="product-image"
              src=${product.image}>
    `
    productContainer.appendChild(productImgCont);
    productsGrid.appendChild(productContainer);
    const divproductName = document.createElement("div");
    divproductName.setAttribute('class', "product-name limit-text-to-2-lines");
    divproductName.innerText = product.name;
    productContainer.appendChild(divproductName);

    const productRatingCont = document.createElement("div");
    productRatingCont.classList.add("product-rating-container");
    productRatingCont.innerHTML = ` <img class="product-rating-stars"
                                    src="images/ratings/rating-${(product.rating.stars * 10)}.png">
                                    <div class="product-rating-count link-primary">
                                        ${product.rating.count}
                                    </div>`;
    productContainer.appendChild(productRatingCont);

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.innerText = `$${parseFloat(product.priceCents / 100).toFixed(2)}`;
    productContainer.appendChild(productPrice);


    const selectDiv = document.createElement("div");
    selectDiv.classList.add("product-quantity-container");
    selectDiv.innerHTML = `<select>
    <option selected="" value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
    <option value="8">8</option>
    <option value="9">9</option>
    <option value="10">10</option>
  </select>`;
    productContainer.appendChild(selectDiv);
    productContainer.innerHTML += `<div class="product-spacer"></div>
    <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>`;

});

const AddToCartbuttons = document.querySelectorAll(".add-to-cart")

// AddToCartbuttons.forEach(button=>{
//     button.addEventListener('click',(event)=>{
        
//     })
// })