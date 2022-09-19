import { baseUrl } from "./login/api.js";
import displayMessage from "./login/displayMessage.js";

import { getToken } from "./login/storage.js";
// import { createMenu } from "./createMenu.js";

// createMenu();

const allProductsRowElement = document.getElementById("shop-row");

// console.log(allProductsRowElement);

const productsUrl = baseUrl + "products";

export async function getProducts(elementId, filters = "", param = 0) {
  const allProductsRowElement = document.getElementById(elementId);

  console.log(allProductsRowElement);

  try {
    const response = await fetch(productsUrl + filters);
    const json = await response.json();

    allProductsRowElement.innerHTML = "";
    console.log(json);
    if (param == 0) {
      json.forEach(function (product) {
        allProductsRowElement.innerHTML += `<div class="col-md-6 col-lg-3">
                                            <div class="card card-custom">
                                                <img src="${
                                                  product.image_url
                                                    ? product.image_url
                                                    : product.image.url
                                                }" alt=""/>
                                                    <div class="card">
                                                        <h5 class="card-title">${
                                                          product.title
                                                        }</h5>
                                                        <p class="card-text">${
                                                          product.price
                                                        }</p>
                                                        <a href="product-details.html?id=${
                                                          product.id
                                                        }" class="btn btn-primary">See Product</a>
                                                    </div>
                                                </div>
                                            </div>
                                          </div>`;
      });
    } else {
      json.forEach(function (product) {
        allProductsRowElement.innerHTML += `<div class="col-md-6 col-lg-3">
                                              <div class="card card-custom">
                                                  <img src="${
                                                    product.image_url != null
                                                      ? product.image_url
                                                      : product.image.url
                                                  }" alt=""/>
                                                      <div class="card">
                                                          <h5 class="card-title">${
                                                            product.title
                                                          }</h5>
                                                          <p class="card-text">${
                                                            product.price
                                                          }</p>
                                                          <a href="admin-edit-product.html?id=${
                                                            product.id
                                                          }" class="btn btn-primary">Edit Product</a>
                                                          <a href="" class="btn btn-danger deleteProduct"  data-id="${
                                                            product.id
                                                          }">Delete Product</a>
                                                      </div>
                                                  </div>
                                              </div>
                                            </div>`;
      });

      const deleteButtons = document.querySelectorAll(".deleteProduct");

      deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteProduct);
      });
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, elementId);
  }
}

if (window.location.href.includes("shop")) {
  getProducts("shop-row");
}

async function deleteProduct(e) {
  e.preventDefault();

  const id = e.target.dataset.id;

  const doDelete = confirm("Are you sure you want to delete this?");

  if (doDelete) {
    const url = baseUrl + "products/" + id;

    const token = getToken();

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      alert("Succes delete");
      location.href = "admin-home.html";
    } catch (error) {
      console.log(error);
    }
  }
}
