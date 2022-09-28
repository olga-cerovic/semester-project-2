import { baseUrl } from "./api.js";
import { createMenu } from "./createMenu.js";
import displayMessage from "./displayMessage.js";
import { logOut } from "./logout.js";
import { getToken } from "./storage.js";

document.querySelector(".logout").addEventListener("click", logOut);

createMenu();
// logOut();
document.querySelector(".message-add-success").style.display = "none";
const form = document.querySelector("form");
const img = document.querySelector("#img");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const checkFeature = document.querySelector("#featured");
const message = document.querySelectorAll(".message-container");

form.addEventListener("keyup", function () {
  document.querySelector(".message-add-success").style.display = "none";
});

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  let num = 0;
  for (let i = 0; i < message.length; i++) {
    message[i].textContent = "";
  }

  const imgValue = img.value.trim();
  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const feature = checkFeature.checked;

  if (nameValue.length === 0) {
    displayMessage("warning", "Please enter valid name", ".nameCon");
    num++;
  }

  if (descriptionValue.length === 0) {
    displayMessage("warning", "Please enter valid description", ".descCon");
    num++;
  }

  if (imgValue.length == 0) {
    displayMessage("warning", "Please enter valid description", ".imgCon");
    num++;
  }

  if (typeof priceValue != "number" || isNaN(priceValue)) {
    displayMessage("warning", "Please enter valid number", ".priceCon");
    num++;
  }

  if (num == 0) {
    addProduct(imgValue, nameValue, priceValue, descriptionValue, feature);
  }
}

async function addProduct(img, name, price, description, feature) {
  const url = baseUrl + "products";
  const data = JSON.stringify({
    image_url: img,
    title: name,
    price: price,
    description: description,
    featured: feature,
  });

  console.log(data);
  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    document.querySelector(".message-add-success").style.display = "block";
    document.querySelector(".message-add-success").textContent =
      "Product Succesfully Added!";
    document.getElementById("addForm").reset();
  } catch (error) {
    console.log(error);
  }
}
