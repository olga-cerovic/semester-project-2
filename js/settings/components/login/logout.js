export function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "../../../../index.html";
}
