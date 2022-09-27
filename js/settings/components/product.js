import { baseUrl } from "./login/api.js";

export function getProduct() {
  const productElement = document.getElementById("product-details");

  let url = new URL(window.location.href);
  let search_params = url.searchParams;
  fetch(baseUrl + "products" + "?id=" + search_params.get("id"))
    .then((response) => response.json())
    .then((json) => {
      const product = json[0];

      if (!product) {
        productElement.innerHTML = `Product not found!`;
        return;
      }

      productElement.innerHTML = `<div class="card mb-3 product-centered" style="max-width: 780px;">
                                      <div class="row g-0">
                                          <div class="col-md-4">
                                              <img src="${product.image.url}" class="img-fluid" alt="...">
                                          </div>
                                      <div class="col-md-8">
                                          <div class="card-body">
                                              <h5 class="card-title">${product.title}</h5>
                                              <p class="card-text">${product.price}</p>
                                              <p class="card-text">${product.description}</p>
                                              <a href="product-details.html?id=${product.id}" class="add-to-cart-btn productCart" id="product${product.id}"  data-id="${product.id}">Add To Cart</a>
                                          </div>
                                        </div>
                                      </div>
                                  </div>`;

      document
        .querySelector(".productCart")
        .addEventListener("click", insertInCart);

      console.log(json[0]);
    })
    .catch((error) => {
      console.log(error);
    });
}

getProduct();

function insertInCart(e) {
  e.preventDefault();
  let cart = [];
  let idP = e.target.dataset.id;

  cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    let array = cart.filter((elem) => elem.id == idP);

    if (array.length > 0) {
      let arraySlice = cart.filter((elem) => elem.id != idP);
      localStorage.setItem("cart", JSON.stringify(arraySlice));
      checkCartNumber();
    } else {
      cart.push({ id: idP });
      localStorage.setItem("cart", JSON.stringify(cart));
      checkCartNumber();
    }
  } else {
    cart = [{ id: idP }];

    localStorage.setItem("cart", JSON.stringify(cart));
    checkCartNumber();
  }
}

function checkCartNumber() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    document.getElementById("cartNumber").textContent = cart.length;
  } else {
    document.getElementById("cartNumber").textContent = "0";
  }
}
checkCartNumber();
