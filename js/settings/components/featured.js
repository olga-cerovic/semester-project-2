import { baseUrl } from "./login/api.js";
import { getProducts } from "./products.js";

getProducts("featured", "?featured=true");
