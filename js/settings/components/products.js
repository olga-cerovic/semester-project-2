import { baseUrl } from "./login/api.js";
import displayMessage from "./login/displayMessage.js";

const allProductsRowElement = document.getElementById("shop-row");

// console.log(allProductsRowElement);

const productsUrl = baseUrl + "products";

export async function getProducts(elementId, filters = "") {
  const allProductsRowElement = document.getElementById(elementId);

  console.log(allProductsRowElement);

  try {
    const response = await fetch(productsUrl + filters);
    const json = await response.json();

    allProductsRowElement.innerHTML = "";

    json.forEach(function (product) {
      allProductsRowElement.innerHTML += `<div class="col-md-6 col-lg-3">
                                            <div class="card card-custom">
                                                <img src="${product.image.url}" alt=""/>
                                                    <div class="card">
                                                        <h5 class="card-title">${product.title}</h5>
                                                        <p class="card-text">${product.price}</p>
                                                        <a href="product-details.html?id=${product.id}" class="btn btn-primary">See Product</a>
                                                    </div>
                                                </div>
                                            </div>
                                          </div>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, elementId);
  }
}

if (window.location.href.includes("shop")) {
  getProducts("shop-row");
}