import { baseUrl } from "./api.js";
import { createMenu } from "./createMenu.js";
import displayMessage from "./displayMessage.js";
import { getToken } from "./storage.js";
createMenu();

document.getElementById("successUpdate").style.display = "none";
const form = document.querySelector("form");
const img = document.querySelector("#img");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const checkFeature = document.querySelector("#featured");
const message = document.querySelectorAll(".message-container");

let url = new URL(window.location.href);
let search_params = url.searchParams;
const id = search_params.get("id");
getProduct();

async function getProduct() {
  try {
    const response = await fetch(baseUrl + "products" + "?id=" + id);
    const json = await response.json();

    const product = json[0];

    console.log(product);

    if (product.image_url == null) {
      img.value = product.image.url;
    } else {
      img.value = product.image_url;
    }

    document.getElementById("imageEdit").src = img.value;
    name.value = product.title;
    price.value = product.price;
    description.value = product.description;
    checkFeature.checked = product.featured;

    document.getElementById("form").addEventListener("submit", getProductValue);
  } catch (error) {
    console.log(error);
  }
}

function getProductValue(e) {
  e.preventDefault();

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
    editProduct(imgValue, nameValue, priceValue, descriptionValue, feature);
  }
}

async function editProduct(
  imgValue,
  nameValue,
  priceValue,
  descriptionValue,
  feature
) {
  const url = baseUrl + "products/" + id;
  const data = JSON.stringify({
    image_url: imgValue,
    title: nameValue,
    price: priceValue,
    description: descriptionValue,
    featured: feature,
  });

  console.log(data);
  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    document.getElementById("successUpdate").style.display = "block";
  } catch (error) {
    console.log(error);
  }
}
