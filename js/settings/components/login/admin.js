import  {getProducts}from "../products.js";
import { createMenu } from "./createMenu.js";
import { logOut } from "./logout.js";
const logoutButtonElement = document.querySelector(".logout");

createMenu();
logoutButtonElement.addEventListener("click", logOut);
getProducts("shop-row","",1);