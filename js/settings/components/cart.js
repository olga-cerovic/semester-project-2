import { baseUrl } from "./login/api.js";

function changeQuantity() {
  totalPriceCart();
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let cartRoot = document.getElementById("cartRoot");
  cartRoot.innerHTML = "";
  if (cart.length > 0) {
    cart.forEach((element) => {
      fetch(baseUrl + "products" + "?id=" + element.id)
        .then((response) => response.json())
        .then((json) => {
          const product = json[0];

          console.log(product);

          if (!product) {
            cartRoot.innerHTML = `Product not found!`;
            return;
          }

          cartRoot.innerHTML += `<div class="row productItem">
         <div class="col-md-4 imageCart">
           <img
             src="${
               product.image_url != null ? product.image_url : product.image.url
             }"
             class="img-fluid"
             alt="..."
           />
         </div>
         <div class="col-md-8 cartDeatils">
           <div class="container">
             <div class="row card-body">
               <h5 class="col-md-5 card-title">${product.title}</h5>
               <input
                 type="number"
                 max="20"
                 min="1"
                 id="quantity${product.id}"
                 value="1"
                 class="col-md-4 quantity"
               />
               <p class="col-md-3">
                 <small class="text-muted">Price: <span class="price">${
                   product.price
                 }</span> </small>
               </p>
             </div>
           </div>
         </div>`;

          totalPriceCart();

          //   console.log(product.id);
          //   document
          //     .getElementById("quantity" + product.id)
          //     .addEventListener("change", changeQuantity);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setTimeout(function () {
      const inputsQ = document.querySelectorAll(".quantity");
      for (let i = 0; i < inputsQ.length; i++) {
        inputsQ[i].addEventListener("change", changeQuantity);
      }
    }, 200);
  } else {
    cartRoot.innerHTML = "Nema nista u korpi!";
  }
}
renderCart();

function totalPriceCart() {
  let total = 0;
  let inputs = document.querySelectorAll(".quantity");
  let price = document.querySelectorAll(".price");
  console.log(inputs);
  for (let i = 0; i < inputs.length; i++) {
    console.log(inputs[i].value, parseInt(price[i].textContent));
    total = total + inputs[i].value * parseFloat(price[i].textContent);
  }

  document.getElementById("total").textContent = total;
}
