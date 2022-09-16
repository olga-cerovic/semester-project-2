import { getUserName } from "./storage.js";

export function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  const username = getUserName();

  let authLink = `<a href="login.html" class="${[
    pathname === "/login.html" ? "active" : "",
  ]}">Login</a>`;

  if (username) {
    authLink = `<a href="add.html" class="${[
      pathname === "/add.html" ? "active" : "",
    ]}">Add Product</a>
                    <span class="greeting">Hi, ${username}</span>`;
  }

  menuContainer.innerHTML = `<div class="menu">
                                <a href="/" class="${[
                                  pathname === "/" ? "active" : "",
                                ]}">Home</a>
                                ${authLink}
                            </div>`;
}
