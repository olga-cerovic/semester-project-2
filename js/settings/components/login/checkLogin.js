import { logOut } from "./logout.js";

export function checkLogin() {
  const userLogin = document.getElementById("loginIcon");
  const logoutButtonElement = document.querySelector(".logout");

  if (JSON.parse(localStorage.getItem("user"))) {
    logoutButtonElement.addEventListener("click", logOut);
    userLogin.style.display = "none";
    logoutButtonElement.style.display = "inline-block";
  } else {
    userLogin.style.display = "inline-block";
    logoutButtonElement.style.display = "none";
    logoutButtonElement.removeEventListener();
  }
}
