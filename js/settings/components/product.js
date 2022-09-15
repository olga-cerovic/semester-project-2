import { baseUrl } from "./login/api.js";

const productElement = document.getElementById("product-details");

let url = new URL(window.location.href);
let search_params = url.searchParams;

// get value of "id" parameter
// "100"
console.log(search_params.get("id"));

console.log(search_params);

async function getProduct() {
  productElement.innerHTML = "";

  try {
    const response = await fetch(
      baseUrl + "products" + "?id=" + search_params.get("id")
    );
    const json = await response.json();

    const product = json[0];

    if (!product) {
      productElement.innerHTML = `Product not found!`;
      return;
    }

    console.log(localStorage.getItem("user"));

    let deleteButton = "";

    if (localStorage.getItem("user")) {
      deleteButton = `<button class="btn btn-primary" onclick='deleteProduct()'>
          Delete Product
        </button>`;
    }

    productElement.innerHTML = `<div class="col-md-6 col-lg-3">
    <div class="card card-custom">
        <img src="${product.image.url}" alt=""/>
            <div class="card">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.price}</p>
                <a href="product-details.html?id=${product.id}" class="btn btn-primary">See Product</a>
                ${deleteButton}

            </div>
        </div>
    </div>
  </div>`;

    console.log(json[0]);
  } catch (error) {
    console.log(error);
  }
}

getProduct();

function deleteProduct(id) {
  console.log("deleting", id);
}
