import { baseUrl } from "./login/api.js";
import { checkLogin } from "./login/checkLogin.js";
checkLogin();

const bannerUrl = baseUrl + "home";

(async function () {
  const bannerElement = document.querySelector(".banner-container");

  const response = await fetch(bannerUrl)
    .then((response) => response.json())
    .then((home) => {
      bannerElement.innerHTML = `<img src="${home.hero_banner.formats.medium.url}" alt="" style="width: 100%" />
    <div class="centered">Centered</div>`;
    })
    .catch((error) => {
      console.log(error);
    });
})();


// getBanner();
