import { baseUrl } from "./login/api.js";
import displayMessage from "./login/displayMessage.js";

import { getToken } from "./login/storage.js";
// import { createMenu } from "./createMenu.js";
// createMenu();

// const allProductsRowElement = document.getElementById("shop-row");

const productsUrl = baseUrl + "products";

let searchTextbox;

// console.log(allProductsRowElement);

if (window.location.href.includes("shop")) {
  searchTextbox = document.getElementById("search-field");
}

if (window.location.href.includes("admin-home")) {
  searchTextbox = document.getElementById("search-field");
}

export async function getProducts(elementId, filters = "", param = 0) {
  const allProductsRowElement = document.getElementById(elementId);

  console.log(allProductsRowElement);

  try {
    const response = await fetch(productsUrl + filters);
    let json = await response.json();

    allProductsRowElement.innerHTML = "";
    if (
      window.location.href.includes("shop") ||
      window.location.href.includes("admin-home")
    ) {
      json = searchFilter(json);
    }

    if (json.length > 0) {
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
                                                          }" class="btn btn-primary edit-btn">Edit Product</a>
                                                          <a href="" class="delete-btn deleteProduct"  data-id="${
                                                            product.id
                                                          }">Delete Product</a>
                                                      </div>
                                                  </div>
                                              </div>
                                            </div>`;
        });
      }

      if (window.location.href.includes("admin")) {
        const deleteButtons = document.querySelectorAll(".deleteProduct");

        deleteButtons.forEach((button) => {
          button.addEventListener("click", deleteProduct);
        });
      }
    } else {
      allProductsRowElement.innerHTML = "No items!!!";
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, elementId);
  }
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

function searchFilter(data) {
  const value = searchTextbox.value;

  if (value) {
    let array = data.filter((product) => {
      if (
        product.title.toUpperCase().indexOf(value.trim().toUpperCase()) != -1
      ) {
        return product;
      }
    });
    return array;
  }

  return data;
}
if (window.location.href.includes("shop")) {
  const searchTextbox = document.getElementById("search-field");
  searchTextbox.addEventListener("keyup", () => {
    getProducts("shop-row");
  });
  getProducts("shop-row");
}

if (window.location.href.includes("admin-home")) {
  const searchTextbox = document.getElementById("search-field");

  searchTextbox.addEventListener("keyup", () => {
    getProducts("shop-row", "", 1);
  });

  getProducts("shop-row", "", 1);
}
