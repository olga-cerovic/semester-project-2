import { getUserName } from "./storage.js";

export function createMenu() {
  const { pathname } = document.location;

  const menuContainer = document.querySelector(".menu-container");

  const username = getUserName();

  let authLink = `<a href="login.html" class="${[
    pathname === "/login.html" ? "active" : "",
  ]}">Login</a>`;

  if (username) {
    authLink = `<a href="admin-add-product.html" class="${[
      pathname === "/admin-add-product.html" ? "active" : "",
    ]}">Add Product</a>
                    <span class="greeting">Hi, ${username}</span>`;
  }

  menuContainer.innerHTML = `<nav class="navbar navbar-expand-lg background-nav-admin">
                                <div class="menu container">
                                   <a href="/admin-home.html" && pathname === "/admin-home.html" class="${[
                                     pathname === "/admin-home.html"
                                       ? "active"
                                       : "",
                                   ]}">Home</a>
                                ${authLink}
                               </div>
                              </nav>`;
}
