// === SVG SPRITE ===
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context("./assets/icons/", true, /\.svg$/));

// === UTILS ===
import "./utils/utils.js"; // тянет main.scss и fonts.scss

// === VENDOR STYLES ===
import "aos/src/sass/aos.scss";
import "swiper/css/bundle";
import "choices.js/src/styles/choices.scss";
import "flatpickr/dist/themes/light.css";
import "viewerjs/dist/viewer.css";
import "filepond/dist/filepond.css";

import "tippy.js/dist/tippy.css";
import 'tippy.js/animations/scale.css';
import 'tippy.js/animations/scale-subtle.css';
import 'tippy.js/animations/scale-extreme.css';

// 100vh hack for mobile-browsers
// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
// usage in css
// height: calc(var(--vh, 1vh) * 100);
// 100vh hack for mobile-browsers

// === COMPONENTS ===
import "./components/components.js";

// === HMR (разработка) ===
// Поддержка "горячей перезагрузки модулей" (Hot Module Replacement, HMR) в Webpack 5 при разработке.
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
