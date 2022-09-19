export function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  alert("dsadsadsa");

  window.location.href = "../../../../index.html";
}
