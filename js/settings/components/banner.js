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
                                  <div class="banner-txt-background">
                                    <div class="centered">
                                        <h1>Best Value Deals</h1>
                                        <h3>On Most Popular Brands</h3>
                                        <h5>Additional Discount for Members Only</h5>
                                        <a href="/shop.html" class="btn shop-now-btn pink-cta">Shop Now</a>
                                    </div>
                                    </div>`;
    })
    .catch((error) => {
      console.log(error);
    });
})();

// getBanner();
