import { baseUrl } from "./login/api.js";
import { checkCartNumber } from "./products.js";

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
         <div class="col-md-8 cart-details">
           <div class="container">
             <div class="row card-body">
               <h5 class="col-md-5 card-title">${product.title}</h5>
               <div class="price-quantity">
               <input
                 type="number"
                 max="20"
                 min="1"
                 id="quantity${product.id}"
                 value="1"
                 class="col-md-4 quantity"
               />
               <p class="col-md-3">
                 <span class="price">${
                   product.price + " $"
                 }</span><span class="deleteItem"><i class="fa fa-trash" data-id="${
            product.id
          }" aria-hidden="true"></i></span>
               </p>
               </div>
             </div>
           </div>
         </div>
         <hr/>`;

          document.querySelector(".total-price").style.display = "block";
          totalPriceCart();

          console.log(product.id);
          document
            .getElementById("quantity" + product.id)
            .addEventListener("change", changeQuantity);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    setTimeout(function () {
      cartRoot.innerHTML += `<div><a href="#" class="btn-primary delete-all-btn deleteAll">Delete All</a> </div>`;
      const inputsQ = document.querySelectorAll(".quantity");
      const deleteI = document.querySelectorAll(".deleteItem");
      const deleteAll = document.querySelector(".deleteAll");

      deleteAll.addEventListener("click", deleteItems);
      for (let i = 0; i < inputsQ.length; i++) {
        inputsQ[i].addEventListener("change", changeQuantity);
      }
      for (let i = 0; i < deleteI.length; i++) {
        deleteI[i].addEventListener("click", deleteItem);
      }
    }, 200);
  } else {
    cartRoot.innerHTML = `<p class="your-cart-msg">Your Cart is empty!</p>`;
    document.querySelector(".total-price").style.display = "none";
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

checkCartNumber();

function deleteItem(e) {
  let id = e.target.dataset.id;

  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  let newCart = cart.filter((element) => {
    console.log(element.id, id);
  });
  console.log(newCart);

  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCart();
  totalPriceCart();
  checkCartNumber();
}

function deleteItems(e) {
  e.preventDefault();
  let newCart = [];
  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCart();
  totalPriceCart();
  checkCartNumber();
}
