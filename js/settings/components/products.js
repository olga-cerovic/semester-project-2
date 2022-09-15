import { baseUrl } from "./login/api.js";

const allProductsRowElement = document.getElementById("all-products-row");

console.log(allProductsRowElement);

const fetchAllProducts = async () => {
  const token = localStorage.getItem("token");

  console.log(token);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(`${baseUrl}products`, options);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

fetchAllProducts();
