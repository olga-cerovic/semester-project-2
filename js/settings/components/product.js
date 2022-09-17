import { baseUrl } from "./login/api.js";

const productElement = document.getElementById("product-details");

let url = new URL(window.location.href);
let search_params = url.searchParams;

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

    //   productElement.innerHTML = `<div class="col-md-6 col-lg-3">
    //   <div class="card card-custom">
    //       <img src="${product.image.url}" alt=""/>
    //           <div class="card">
    //               <h5 class="card-title">${product.title}</h5>
    //               <p class="card-text">${product.price}</p>
    //               <p class="card-text">${product.description}</p>
    //               <a href="product-details.html?id=${product.id}" class="btn btn-primary" id="product${product.id}">Add To Cart</a>
    //           </div>
    //       </div>
    //   </div>
    // </div>`;

    productElement.innerHTML = `<div class="card mb-3 product-centered" style="max-width: 780px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${product.image.url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.price}</p>
                <p class="card-text">${product.description}</p>
                <a href="product-details.html?id=${product.id}" class="btn btn-primary" id="product${product.id}">Add To Cart</a>
      </div>
    </div>
  </div>
</div>`;

    document, get;

    console.log(json[0]);
  } catch (error) {
    console.log(error);
  }
}

getProduct();
