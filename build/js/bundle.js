/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3937
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 4009
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeAlert: () => (/* binding */ removeAlert),
/* harmony export */   summonAlert: () => (/* binding */ summonAlert)
/* harmony export */ });

const body = document.querySelector(".alert-wrapper");
const removeAlert = ({
  template
}) => {
  const templateContent = document.querySelector(`${template}`);
  templateContent.remove();
};
const summonAlert = (input) => {
  let template;
  let text;
  if (typeof input === "string") {
    template = input;
  } else if (typeof input === "object" && input !== null) {
    template = input.template;
    text = input.text;
  } else {
    console.log("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0434\u0430\u043D\u043D\u044B\u0445 \u0434\u043B\u044F summonAlert. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0441\u0442\u0440\u043E\u043A\u0430 (template) \u0438\u043B\u0438 \u043E\u0431\u044A\u0435\u043A\u0442 { template, text }.");
    return;
  }
  if (typeof template !== "string" || !template.startsWith("#")) {
    console.log('\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0441\u0442\u0440\u043E\u043A\u0430, \u043D\u0430\u0447\u0438\u043D\u0430\u044E\u0449\u0430\u044F\u0441\u044F \u0441 "#", \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 "#alert--request".');
    return;
  }
  const alertName = template.slice(1);
  const alertTemplate = document.querySelector(`#${alertName}`);
  if (!alertTemplate) {
    console.log(`#${alertName} \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.`);
    return;
  }
  const oldAlert = document.querySelector(`.${alertName}`);
  if (oldAlert) {
    oldAlert.remove();
  }
  const templateContent = alertTemplate.content.cloneNode(true);
  const alert = templateContent.querySelector(`.${alertName}`);
  if (!alert) {
    console.log(`\u0412 \u0448\u0430\u0431\u043B\u043E\u043D\u0435 #${alertName} \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043A\u043E\u0440\u043D\u0435\u0432\u043E\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 .${alertName}`);
    return;
  }
  const close = alert.querySelector(".alert__close");
  const textContainer = alert.querySelector(".alert__container");
  if (text && textContainer) {
    textContainer.innerHTML = text;
  }
  const closeAlert = () => {
    alert.remove();
  };
  if (close) {
    close.addEventListener("click", closeAlert);
  }
  body.append(templateContent);
  alert.classList.add("alert--bounce");
};



/***/ },

/***/ 1217
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 2271
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 2907
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   magneticInit: () => (/* binding */ magneticInit)
/* harmony export */ });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5880);


const magneticInit = () => {
  const MIN_WIDTH = 1024;
  let mouseMoveHandler = null;
  let mouseOverHandler = null;
  let mouseOutHandler = null;
  const btnHandlers = /* @__PURE__ */ new Map();
  const cursor = document.querySelector(".c-cursor__pointer");
  const page = document.body;
  if (!cursor) return;
  gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.set(cursor, { autoAlpha: 1 });
  const cursorX = gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.quickTo(cursor, "x", { duration: 0.3 });
  const cursorY = gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.quickTo(cursor, "y", { duration: 0.3 });
  const moveMousePos = (e) => {
    if (e.target.classList.contains("button-magnetic")) return;
    cursorX(e.clientX);
    cursorY(e.clientY);
  };
  const updateOnHover = (e) => {
    const { tagName, classList, parentElement } = e.target;
    if (tagName === "LABEL" || tagName === "A" || tagName === "BUTTON" || classList.contains("is-cursor-hover") || (parentElement == null ? void 0 : parentElement.tagName) === "A" && tagName === "IMG") {
      document.documentElement.classList.toggle("is-hover");
    }
  };
  const attach = () => {
    mouseMoveHandler = moveMousePos;
    mouseOverHandler = updateOnHover;
    mouseOutHandler = updateOnHover;
    page.addEventListener("mousemove", mouseMoveHandler);
    page.addEventListener("mouseover", mouseOverHandler);
    page.addEventListener("mouseout", mouseOutHandler);
    const magneticButtons = [...document.querySelectorAll(".button-magnetic")];
    magneticButtons.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;
        const cursorTargetX = rect.left + rect.width / 2 + (relX - rect.width / 2) / 1.5;
        const cursorTargetY = rect.top + rect.height / 2 + (relY - rect.height / 2) / 1.5;
        cursorX(cursorTargetX);
        cursorY(cursorTargetY);
        gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.to(btn, {
          x: (relX - rect.width / 2) / rect.width * 50,
          y: (relY - rect.height / 2) / rect.height * 50,
          duration: 0.3,
          ease: "power2.out"
        });
      };
      const onOut = () => {
        gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)"
        });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseout", onOut);
      btnHandlers.set(btn, { onMove, onOut });
    });
  };
  const detach = () => {
    if (mouseMoveHandler) page.removeEventListener("mousemove", mouseMoveHandler);
    if (mouseOverHandler) page.removeEventListener("mouseover", mouseOverHandler);
    if (mouseOutHandler) page.removeEventListener("mouseout", mouseOutHandler);
    mouseMoveHandler = mouseOverHandler = mouseOutHandler = null;
    btnHandlers.forEach(({ onMove, onOut }, btn) => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseout", onOut);
    });
    btnHandlers.clear();
    document.querySelectorAll(".button-magnetic").forEach(
      (btn) => gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.set(btn, { x: 0, y: 0 })
    );
  };
  const initOrDestroyMagnetic = () => {
    if (window.innerWidth >= MIN_WIDTH) {
      if (btnHandlers.size === 0) {
        attach();
      }
    } else {
      if (btnHandlers.size > 0) {
        detach();
      }
    }
  };
  initOrDestroyMagnetic();
  window.addEventListener("resize", initOrDestroyMagnetic);
};
magneticInit();


/***/ },

/***/ 9537
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5880);
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6575);



gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__/* .ScrollTrigger */ .u);
const columns = document.querySelectorAll(".chess-gallery__text-inner");
const translateY = [-150, 80, -120];
const mm = gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.matchMedia();
mm.add("(min-width: 992px)", () => {
  columns.forEach((column, i) => {
    var _a;
    gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.to(column, {
      x: (_a = translateY[i]) != null ? _a : 0,
      scrollTrigger: {
        trigger: column,
        start: "top bottom",
        end: "80% top",
        scrub: 2
      }
    });
  });
});
mm.add("(max-width: 991px)", () => {
});


/***/ },

/***/ 7013
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 2820
(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

function importAll(r) {
  const keys = r.keys();
  const firstFile = "./window/window.js";
  const filteredKeys = keys.filter((key) => key !== firstFile).sort();
  if (keys.includes(firstFile)) {
    r(firstFile);
  }
  filteredKeys.forEach(r);
}
importAll(__webpack_require__(147));


/***/ },

/***/ 11
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popUp_popUp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9417);


const setCookie = (name, value) => {
  const updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=/;max-age=31536000;`;
  document.cookie = updatedCookie;
};
const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1")}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : void 0;
};
const showMessage = () => {
  (0,_popUp_popUp__WEBPACK_IMPORTED_MODULE_0__.summonPopUp)({
    template: "#cookie",
    blockScroll: false,
    overlay: {
      use: false,
      closeOnClick: false
    },
    esc: {
      closeOnEsc: false
    }
  });
  const closeButton = document.querySelector(".cookie__button");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      setCookie("agreeCookie", true);
      (0,_popUp_popUp__WEBPACK_IMPORTED_MODULE_0__.removePopUp)("#cookie");
    });
  }
};
const cookie = () => {
  const result = getCookie("agreeCookie");
  if (result === void 0) {
    showMessage();
  }
};
cookie();


/***/ },

/***/ 4205
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 8413
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 6689
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3670);


const header = document.querySelector("header");
if (header) {
  const hideHeaderOnMove = () => {
    let scrollPosition = 0;
    let hideChecker = 0;
    let showChecker = 0;
    window.addEventListener("scroll", () => {
      if (window.pageYOffset >= scrollPosition && window.pageYOffset >= header.offsetHeight) {
        showChecker = 0;
        hideChecker += window.pageYOffset - scrollPosition;
        scrollPosition = window.pageYOffset;
      } else {
        showChecker += scrollPosition - window.pageYOffset;
        hideChecker = 0;
        scrollPosition = window.pageYOffset;
      }
      if (showChecker >= 300) {
        header.classList.remove("header--hidden");
        hideChecker = 0;
      } else if (hideChecker >= 300) {
        header.classList.add("header--hidden");
      }
    });
  };
  hideHeaderOnMove();
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 0 && !header.classList.contains("header--fixed")) {
      header.classList.add("header--fixed");
    } else if (window.pageYOffset === 0) {
      header.classList.remove("header--fixed");
    }
  });
  const burger = header.querySelector(".header__burger");
  const menuOff = () => {
    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingFromBody */ .iW)();
    header.classList.remove("header--dropdown");
    header.querySelectorAll(".mobile-nav__sub-container--active").forEach((el) => {
      el.classList.remove("mobile-nav__sub-container--active");
    });
    header.querySelectorAll(".mobile-nav__nav-item--sub").forEach((el) => {
      el.classList.remove("mobile-nav__nav-item--sub");
    });
    header.querySelectorAll(".mobile-dropdown__sub--active").forEach((el) => {
      el.classList.remove("mobile-dropdown__sub--active");
      el.style.maxHeight = null;
    });
  };
  if (burger) {
    burger.addEventListener("click", () => {
      if (header.classList.contains("header--dropdown")) {
        menuOff();
      } else {
        header.classList.add("header--dropdown");
        (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingOnBody */ .rP)();
      }
    });
  }
}


/***/ },

/***/ 4189
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* unused harmony import specifier */ var gsap;
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3670);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5880);
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6575);
/* harmony import */ var gsap_SplitText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9373);





gsap__WEBPACK_IMPORTED_MODULE_1__/* .gsap */ .os.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__/* .ScrollTrigger */ .u, gsap_SplitText__WEBPACK_IMPORTED_MODULE_3__/* .SplitText */ .A);
function initMouseParallax(selector = "[data-parallax-mouse]") {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  const updateWindowSize = () => {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
  };
  window.addEventListener("resize", () => {
    requestAnimationFrame(updateWindowSize);
  });
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;
  const handlers = [];
  const animConfig = { duration: 1, ease: "power3" };
  elements.forEach((el) => {
    const speed = parseFloat(el.dataset.parallaxSpeed || 1);
    const rotateFactor = parseFloat(el.dataset.parallaxRotate || 1);
    handlers.push({
      speed,
      rotateFactor,
      xTo: gsap.quickTo(el, "xPercent", animConfig),
      yTo: gsap.quickTo(el, "yPercent", animConfig),
      rotateTo: gsap.quickTo(el, "rotation", animConfig)
    });
    el.style.willChange = "transform";
  });
  const handleMouseMove = (e) => {
    const xPercent = gsap.utils.mapRange(0, windowWidth, -20, 20, e.x);
    const yPercent = gsap.utils.mapRange(0, windowHeight, -20, 20, e.y);
    const rotateBase = gsap.utils.clamp(
      -1,
      1,
      gsap.utils.mapRange(windowWidth * 0.25, windowWidth * 0.75, 1, -1, e.x)
    );
    handlers.forEach(({ xTo, yTo, rotateTo, speed, rotateFactor }) => {
      xTo(xPercent * speed);
      yTo(yPercent * speed);
      rotateTo(yPercent * rotateBase * rotateFactor);
    });
  };
  window.addEventListener("mousemove", handleMouseMove);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}
const initScrollRevealDynamic = (selector = "[data-reveal]") => {
  document.querySelectorAll(selector).forEach((el, index) => {
    const base = Math.floor(Math.random() * 10) * 50;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const randomY = base * direction;
    gsap.fromTo(
      el,
      { y: randomY, opacity: 0, rotation: 0 },
      {
        y: 0,
        opacity: 1,
        rotation: Math.random() * 10 - 5,
        // покачивание ±5°
        duration: 1.2,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom"
        },
        onComplete: () => {
          gsap.to(el, {
            rotation: Math.random() * 4 - 2,
            y: "+=0",
            // чтобы gsap считал это анимацией
            duration: 1 + Math.random() * 1,
            // длительность 1-2 сек
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
          gsap.to(el, {
            y: "+=" + (Math.random() * 10 - 5),
            // вертикальное колебание ±5px
            duration: 1 + Math.random() * 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        }
      }
    );
  });
};
(0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .initScrollRevealChain */ .wj)("[data-reveal]");


/***/ },

/***/ 103
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 1995
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 2425
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1236);
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(150);



const initLineSlider = () => {
  const line = document.querySelector(".line-banner");
  if (!line) return;
  const swiperEl = line.querySelector(".swiper");
  if (!swiperEl) return;
  const buttonPrev = line.querySelector(".line-banner__button--prev");
  const buttonNext = line.querySelector(".line-banner__button--next");
  const scrollbar = line.querySelector(".line-banner__scrollbar");
  const pagination = line.querySelector(".line-banner__pagination");
  let slider = null;
  let isMobile = null;
  const destroySlider = () => {
    if (slider) {
      slider.destroy(true, true);
      slider = null;
    }
  };
  const initSlider = () => {
    slider = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(swiperEl, {
      modules: [
        swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .FreeMode */ .U1,
        swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Mousewheel */ .FJ,
        swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Pagination */ .dK,
        swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Scrollbar */ .Ze,
        swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Navigation */ .Vx
      ],
      slidesPerView: "auto",
      spaceBetween: 0,
      freeMode: {
        enabled: true
      },
      mousewheel: {
        enabled: true,
        releaseOnEdges: true
      },
      pagination: {
        enabled: true,
        el: pagination,
        type: "fraction",
        renderFraction: function(currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span> | <span class="' + totalClass + '"></span>';
        }
      },
      scrollbar: {
        enabled: true,
        el: scrollbar,
        dragClass: "line-banner__scrollbar-drag",
        draggable: true
      },
      navigation: {
        enabled: false,
        prevEl: buttonPrev,
        nextEl: buttonNext,
        disabledClass: "line-banner__button--disabled"
      },
      breakpoints: {
        992: {
          freeMode: false,
          mousewheel: false,
          scrollbar: false,
          navigation: {
            enabled: true,
            prevEl: buttonPrev,
            nextEl: buttonNext,
            disabledClass: "line-banner__button--disabled"
          },
          speed: 600
        }
      }
    });
  };
  const checkBreakpoint = () => {
    const mobile = window.matchMedia("(max-width: 991px)").matches;
    if (isMobile === mobile) return;
    isMobile = mobile;
    destroySlider();
    initSlider();
  };
  checkBreakpoint();
  window.addEventListener("resize", checkBreakpoint);
};
initLineSlider();


/***/ },

/***/ 9143
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 549
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ },

/***/ 9417
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removePopUp: () => (/* binding */ removePopUp),
/* harmony export */   summonPopUp: () => (/* binding */ summonPopUp)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3670);


const body = document.querySelector("body");
const openPopup = (options) => {
  const {
    template,
    blockScroll = true,
    redirect,
    overlay = {
      use: true,
      closeOnClick: true
    },
    esc = {
      closeOnEsc: true
    }
  } = options;
  const popUpName = template.replace(/^#/, "");
  const templateElement = document.querySelector(`#${popUpName}`);
  if (!templateElement) {
    console.warn(`#${popUpName} \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.`);
    return;
  }
  if (document.querySelector(`.${popUpName}`)) {
    console.warn(`\u041C\u043E\u0434\u0430\u043B\u043A\u0430 ${popUpName} \u0443\u0436\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0430.`);
    return;
  }
  const templateContent = templateElement.content.cloneNode(true);
  const popup = templateContent.querySelector(`.${popUpName}`);
  if (!popup) {
    console.error(`\u0412 \u0448\u0430\u0431\u043B\u043E\u043D\u0435 #${popUpName} \u043D\u0435\u0442 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441 \u043A\u043B\u0430\u0441\u0441\u043E\u043C .${popUpName}`);
    return;
  }
  body.append(popup);
  const overlayEl = popup.querySelector(".popUp__overlay");
  const closes = popup.querySelectorAll(".popUp__close");
  function removePopup() {
    popup.remove();
    if (blockScroll && !document.querySelector(".popUp")) {
      (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingFromBody */ .iW)();
    }
    document.removeEventListener("keydown", onPopupEscPress);
    if (redirect) {
      setTimeout(() => {
        window.location.href = redirect;
      }, 300);
    }
  }
  function onPopupEscPress(evt) {
    if (!esc.closeOnEsc) return;
    if (evt.code !== "Escape") return;
    evt.preventDefault();
    removePopup();
  }
  if (blockScroll) (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingOnBody */ .rP)();
  if (overlayEl) {
    if (overlay.use && overlay.closeOnClick) {
      overlayEl.addEventListener("click", removePopup);
    } else if (!overlay.use) {
      overlayEl.remove();
    }
  }
  closes.forEach((close) => close.addEventListener("click", removePopup));
  if (esc.closeOnEsc) {
    document.addEventListener("keydown", onPopupEscPress);
  }
};
const summonPopUp = (arg1, arg2, arg3) => {
  if (typeof arg1 === "object" && arg1 !== null) {
    const {
      template,
      blockScroll = true,
      redirect,
      overlay = {
        use: true,
        closeOnClick: true
      },
      esc = {
        closeOnEsc: true
      }
    } = arg1;
    if (!template) {
      console.warn("\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D template \u0434\u043B\u044F \u043C\u043E\u0434\u0430\u043B\u043A\u0438");
      return;
    }
    openPopup({
      template,
      blockScroll,
      redirect,
      overlay,
      esc
    });
  } else if (typeof arg1 === "string") {
    const template = arg1;
    const blockScroll = arg2 !== void 0 ? arg2 : true;
    const redirect = arg3;
    openPopup({
      template,
      blockScroll,
      redirect,
      overlay: {
        use: true,
        closeOnClick: true
      },
      esc: {
        closeOnEsc: true
      }
    });
  } else {
    console.warn("\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0434\u043B\u044F summonPopUp");
  }
};
const removePopUp = (arg) => {
  const findPopup = (name) => {
    if (name.startsWith("#")) return document.querySelector(`.${name.slice(1)}`);
    const cls = name.startsWith(".") ? name : `.${name}`;
    return document.querySelector(cls);
  };
  let popup = null;
  if (typeof arg === "string") {
    popup = findPopup(arg);
  } else if (typeof arg === "object" && arg !== null) {
    popup = findPopup(arg.template);
  }
  if (!popup) return;
  popup.remove();
  if (!document.querySelector(".popUp__overlay")) (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__/* .getPaddingFromBody */ .iW)();
};



/***/ },

/***/ 5073
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1236);
/* harmony import */ var swiper_modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(150);



const sliderInit = (container) => {
  const slider = container;
  let sliderNolint;
  if (slider) {
    const swiper = slider.querySelector(".swiper");
    const buttonPrev = slider.querySelector(".slider__button--prev");
    const buttonNext = slider.querySelector(".slider__button--next");
    sliderNolint = new swiper__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A(swiper, {
      modules: [swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Navigation */ .Vx, swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Pagination */ .dK, swiper_modules__WEBPACK_IMPORTED_MODULE_1__/* .Scrollbar */ .Ze],
      // Optional parameters
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: false,
      // Navigation arrows
      navigation: {
        prevEl: buttonPrev,
        nextEl: buttonNext,
        disabledClass: "slider__button--disabled"
      },
      // Scrollbar
      scrollbar: {
        el: ".slider__scrollbar",
        dragClass: "slider__scrollbar-drag",
        draggable: true
      },
      // Responsive breakpoints
      breakpoints: {}
    });
  }
  return sliderNolint;
};
const sliders = document.querySelectorAll(".slider");
sliders.forEach((el, index) => {
  sliderInit(el);
});


/***/ },

/***/ 2275
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5880);


let isAnimating = false;
const createToastyElement = () => {
  const el = document.createElement("div");
  el.classList.add("toasty");
  const img = document.createElement("img");
  img.src = "./assets/images/toasty.png";
  img.alt = "Toasty!";
  el.appendChild(img);
  const caption = document.createElement("div");
  caption.classList.add("toasty__caption");
  caption.textContent = "TOASTY!";
  el.appendChild(caption);
  document.body.appendChild(el);
  return el;
};
const showToasty = () => {
  if (isAnimating) return;
  isAnimating = true;
  let el = document.querySelector(".toasty");
  if (!el) el = createToastyElement();
  const caption = el.querySelector(".toasty__caption");
  gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.set(el, {
    x: "150%",
    bottom: "-25px",
    right: 0,
    position: "fixed",
    zIndex: 9999,
    pointerEvents: "none",
    opacity: 1
  });
  const tl = gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.timeline({
    onComplete: () => {
      el.remove();
      isAnimating = false;
    }
  });
  tl.to(el, {
    x: "0%",
    duration: 0.4,
    ease: "back.out(2)",
    onComplete: () => {
      gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.fromTo(
        caption,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "back.out(3)"
        }
      );
    }
  }).to(el, {
    duration: 0.6
    // пауза
  }).to(el, {
    x: "150%",
    duration: 0.4,
    ease: "back.in(2)"
  });
  const audio = new Audio("./assets/sounds/toasty!.mp3");
  audio.play().catch(() => {
  });
};
let clickTimes = [];
document.addEventListener("click", () => {
  if (isAnimating) return;
  const now = Date.now();
  clickTimes.push(now);
  clickTimes = clickTimes.filter((t) => now - t < 1500);
  if (clickTimes.length >= 5) {
    showToasty();
    clickTimes = [];
  }
});


/***/ },

/***/ 281
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9244);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3670);



const tooltips = document.querySelectorAll(".tooltip");
if (tooltips.length > 0) {
  tooltips.forEach((tooltip) => {
    const main = tooltip.querySelector(".tooltip__main");
    if (main) {
      const options = {
        content(reference) {
          const template = `<div class="tooltip__main">${reference.querySelector(".tooltip__main").innerHTML}</div>`;
          return template;
        },
        placement: "bottom-start",
        allowHTML: true,
        animation: "scale",
        arrow: false,
        maxWidth: 280,
        interactive: true,
        appendTo: () => document.body
      };
      const instance = (0,tippy_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay)(tooltip, options);
      const getChecker = () => {
        if (window.innerWidth > 767 && !instance.state.isEnabled) {
          instance.enable();
        } else if (window.innerWidth <= 767 && instance.state.isEnabled) {
          instance.disable();
        }
      };
      getChecker();
      window.addEventListener("resize", () => {
        getChecker();
      });
      const bottomSheetInit = () => {
        const openSheetButton = tooltip.querySelector(".tooltip__button");
        const newBottomSheet = tooltip.cloneNode(true);
        const body = document.querySelector("body");
        const bottomSheet = newBottomSheet.querySelector(".tooltip__wrapper");
        const sheetContents = bottomSheet.querySelector(".tooltip__main");
        const draggableArea = bottomSheet.querySelector(".tooltip__drag");
        let height;
        let sheetHeight;
        const animateIn = () => {
          sheetContents.style.height = "";
          sheetContents.removeEventListener("transitionend", animateIn);
        };
        const setSheetHeight = (value) => {
          sheetHeight = Math.max(0, Math.min(100, value));
          sheetContents.style.height = `${sheetHeight}vh`;
          if (sheetHeight === 100) {
            sheetContents.classList.add("tooltip__main--full");
          } else {
            sheetContents.classList.remove("tooltip__main--full");
          }
        };
        const setIsSheetShown = (value) => {
          bottomSheet.setAttribute("aria-hidden", String(!value));
          if (value) {
            (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__/* .getPaddingOnBody */ .rP)();
          } else {
            (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__/* .getPaddingFromBody */ .iW)();
            sheetContents.addEventListener("transitionend", animateIn);
          }
        };
        openSheetButton.addEventListener("click", () => {
          if (window.innerWidth < 768) {
            body.appendChild(newBottomSheet);
            height = sheetContents.offsetHeight / document.documentElement.clientHeight * 100;
            setSheetHeight(Math.min(height, 100));
            setIsSheetShown(true);
          }
        });
        bottomSheet.querySelector(".tooltip__close").addEventListener("click", () => {
          setIsSheetShown(false);
          setTimeout(() => {
            newBottomSheet.remove();
          }, 500);
        });
        bottomSheet.querySelector(".tooltip__overlay").addEventListener("click", () => {
          setIsSheetShown(false);
          setTimeout(() => {
            newBottomSheet.remove();
          }, 500);
        });
        const touchPosition = (event) => event.touches ? event.touches[0] : event;
        let dragPosition;
        const onDragStart = (event) => {
          dragPosition = touchPosition(event).pageY;
          sheetContents.classList.add("not-selectable");
        };
        const onDragMove = (event) => {
          if (dragPosition === void 0) return;
          const y = touchPosition(event).pageY;
          const deltaY = dragPosition - y;
          const deltaHeight = deltaY / window.innerHeight * 100;
          setSheetHeight(sheetHeight + deltaHeight);
          dragPosition = y;
        };
        const onDragEnd = () => {
          dragPosition = void 0;
          sheetContents.classList.remove("not-selectable");
          if (sheetHeight < height / 2) {
            setIsSheetShown(false);
          } else if (sheetHeight > height) {
            setSheetHeight(height);
          } else {
            setSheetHeight(height);
          }
        };
        draggableArea.addEventListener("mousedown", onDragStart);
        draggableArea.addEventListener("touchstart", onDragStart);
        window.addEventListener("mousemove", onDragMove);
        window.addEventListener("touchmove", onDragMove);
        window.addEventListener("mouseup", onDragEnd);
        window.addEventListener("touchend", onDragEnd);
      };
      bottomSheetInit();
    }
  });
}


/***/ },

/***/ 5057
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const up = document.querySelector(".up");
const scrollableHeight = 300;
if (up) {
  let scrollPosition = 0;
  up.addEventListener("click", () => {
    window.scroll(0, 0);
  });
  window.addEventListener("scroll", () => {
    if (window.pageYOffset <= scrollPosition && window.pageYOffset >= scrollableHeight) {
      up.classList.add("up--visible");
      scrollPosition = window.pageYOffset;
    } else {
      up.classList.remove("up--visible");
      scrollPosition = window.pageYOffset;
    }
  });
}


/***/ },

/***/ 4489
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   focusFirstInput: () => (/* binding */ focusFirstInput),
/* harmony export */   initAgreeCheckbox: () => (/* binding */ initAgreeCheckbox),
/* harmony export */   initChoicesValidation: () => (/* binding */ initChoicesValidation),
/* harmony export */   initFileLoadInput: () => (/* binding */ initFileLoadInput),
/* harmony export */   initPasswordEye: () => (/* binding */ initPasswordEye),
/* harmony export */   initSelectValidation: () => (/* binding */ initSelectValidation),
/* harmony export */   maskInternationalPhone: () => (/* binding */ maskInternationalPhone),
/* harmony export */   maskNumber: () => (/* binding */ maskNumber),
/* harmony export */   maskPhone: () => (/* binding */ maskPhone),
/* harmony export */   maskSimplePhone: () => (/* binding */ maskSimplePhone),
/* harmony export */   validateForm: () => (/* binding */ validateForm)
/* harmony export */ });
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1660);
/* harmony import */ var inputmask__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inputmask__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var formbouncerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4891);
/* harmony import */ var formbouncerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(formbouncerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8019);
/* harmony import */ var choices_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(choices_js__WEBPACK_IMPORTED_MODULE_2__);




const validateForm = (form) => {
  const forma = document.querySelector(`${form}`);
  let validator = new (formbouncerjs__WEBPACK_IMPORTED_MODULE_1___default())(form, {
    fieldClass: "validator__input--error",
    errorClass: "validator__error",
    disableSubmit: true,
    emitEvents: true,
    // messageAfterField: false,
    patterns: {
      email: /([a-zA-ZА-Яа-я0-9._-]+@[a-zA-ZА-Яа-я0-9._-]+\.([a-zA-ZА-Яа-я0-9])+)/
    },
    customValidations: {
      required(field) {
        const selector = field.classList.contains("validator__required");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.value !== "") {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      text(field) {
        const selector = field.classList.contains("validator__text");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const textRegexp = new RegExp(/^([a-zA-ZА-Яа-яЁё.-]+\s?)*$/);
        if (field.value.match(textRegexp) && field.value.length >= 2 && field.value.length <= 225) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      textarea(field) {
        const selector = field.classList.contains("validator__textarea");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const textRegexp = new RegExp(/^([a-zA-ZА-Яа-яЁё0-9-!$%^&amp;*()_+|~=`{}[\]:;;&lt;&gt;?",.@#№'&quot;„;“;“;”;‘;’;(?!…)«;»;/|/\\/]+\s?)*$/);
        if (field.value.match(textRegexp) && field.value.length >= 4 && field.value.length <= 225) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      select(field) {
        const selector = field.classList.contains("validator__select");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.options[field.selectedIndex].value !== "") {
          field.parentElement.classList.remove("validator__input--error");
          return false;
        }
        field.parentElement.classList.add("validator__input--error");
        return true;
      },
      choices(field) {
        const selector = field.classList.contains("validator__choices");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const select = field.parentElement;
        select.addEventListener("change", () => {
          if (field.options[field.selectedIndex].value !== "") {
            select.classList.remove("validator__input--error");
            select.classList.add("validator__input--valid");
          }
        });
        if (field.options[field.selectedIndex].value !== "") {
          select.classList.remove("validator__input--error");
          select.classList.add("validator__input--valid");
          return false;
        }
        select.classList.add("validator__input--error");
        select.classList.remove("validator__input--valid");
        return true;
      },
      number(field) {
        const selector = field.classList.contains("validator__number");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.value.length >= 1 && field.value.length <= 225) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      minmax(field) {
        const selector = field.classList.contains("validator__minmax");
        const min = field.getAttribute("minlength");
        const max = field.getAttribute("maxlength");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.value.length >= min && field.value.length <= max) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      email(field) {
        const selector = field.classList.contains("validator__mail");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const checkPattern = (value) => {
          const regexPattern = /([a-zA-ZА-Яа-я0-9._-]+@[a-zA-ZА-Яа-я0-9._-]+\.([a-zA-ZА-Яа-я0-9])+)/;
          return regexPattern.test(value);
        };
        const isValid = checkPattern(field.value);
        if (isValid) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      ruPhone(field) {
        const selector = field.classList.contains("validator__phone");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.value.length === 10) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      intPhone(field) {
        const selector = field.classList.contains("validator__country-phone");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        if (field.value.length === field.getAttribute("data-mask").length) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      password(field) {
        const selector = field.classList.contains("validator__password");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const checkPattern = (value) => {
          const regexPattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,64}$/;
          return regexPattern.test(value);
        };
        const isValid = checkPattern(field.value);
        if (isValid) {
          field.classList.add("validator__input--valid");
          return false;
        }
        field.classList.remove("validator__input--valid");
        return true;
      },
      passwordMatch(field) {
        const selector = field.getAttribute("data-bouncer-match");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const otherField = field.form.querySelector(selector);
        if (!otherField) return false;
        return otherField.value !== field.value;
      },
      checkbox(field) {
        const selector = field.classList.contains("validator__checkbox");
        if (!selector) return false;
        if (selector.disabled === true) return false;
        const { name } = field.dataset;
        const list = document.querySelectorAll(`.validator__checkbox[data-name="${name}"]`);
        for (let i = 0; i < list.length; i += 1) {
          const item = list[i];
          if (item.checked) {
            field.classList.add("validator__input--valid");
            list.forEach((e) => {
              e.classList.remove("validator__input--error");
            });
            return false;
          }
        }
        field.classList.remove("validator__input--valid");
        return true;
      }
    },
    messages: {
      missingValue: {
        default: "\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F!",
        file: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u0444\u0430\u0439\u043B!",
        tel: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D!"
      },
      patternMismatch: {
        default: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \u043D\u0435 \u0443\u0434\u043E\u0432\u043B\u0435\u0442\u0432\u043E\u0440\u044F\u0435\u0442 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C!"
      },
      wrongLength: {
        over: "wrongLength over",
        under: "wrongLength under"
      },
      outOfRange: {
        over: "outOfRange over",
        under: "outOfRange under"
      },
      text: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E!",
      textarea: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E!",
      number: "\u0414\u043E\u043F\u0443\u0441\u043A\u0430\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0446\u0438\u0444\u0440\u044B!",
      ruPhone: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D!",
      intPhone: "\u0412\u044B\u0431\u0435\u0440\u0438 \u0438 \u0432\u0432\u0435\u0434\u0438 \u043C\u0435\u0436\u0434\u043E\u043D\u0430\u0440\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D!",
      password: '\u041F\u0430\u0440\u043E\u043B\u044C \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0434\u043B\u0438\u043D\u043E\u0439 \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 8 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432, \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u0446\u0438\u0444\u0440\u0443, \u0441\u0442\u0440\u043E\u0447\u043D\u0443\u044E \u0438 \u0437\u0430\u0433\u043B\u0430\u0432\u043D\u0443\u044E \u043B\u0430\u0442\u0438\u043D\u0441\u043A\u0443\u044E \u0431\u0443\u043A\u0432\u0443, \u0430 \u0442\u0430\u043A\u0436\u0435 \u0441\u043F\u0435\u0446\u0441\u0438\u043C\u0432\u043E\u043B ,.<>/?;:"[]{}|`~!@#$%^&*()_+=-.',
      passwordMatch: "\u041F\u0430\u0440\u043E\u043B\u0438 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442.",
      required: "\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043F\u043E\u043B\u0435!"
    }
  });
  const oldValidate = validator.validate;
  validator.validate = (field, options) => {
    if (field.closest("fieldset") && field.closest("fieldset").disabled) {
      return false;
    }
    return oldValidate(field, options);
  };
  forma.addEventListener("reset", () => {
    validator.destroy();
    validator = validateForm(form);
    forma.querySelectorAll(".validator__input--valid").forEach((input) => {
      input.classList.remove("validator__input--valid");
    });
    forma.querySelectorAll(".validator__input--error").forEach((input) => {
      input.classList.remove("validator__input--error");
    });
    forma.querySelectorAll("textarea").forEach((textarea) => {
      textarea.setAttribute("style", "overflow-y: hidden;");
    });
  });
  return validator;
};
const maskNumber = (form, maxNumber) => {
  const numberMask = new (inputmask__WEBPACK_IMPORTED_MODULE_0___default())(`9{0,${maxNumber}}`, {
    autoUnmask: true,
    showMaskOnHover: false
  });
  const inputsContainer = document.querySelector(`${form}`);
  const inputs = inputsContainer.querySelectorAll(".validator__number");
  inputs.forEach((field) => {
    numberMask.mask(field);
  });
};
const maskSimplePhone = (form) => {
  const mask = function() {
    let matrix = "+7 (___) ___ ____", i = 0, def = matrix.replace(/\D/g, ""), val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
    });
  };
  const phonesContainer = document.querySelector(`${form}`);
  const inputs = phonesContainer.querySelectorAll(".validator__simple-phone");
  inputs.forEach((phone) => {
    phone.addEventListener("input", mask);
  });
};
const maskPhone = (form, classPhone) => {
  const phoneMask = new (inputmask__WEBPACK_IMPORTED_MODULE_0___default())("+7 [(999) 999-99-99]", {
    autoUnmask: true,
    showMaskOnHover: false,
    showMaskOnFocus: true
  });
  const phoneContainers = document.querySelectorAll(`${form}`);
  if (phoneContainers.length) {
    phoneContainers.forEach((phoneContainer) => {
      const inputs = phoneContainer.querySelectorAll(`${classPhone}`);
      inputs.forEach((phone) => {
        phoneMask.mask(phone);
      });
    });
  }
};
const maskInternationalPhone = (form) => {
  const hashContainer = document.querySelector(`${form}`);
  const countryPhone = hashContainer.querySelector(".validator__country-phone");
  const firstPhoneMask = hashContainer.querySelector(".validator__country-mask").getAttribute("data-mask");
  countryPhone.setAttribute("data-mask", firstPhoneMask.replace(/[^9]/g, ""));
  let phoneMask = new (inputmask__WEBPACK_IMPORTED_MODULE_0___default())(firstPhoneMask, {
    autoUnmask: true
  });
  phoneMask.mask(countryPhone);
  const options = [];
  const optionsData = hashContainer.querySelectorAll(".validator__country-mask");
  optionsData.forEach((option, index) => {
    options.push({
      value: option.getAttribute("data-value"),
      label: option.getAttribute("data-country"),
      id: index + 1,
      customProperties: {
        mask: option.getAttribute("data-mask"),
        flag: option.getAttribute("data-flag")
      }
    });
  });
  const choicesSelect = hashContainer.querySelector(".validator__country-select");
  const choicesNolint = new (choices_js__WEBPACK_IMPORTED_MODULE_2___default())(choicesSelect, {
    searchEnabled: false,
    itemSelectText: "",
    shouldSort: false,
    choices: options,
    // searchEnabled: true,
    classNames: {
      containerOuter: "choices validator__countries"
    },
    callbackOnCreateTemplates(template) {
      return {
        item(classNames, data) {
          return template(`
            <div class="${classNames.item} ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable} 
            ${data.placeholder ? classNames.placeholder : ""}" 
            data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ""} 
            ${data.disabled ? 'aria-disabled="true"' : ""}> 
            <p class='choices__flag' style='background-image: url(${options[data.choiceId - 1].customProperties.flag})'></p>
            ${data.label}
            </div>
          `);
        },
        choice(classNames, data) {
          return template(`
            <div class="${classNames.item} ${classNames.itemChoice} 
            ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}"
            data-select-text="${this.config.itemSelectText}" data-choice 
            ${data.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable"} 
            data-id="${data.id}" data-value="${data.value}" 
            ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
            <p class='choices__flag' style='background-image: url(${options[data.id - 1].customProperties.flag})'></p>
            ${data.label}
            </div>
          `);
        }
      };
    }
  });
  choicesSelect.addEventListener("choice", (evt) => {
    countryPhone.setAttribute("data-mask", evt.detail.choice.customProperties.mask.replace(/[^9]/g, ""));
    countryPhone.inputmask.remove();
    countryPhone.value = "";
    countryPhone.focus();
    countryPhone.blur();
    phoneMask = new (inputmask__WEBPACK_IMPORTED_MODULE_0___default())(evt.detail.choice.customProperties.mask, {
      autoUnmask: true
    });
    phoneMask.mask(countryPhone);
  });
};
const initPasswordEye = (form) => {
  const eyeContainers = document.querySelectorAll(`${form}`);
  eyeContainers.forEach((eyeContainer) => {
    const eyeList = eyeContainer.querySelectorAll(".validator__eye");
    eyeList.forEach((item) => {
      const eye = item;
      const input = eye.parentElement.querySelector('input[type="password"]');
      if (input) {
        eye.addEventListener("click", () => {
          eye.classList.toggle("validator__eye--open");
          if (input.type === "password") {
            input.type = "text";
          } else {
            input.type = "password";
          }
        });
      }
    });
  });
};
const initFileLoadInput = (form, template) => {
  const FILE_TYPES = ["jpg", "jpeg", "gif", "png"];
  const filesForm = document.querySelector(`${form}`);
  const filesContainer = filesForm.querySelector(".validator__file-container");
  const loadInput = filesContainer.querySelector(".validator__file-input");
  const sizeWarning = filesContainer.querySelector(".validator__size-warning");
  const loadedFilesContainer = filesForm.querySelector(".validator__loaded-files");
  const cleaner = filesForm.querySelector(".validator__cleaner");
  const submitButton = filesForm.querySelector('button[type="submit"]');
  cleaner.style.display = "none";
  filesForm.addEventListener("reset", () => {
    filesContainer.innerHTML = "";
    filesContainer.innerHTML = template;
    loadedFilesContainer.innerHTML = "";
    initFileLoadInput(`${form}`, template);
  }, { once: true });
  cleaner.addEventListener("click", () => {
    filesContainer.innerHTML = "";
    filesContainer.innerHTML = template;
    loadedFilesContainer.innerHTML = "";
    initFileLoadInput(`${form}`, template);
    submitButton.classList.remove("validator__submit--disabled");
    submitButton.disabled = false;
  });
  loadInput.addEventListener("change", () => {
    const files = Object.values(loadInput.files);
    loadedFilesContainer.innerHTML = "";
    let totalSize = 0;
    files.forEach((file) => {
      totalSize += file.size;
    });
    if (totalSize > 0) {
      cleaner.style.display = "grid";
    } else {
      cleaner.style.display = "none";
    }
    for (let i = 0; i < files.length; i += 1) {
      const fileName = files[i].name.toLowerCase();
      if (!FILE_TYPES.some((type) => fileName.endsWith(type))) {
        submitButton.classList.add("validator__submit--disabled");
        submitButton.disabled = true;
        sizeWarning.classList.add("validator__size-warning--exeeded");
        sizeWarning.textContent = "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u043E\u0432!";
        return;
      }
    }
    if (totalSize < 10485760 && files.length <= 3) {
      sizeWarning.classList.remove("validator__size-warning--exeeded");
      sizeWarning.textContent = "\u0414\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 3-\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 .jpeg, .gif, .png. \u0420\u0430\u0437\u043C\u0435\u0440 \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 10 MB.";
      files.forEach((file) => {
        let str = file.size;
        str = str.toString();
        str = Math.ceil(str / 1024);
        const fileTemplate = `
          <div class="validator__file">
            <p class="validator__file-name">${file.name}</p>
            <p class='validator__size'>${str}&nbsp;\u041A\u0411</p>
          </div>
          `;
        loadedFilesContainer.insertAdjacentHTML("beforeend", fileTemplate);
      });
      submitButton.classList.remove("validator__submit--disabled");
      submitButton.disabled = false;
    } else if (totalSize > 10241440) {
      submitButton.classList.add("validator__submit--disabled");
      submitButton.disabled = true;
      sizeWarning.classList.add("validator__size-warning--exeeded");
      sizeWarning.textContent = "\u0420\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u043E\u0432 \u043D\u0435 \u0434\u043E\u043B\u0436\u0435\u043D \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0442\u044C 10 \u041C\u0411!";
    } else if (files.length > 3) {
      submitButton.classList.add("validator__submit--disabled");
      submitButton.disabled = true;
      sizeWarning.classList.add("validator__size-warning--exeeded");
      sizeWarning.textContent = "\u041F\u0440\u0435\u0432\u044B\u0448\u0435\u043D \u043B\u0438\u043C\u0438\u0442 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u0430 \u0444\u0430\u0439\u043B\u043E\u0432!";
    }
  });
};
const initSelectValidation = (form) => {
  const formContainer = document.querySelector(`${form}`);
  const nativeSelects = formContainer.querySelectorAll(".validator__select");
  nativeSelects.forEach((select) => {
    select.addEventListener("change", () => {
      if (select.parentElement.classList.contains("validator__input--error")) {
        select.parentElement.classList.remove("validator__input--error");
      }
    });
  });
};
const initChoicesValidation = (form) => {
  const formContainer = document.querySelector(`${form}`);
  const nativeSelects = formContainer.querySelectorAll(".validator__choices");
  nativeSelects.forEach((select) => {
    const field = select.parentElement.parentElement.parentElement;
    const customSelect = field.querySelector(".choices__inner");
    select.addEventListener("change", () => {
      if (customSelect.classList.contains("validator__input--error")) {
        customSelect.classList.remove("validator__input--error");
      }
    });
  });
};
const focusFirstInput = (form) => {
  const formContainer = document.querySelector(`${form}`);
  const input = formContainer.querySelector("input");
  input.focus();
};
const initAgreeCheckbox = (form) => {
  const checkboxContainer = document.querySelector(`${form}`);
  const checkboxLabel = checkboxContainer.querySelector(".validator__legal");
  const checkbox = checkboxContainer.querySelector(".validator__agree");
  const submitButton = checkboxContainer.querySelector('button[type="submit"]');
  checkboxLabel.addEventListener("click", () => {
    const isExeeded = checkboxContainer.querySelector(".validator__size-warning--exeeded");
    if (isExeeded) {
      submitButton.classList.add("validator__submit--disabled");
      submitButton.disabled = true;
      if (checkbox.checked === true) {
        checkbox.checked = false;
      } else {
        checkbox.checked = true;
      }
    } else if (checkbox.checked === true) {
      submitButton.classList.add("validator__submit--disabled");
      submitButton.disabled = true;
      checkbox.setAttribute("checked", false);
    } else {
      submitButton.classList.remove("validator__submit--disabled");
      submitButton.disabled = false;
      checkbox.setAttribute("checked", true);
    }
  });
};



/***/ },

/***/ 2305
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const generateURL = (id) => {
  const query = "?rel=0&showinfo=0&autoplay=1";
  return `https://www.youtube.com/embed/${id}${query}`;
};
const createIframe = (id) => {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("allowfullscreen", "");
  iframe.setAttribute("allow", "autoplay");
  iframe.setAttribute("src", generateURL(id));
  iframe.classList.add("video__media");
  return iframe;
};
const parseMediaURL = (video) => {
  const regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  const url = video.href;
  const match = url.match(regexp);
  return match[1];
};
const setupVideo = (video) => {
  const link = video.querySelector(".video__link");
  const button = video.querySelector(".video__button");
  const source = video.querySelector("source");
  const media = video.querySelector(".video__media");
  const id = parseMediaURL(link);
  source.setAttribute("srcset", `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`);
  media.setAttribute("src", `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);
  video.addEventListener("click", () => {
    const iframe = createIframe(id);
    link.remove();
    button.remove();
    video.appendChild(iframe);
  });
  link.removeAttribute("href");
  video.classList.add("video--enabled");
};
const findVideos = () => {
  document.querySelectorAll(".video__wrapper").forEach((el) => {
    setupVideo(el);
  });
};
findVideos();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findVideos);


/***/ },

/***/ 3057
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5880);
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6575);
/* harmony import */ var gsap_SplitText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9373);



gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_1__/* .ScrollTrigger */ .u, gsap_SplitText__WEBPACK_IMPORTED_MODULE_2__/* .SplitText */ .A);
const initScrollRevealSplitRandomJump = (selector) => {
  document.querySelectorAll(selector).forEach((title) => {
    const split = new gsap_SplitText__WEBPACK_IMPORTED_MODULE_2__/* .SplitText */ .A(title, { type: "chars, words" });
    const chars = split.chars;
    chars.forEach((char) => {
      char.style.display = "inline-block";
      char.style.transform = "translateZ(0)";
      char.style.backfaceVisibility = "hidden";
      char.style.willChange = "transform, opacity";
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.from(chars, {
      // рандомное смещение по Y для каждой буквы
      y: () => gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.utils.random(20, 100),
      opacity: 0,
      rotation: 0,
      duration: 1,
      ease: "power3.out",
      delay: () => Math.random() * 0.8,
      // рандомная задержка
      scrollTrigger: {
        trigger: title,
        start: "top bottom"
      },
      onComplete: () => {
        chars.forEach((char) => {
          gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.to(char, {
            y: "+=" + gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.utils.random(-5, 5),
            rotation: gsap__WEBPACK_IMPORTED_MODULE_0__/* .gsap */ .os.utils.random(-3, 3),
            duration: 1 + Math.random(),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
        });
      }
    });
  });
};
initScrollRevealSplitRandomJump(".wave-text");


/***/ },

/***/ 2079
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

const widget = document.querySelector(".widget");
if (widget) {
  const widgetClose = widget.querySelector(".widget__close");
  const widgetOverlay = widget.querySelector(".widget__overlay");
  const body = document.querySelector("body");
  const getWidgetWork = () => {
    const isActive = widget.classList.contains("widget--active");
    if (!isActive) {
      widget.classList.add("widget--active");
      widgetClose.classList.add("widget__close--active");
      body.classList.add("fixed");
    } else {
      widget.classList.remove("widget--active");
      widgetClose.classList.remove("widget__close--active");
      body.classList.remove("fixed");
    }
  };
  widgetClose.addEventListener("click", () => {
    getWidgetWork();
  });
  widgetOverlay.addEventListener("click", () => {
    getWidgetWork();
  });
  const currentPage = window.location.pathname.split("/").pop();
  const links = widget.querySelectorAll("li a");
  links.forEach((link) => {
    const page = link.href.split("/").pop();
    if (page === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}


/***/ },

/***/ 6919
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _validator_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4489);
/* harmony import */ var _popUp_popUp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9417);
/* harmony import */ var _video_video__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2305);
/* harmony import */ var _alert_alert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4009);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3670);





window.Corners5ProjectLayout = {
  validation: {
    validateForm: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.validateForm,
    maskSimplePhone: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.maskSimplePhone,
    maskNumber: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.maskNumber,
    maskPhone: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.maskPhone,
    maskInternationalPhone: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.maskInternationalPhone,
    initPasswordEye: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.initPasswordEye,
    initAgreeCheckbox: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.initAgreeCheckbox,
    initFileLoadInput: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.initFileLoadInput,
    focusFirstInput: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.focusFirstInput,
    initSelectValidation: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.initSelectValidation,
    initChoicesValidation: _validator_validator__WEBPACK_IMPORTED_MODULE_0__.initChoicesValidation
  },
  summonPopUp: _popUp_popUp__WEBPACK_IMPORTED_MODULE_1__.summonPopUp,
  removePopUp: _popUp_popUp__WEBPACK_IMPORTED_MODULE_1__.removePopUp,
  findVideos: _video_video__WEBPACK_IMPORTED_MODULE_2__["default"],
  summonAlert: _alert_alert__WEBPACK_IMPORTED_MODULE_3__.summonAlert,
  removeAlert: _alert_alert__WEBPACK_IMPORTED_MODULE_3__.removeAlert,
  getPaddingOnBody: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .getPaddingOnBody */ .rP,
  getPaddingFromBody: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .getPaddingFromBody */ .iW,
  getScrollbarWidth: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .getScrollbarWidth */ .XJ,
  createFormData: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .createFormData */ .$W,
  setTextareaAutoHeight: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .setTextareaAutoHeight */ .Bs,
  setStatus: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .setStatus */ .Lx,
  startTimer: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .startTimer */ .Ip,
  debounce: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .debounce */ .sg,
  activateRequestButtons: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .activateRequestButtons */ .Qs,
  updateButtonState: _utils_utils__WEBPACK_IMPORTED_MODULE_4__/* .updateButtonState */ .Dl
};


/***/ },

/***/ 6153
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3670);
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4947);
/* harmony import */ var tippy_js_animations_scale_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6730);
/* harmony import */ var tippy_js_animations_scale_subtle_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(814);
/* harmony import */ var tippy_js_animations_scale_extreme_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5309);
/* harmony import */ var _components_components_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2820);
/* harmony import */ var _components_components_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_components_components_js__WEBPACK_IMPORTED_MODULE_5__);
const import_meta = {};
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(__webpack_require__(4078));











let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
window.addEventListener("resize", () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

if (import_meta.webpackHot) {
  import_meta.webpackHot.accept();
}


/***/ },

/***/ 3670
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $W: () => (/* binding */ createFormData),
/* harmony export */   Bs: () => (/* binding */ setTextareaAutoHeight),
/* harmony export */   Dl: () => (/* binding */ updateButtonState),
/* harmony export */   Ip: () => (/* binding */ startTimer),
/* harmony export */   Lx: () => (/* binding */ setStatus),
/* harmony export */   Qs: () => (/* binding */ activateRequestButtons),
/* harmony export */   XJ: () => (/* binding */ getScrollbarWidth),
/* harmony export */   iW: () => (/* binding */ getPaddingFromBody),
/* harmony export */   rP: () => (/* binding */ getPaddingOnBody),
/* harmony export */   sg: () => (/* binding */ debounce),
/* harmony export */   wj: () => (/* binding */ initScrollRevealChain)
/* harmony export */ });
/* unused harmony exports shuffle, numberSplitter, PHONE_REG_EXP, INN_REG_EXP, BIRTHDAY_REG_EXP, TOKEN, scrollToErrorField */
/* harmony import */ var viewerjs_dist_viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3891);
/* harmony import */ var viewerjs_dist_viewer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(viewerjs_dist_viewer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5880);
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6575);
/* harmony import */ var gsap_SplitText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9373);
/* harmony import */ var _components_alert_alert__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4009);
/* harmony import */ var _components_popUp_popUp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9417);
/* harmony import */ var _components_validator_validator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4489);
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};






gsap__WEBPACK_IMPORTED_MODULE_1__/* .gsap */ .os.registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_2__/* .ScrollTrigger */ .u, gsap_SplitText__WEBPACK_IMPORTED_MODULE_3__/* .SplitText */ .A);



const PHONE_REG_EXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
const BIRTHDAY_REG_EXP = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
const INN_REG_EXP = /^(([0 - 9]{12})| ([0 - 9]{10}))?$/;
const TOKEN = "d11e752ae788e61213f01ae6952bdbd85ceaa025";
const body = document.querySelector("body");
const header = document.querySelector(".header__fixed");
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
let checker = false;
const getPaddingOnBody = () => {
  const modal = document.querySelector(".Modal");
  const popUps = document.querySelectorAll(".popUp");
  const alertWrapper = document.querySelector(".alert-wrapper");
  if (!checker) {
    body.style.paddingRight = `${getScrollbarWidth()}px`;
    if (header) {
      header.style.paddingRight = `${getScrollbarWidth()}px`;
    }
    if (modal) {
      modal.style.paddingRight = `${getScrollbarWidth()}px`;
    }
    if (popUps) {
      popUps.forEach((popUp) => {
        popUp.style.paddingRight = `${getScrollbarWidth()}px`;
      });
    }
    if (alertWrapper) {
      alertWrapper.style.paddingRight = `${getScrollbarWidth()}px`;
    }
    body.classList.add("static");
    checker = true;
  }
};
const getPaddingFromBody = () => {
  const modal = document.querySelector(".Modal");
  const popUps = document.querySelectorAll(".popUp");
  const alertWrapper = document.querySelector(".alert-wrapper");
  if (checker) {
    body.style.paddingRight = "";
    if (header) {
      header.style.paddingRight = "";
    }
    if (modal) {
      modal.style.paddingRight = "";
    }
    if (popUps) {
      popUps.forEach((popUp) => {
        popUp.style.paddingRight = "";
      });
    }
    if (alertWrapper) {
      alertWrapper.style.paddingRight = "";
    }
    body.classList.remove("static");
    checker = false;
  }
};
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
const numberSplitter = (num) => {
  const n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1 ");
};
function OnInput() {
  this.style.height = "auto";
  this.style.height = `${this.scrollHeight}px`;
}
const setTextareaAutoHeight = (area) => {
  const textareas = document.querySelectorAll(`${area}`);
  textareas.forEach((element) => {
    element.setAttribute("style", `height:${element.scrollHeight}px; overflow-y: hidden;`);
    element.addEventListener("input", OnInput);
  });
};
const isObject = (object) => {
  const type = typeof object;
  return type === "function" || type === "object";
};
const createFormData = (values) => {
  const data = new FormData();
  for (const key in values) {
    if (isObject(values[key])) {
      values[key].forEach((file, index) => {
        data.append(`${key}-${index}`, file);
      });
    } else {
      data.append(key, values[key]);
    }
  }
  return data;
};
const startTimer = (container, btn, tm) => {
  const button = btn;
  let time = tm;
  const timer = setInterval(() => {
    if (time < 1) {
      button.removeAttribute("disabled");
      container.style.display = "none";
      clearInterval(timer);
    } else {
      time -= 1;
      container.style.display = "";
      container.querySelector("b").textContent = `00:${String(time).padStart(2, "0")}`;
    }
  }, 1e3);
  return timer;
};
const debounce = (cb, delay = 500) => {
  let timeoutId;
  return function(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  };
};
const scrollToErrorField = (form) => {
  form.addEventListener("bouncerFormInvalid", () => {
    const firstError = form.querySelector(".validator__input--error");
    const scrollToFirstError = (error) => {
      error.style.scrollMarginTop = "140px";
      error.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    };
    setTimeout(() => {
      scrollToFirstError(firstError);
    }, 100);
  });
};
const setStatus = (status) => {
  switch (status) {
    case "success":
      return "alert--blue";
    case "exclam":
      return "alert--star";
    case "error":
      return "alert--red";
    default:
      return "";
  }
};
const updateButtonState = (name) => {
  const checkbox = document.querySelector(`input[name="${name}"]`);
  const button = document.querySelector(`button[data-checkbox-name="${name}"]`);
  if (checkbox && button) {
    button.disabled = !checkbox.checked;
  }
};
const activateRequestButtons = (func) => {
  const buttons = document.querySelectorAll(".button-request:not(.button-request--js)");
  buttons.forEach((button) => {
    button.classList.add("button-request--js");
    button.addEventListener("click", (evt) => {
      evt.preventDefault();
      const _a = button.dataset, { type } = _a, info = __objRest(_a, ["type"]);
      if (!type) {
        console.warn("\u0423 \u043A\u043D\u043E\u043F\u043A\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D data-type, \u043C\u043E\u0434\u0430\u043B\u043A\u0430 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u0432\u044B\u0437\u0432\u0430\u043D\u0430");
        return;
      }
      const modalSelector = `#modal--${type}`;
      const modalClass = `.modal--${type}`;
      (0,_components_popUp_popUp__WEBPACK_IMPORTED_MODULE_5__.summonPopUp)(modalSelector, true);
      const modal = document.querySelector(modalClass);
      if (!modal) {
        console.log(`\u041C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u043A\u043D\u043E ${modalSelector} \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E`);
        return;
      }
      setTextareaAutoHeight(`${modalClass} textarea`);
      const buttonForCheckbox = modal.querySelector("button[data-checkbox-name]");
      if (buttonForCheckbox) {
        const name = buttonForCheckbox.dataset.checkboxName;
        const checkbox = document.querySelector(`input[name="${name}"]`);
        updateButtonState(name);
        if (checkbox) {
          checkbox.addEventListener("change", () => updateButtonState(name));
        }
      }
      const form = modal.querySelector("form");
      if (form) {
        Object.entries(info).forEach(([key, value]) => {
          form.insertAdjacentHTML("beforeend", `<input type="hidden" name="${key}" value="${value}">`);
        });
        const validatedForm = (0,_components_validator_validator__WEBPACK_IMPORTED_MODULE_6__.validateForm)(`${modalClass} form`);
        (0,_components_validator_validator__WEBPACK_IMPORTED_MODULE_6__.maskPhone)(modalClass, 'input[type="tel"]');
        form.addEventListener("bouncerFormValid", debounce(() => {
          if (!func) return;
          const answer = func(form);
          if (answer && answer.responseJSON && answer.responseJSON.status === "success") {
            validatedForm.destroy();
            (0,_components_popUp_popUp__WEBPACK_IMPORTED_MODULE_5__.removePopUp)(modalClass, true);
            (0,_components_alert_alert__WEBPACK_IMPORTED_MODULE_4__.summonAlert)({
              template: "#alert--blue",
              text: answer.responseJSON.text
            });
          }
        }));
      }
    });
  });
};
const blurHandler = (event) => {
  if (!event.target.form) return;
  const field = event.target;
  const cuttedSpacesValue = field.value.replace(/\s\s+/g, " ");
  const trimmedValue = cuttedSpacesValue.trim();
  field.value = trimmedValue;
};
document.addEventListener("blur", blurHandler, true);
const initScrollRevealChain = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    const base = Math.floor(Math.random() * 10) * 50;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const randomY = base * direction;
    gsap__WEBPACK_IMPORTED_MODULE_1__/* .gsap */ .os.from(el, {
      y: randomY,
      x: 0,
      z: 0,
      opacity: 0,
      duration: 1,
      delay: index * 0.2,
      // нарастающая задержка
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top bottom"
        // toggleActions: "play none none reverse",
      }
    });
  });
};
const viewerImgInit = () => {
  const imgList = document.querySelectorAll("img[data-original]:not([viewerjs-init])");
  imgList.forEach((img) => {
    img.setAttribute("viewerjs-init", "");
    const viewer = new (viewerjs_dist_viewer__WEBPACK_IMPORTED_MODULE_0___default())(img, {
      url: "data-original",
      className: "viewerjs__zoom",
      toolbar: {
        zoomIn: {
          show: true,
          size: "large"
        },
        zoomOut: {
          show: true,
          size: "large"
        },
        oneToOne: false,
        reset: false,
        prev: {
          show: true,
          size: "large"
        },
        play: false,
        next: {
          show: true,
          size: "large"
        },
        rotateLeft: {
          show: true,
          size: "large"
        },
        rotateRight: {
          show: true,
          size: "large"
        },
        flipHorizontal: false,
        flipVertical: false
      },
      navbar: false,
      // movable: false,
      keyboard: true,
      title() {
        return `(${this.index + 1}/${this.length})`;
      },
      // slideOnTouch: false,
      transition: false,
      show() {
        getPaddingOnBody();
      },
      hide() {
        getPaddingFromBody();
      }
    });
  });
};
viewerImgInit();



/***/ },

/***/ 2640
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-5corners",
  "use": "icon-5corners-usage",
  "viewBox": "0 0 17 17",
  "content": "<symbol viewBox=\"0 0 17 17\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-5corners\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6.80933 13.6926L6.83265 13.7384L7.74211 16.5366L13.9685 11.4678L13.9918 11.4449H17L14.0151 4.03667L14.9479 1.23852L6.85744 1.74301L8.83845 3.1642L13.9221 4.03575L13.9921 4.05868H14.0154L13.2459 6.32931L13.8988 10.7559L13.9921 11.4439H13.9688H12.4297L11.5435 11.421L6.83296 13.7146V13.6687L6.08674 11.421L2.42556 7.72838L2.51884 7.65957L4.40772 6.30637L6.24997 2.86603L6.85628 1.76512V1.74309L6.85597 1.74311L4.43073 0L2.42524 7.70636L0 9.44947L6.80933 13.6926Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 4698
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-cart-2",
  "use": "icon-cart-2-usage",
  "viewBox": "0 0 18 18",
  "content": "<symbol viewBox=\"0 0 18 18\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-cart-2\">\n<path d=\"M16.7885 5.25291H5.09486L4.75765 2.6754C4.757 2.67051 4.75629 2.66562 4.75549 2.66076C4.64543 1.98815 4.0709 1.5 3.38937 1.5H1.96142C1.70659 1.5 1.5 1.70659 1.5 1.96142C1.5 2.21625 1.70659 2.42285 1.96142 2.42285H3.38937C3.61449 2.42285 3.80459 2.58262 3.84372 2.80367C3.85963 2.92531 5.0457 11.991 5.08732 12.3091C5.08796 12.314 5.08867 12.3189 5.08947 12.3238C5.11236 12.4638 5.15626 12.5956 5.21707 12.717C4.68268 12.9089 4.2993 13.4203 4.2993 14.0199C4.2993 14.7832 4.92028 15.4042 5.68357 15.4042H6.22436C6.17314 15.5486 6.14499 15.7039 6.14499 15.8656C6.14499 16.6289 6.76598 17.2499 7.52926 17.2499C8.29255 17.2499 8.91353 16.6289 8.91353 15.8656C8.91353 15.7039 8.88538 15.5486 8.83417 15.4042H11.7922C11.741 15.5486 11.7129 15.7039 11.7129 15.8656C11.7129 16.6289 12.3338 17.2499 13.0971 17.2499C13.8604 17.2499 14.4814 16.6289 14.4814 15.8656C14.4814 15.7039 14.4533 15.5486 14.402 15.4042H15.8656C16.1205 15.4042 16.3271 15.1976 16.3271 14.9428C16.3271 14.688 16.1205 14.4814 15.8656 14.4814H5.68357C5.42914 14.4814 5.22215 14.2744 5.22215 14.0199C5.22215 13.7655 5.42914 13.5585 5.68357 13.5585C5.69754 13.5585 5.71147 13.5579 5.72534 13.5566C7.07408 13.434 13.7152 12.8326 15.1978 12.6983C15.8245 12.6413 16.3345 12.168 16.4379 11.5473C16.4386 11.5433 16.4392 11.5393 16.4397 11.5354L17.2454 5.77828C17.2843 5.50069 17.0684 5.25291 16.7885 5.25291ZM13.0971 15.4042C13.3515 15.4042 13.5585 15.6112 13.5585 15.8656C13.5585 16.1201 13.3515 16.3271 13.0971 16.3271C12.8427 16.3271 12.6357 16.1201 12.6357 15.8656C12.6357 15.6112 12.8427 15.4042 13.0971 15.4042ZM7.52926 15.4042C7.78369 15.4042 7.99068 15.6112 7.99068 15.8656C7.99068 16.1201 7.78369 16.3271 7.52926 16.3271C7.27483 16.3271 7.06784 16.1201 7.06784 15.8656C7.06784 15.6112 7.27483 15.4042 7.52926 15.4042ZM6.49734 12.5598C6.25946 12.5814 6.0428 12.4154 6.00124 12.1808L5.45707 8.02145H7.10568L7.48672 12.4698L6.49734 12.5598ZM10.2978 12.2155C10.1258 12.2311 8.40578 12.3863 8.40578 12.3863L8.03191 8.02145H10.2978V12.2155ZM13.1319 11.9588L11.2206 12.132V8.02145H13.5119L13.1319 11.9588ZM15.5268 11.4005C15.4905 11.605 15.3215 11.7604 15.1144 11.7792L14.0672 11.8741L14.439 8.02148H15.9997L15.5268 11.4005ZM16.1288 7.0986C15.6835 7.0986 5.71455 7.0986 5.33633 7.0986L5.21559 6.17575H16.258L16.1288 7.0986Z\" />\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 3619
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-chevron-down",
  "use": "icon-chevron-down-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-chevron-down\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.46967 9.46967C5.76256 9.17678 6.23744 9.17678 6.53033 9.46967L12 14.9393L17.4697 9.46967C17.7626 9.17678 18.2374 9.17678 18.5303 9.46967C18.8232 9.76256 18.8232 10.2374 18.5303 10.5303L12.5303 16.5303C12.2374 16.8232 11.7626 16.8232 11.4697 16.5303L5.46967 10.5303C5.17678 10.2374 5.17678 9.76256 5.46967 9.46967Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 4452
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-chevron-left",
  "use": "icon-chevron-left-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-chevron-left\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.5303 5.46967C14.8232 5.76256 14.8232 6.23744 14.5303 6.53033L9.06066 12L14.5303 17.4697C14.8232 17.7626 14.8232 18.2374 14.5303 18.5303C14.2374 18.8232 13.7626 18.8232 13.4697 18.5303L7.46967 12.5303C7.17678 12.2374 7.17678 11.7626 7.46967 11.4697L13.4697 5.46967C13.7626 5.17678 14.2374 5.17678 14.5303 5.46967Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 2923
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-chevron-right",
  "use": "icon-chevron-right-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-chevron-right\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 828
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-chevron-up",
  "use": "icon-chevron-up-usage",
  "viewBox": "0 0 24 24",
  "content": "<symbol viewBox=\"0 0 24 24\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-chevron-up\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.4697 7.46967C11.7626 7.17678 12.2374 7.17678 12.5303 7.46967L18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303C18.2374 14.8232 17.7626 14.8232 17.4697 14.5303L12 9.06066L6.53033 14.5303C6.23744 14.8232 5.76256 14.8232 5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697L11.4697 7.46967Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 501
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-download",
  "use": "icon-download-usage",
  "viewBox": "0 0 18 19",
  "content": "<symbol viewBox=\"0 0 18 19\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-download\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.375 10.7502C3.68566 10.7502 3.9375 11.0021 3.9375 11.3127V13.8127C3.9375 13.9951 4.00993 14.1699 4.13886 14.2989C4.2678 14.4278 4.44266 14.5002 4.625 14.5002H13.375C13.5573 14.5002 13.7322 14.4278 13.8611 14.2989C13.9901 14.1699 14.0625 13.9951 14.0625 13.8127V11.3127C14.0625 11.0021 14.3143 10.7502 14.625 10.7502C14.9357 10.7502 15.1875 11.0021 15.1875 11.3127V13.8127C15.1875 14.2934 14.9965 14.7545 14.6566 15.0944C14.3167 15.4343 13.8557 15.6252 13.375 15.6252H4.625C4.14429 15.6252 3.68328 15.4343 3.34337 15.0944C3.00346 14.7545 2.8125 14.2934 2.8125 13.8127V11.3127C2.8125 11.0021 3.06434 10.7502 3.375 10.7502Z\" />\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.47725 7.79C5.69692 7.57033 6.05308 7.57033 6.27275 7.79L9 10.5172L11.7273 7.79C11.9469 7.57033 12.3031 7.57033 12.5227 7.79C12.7424 8.00967 12.7424 8.36582 12.5227 8.58549L9.39775 11.7105C9.17808 11.9302 8.82192 11.9302 8.60225 11.7105L5.47725 8.58549C5.25758 8.36582 5.25758 8.00967 5.47725 7.79Z\" />\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9 3.25024C9.31066 3.25024 9.5625 3.50208 9.5625 3.81274V11.3127C9.5625 11.6234 9.31066 11.8752 9 11.8752C8.68934 11.8752 8.4375 11.6234 8.4375 11.3127V3.81274C8.4375 3.50208 8.68934 3.25024 9 3.25024Z\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 1545
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-search",
  "use": "icon-search-usage",
  "viewBox": "0 0 18 18",
  "content": "<symbol viewBox=\"0 0 18 18\" stroke=\"none\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-search\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M8.3125 3.375C5.58559 3.375 3.375 5.58559 3.375 8.3125C3.375 11.0394 5.58559 13.25 8.3125 13.25C11.0394 13.25 13.25 11.0394 13.25 8.3125C13.25 5.58559 11.0394 3.375 8.3125 3.375ZM2.25 8.3125C2.25 4.96427 4.96427 2.25 8.3125 2.25C11.6607 2.25 14.375 4.96427 14.375 8.3125C14.375 11.6607 11.6607 14.375 8.3125 14.375C4.96427 14.375 2.25 11.6607 2.25 8.3125Z\" fill-opacity=\"0.8\" />\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M11.799 11.7995C12.0187 11.5798 12.3749 11.5798 12.5945 11.7995L15.5851 14.7901C15.8048 15.0098 15.8048 15.366 15.5851 15.5856C15.3655 15.8053 15.0093 15.8053 14.7897 15.5856L11.799 12.595C11.5794 12.3753 11.5794 12.0192 11.799 11.7995Z\" fill-opacity=\"0.8\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 7730
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2897);
/* harmony import */ var _node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5042);
/* harmony import */ var _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1__);


var symbol = new (_node_modules_svg_baker_runtime_browser_symbol_js__WEBPACK_IMPORTED_MODULE_0___default())({
  "id": "icon-up",
  "use": "icon-up-usage",
  "viewBox": "0 0 28 28",
  "content": "<symbol viewBox=\"0 0 28 28\" xmlns=\"http://www.w3.org/2000/svg\" id=\"icon-up\">\r\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.5202 14.5202C18.7155 14.3249 18.7155 14.0083 18.5202 13.8131L14.5202 9.81307C14.325 9.61781 14.0084 9.61781 13.8131 9.81307L9.81313 13.8131C9.61787 14.0083 9.61787 14.3249 9.81313 14.5202C10.0084 14.7154 10.325 14.7154 10.5202 14.5202L13.6667 11.3737L13.6667 18.1666C13.6667 18.4428 13.8905 18.6666 14.1667 18.6666C14.4428 18.6666 14.6667 18.4428 14.6667 18.1666L14.6667 11.3737L17.8131 14.5202C18.0084 14.7154 18.325 14.7154 18.5202 14.5202Z\" stroke=\"none\" />\r\n<rect x=\"0.5\" y=\"0.5\" width=\"27\" height=\"27\" rx=\"13.5\" fill=\"none\" />\r\n</symbol>"
});
var result = _node_modules_svg_sprite_loader_runtime_browser_sprite_build_js__WEBPACK_IMPORTED_MODULE_1___default().add(symbol);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#" + symbol.id);

/***/ },

/***/ 4078
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./icon-5corners.svg": 2640,
	"./icon-cart-2.svg": 4698,
	"./icon-chevron-down.svg": 3619,
	"./icon-chevron-left.svg": 4452,
	"./icon-chevron-right.svg": 2923,
	"./icon-chevron-up.svg": 828,
	"./icon-download.svg": 501,
	"./icon-search.svg": 1545,
	"./icon-up.svg": 7730,
	"assets/icons/icon-5corners.svg": 2640,
	"assets/icons/icon-cart-2.svg": 4698,
	"assets/icons/icon-chevron-down.svg": 3619,
	"assets/icons/icon-chevron-left.svg": 4452,
	"assets/icons/icon-chevron-right.svg": 2923,
	"assets/icons/icon-chevron-up.svg": 828,
	"assets/icons/icon-download.svg": 501,
	"assets/icons/icon-search.svg": 1545,
	"assets/icons/icon-up.svg": 7730
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 4078;

/***/ },

/***/ 147
(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./alert-wrapper/alert-wrapper.js": 3937,
	"./alert/alert.js": 4009,
	"./article/article.js": 1217,
	"./button/button.js": 2271,
	"./c-cursor/c-cursor.js": 2907,
	"./chess-gallery/chess-gallery.js": 9537,
	"./common-card/common-card.js": 7013,
	"./components.js": 2820,
	"./cookie/cookie.js": 11,
	"./field/field.js": 4205,
	"./footer/footer.js": 8413,
	"./header/header.js": 6689,
	"./intro/intro.js": 4189,
	"./layout-columns/layout-columns.js": 103,
	"./layout/layout.js": 1995,
	"./line-banner/line-banner.js": 2425,
	"./mobile-nav/mobile-nav.js": 9143,
	"./point-card/point-card.js": 549,
	"./popUp/popUp.js": 9417,
	"./slider/slider.js": 5073,
	"./toasty/toasty.js": 2275,
	"./tooltip/tooltip.js": 281,
	"./up/up.js": 5057,
	"./validator/validator.js": 4489,
	"./video/video.js": 2305,
	"./wave-text/wave-text.js": 3057,
	"./widget/widget.js": 2079,
	"./window/window.js": 6919,
	"components/alert-wrapper/alert-wrapper.js": 3937,
	"components/alert/alert.js": 4009,
	"components/article/article.js": 1217,
	"components/button/button.js": 2271,
	"components/c-cursor/c-cursor.js": 2907,
	"components/chess-gallery/chess-gallery.js": 9537,
	"components/common-card/common-card.js": 7013,
	"components/components.js": 2820,
	"components/cookie/cookie.js": 11,
	"components/field/field.js": 4205,
	"components/footer/footer.js": 8413,
	"components/header/header.js": 6689,
	"components/intro/intro.js": 4189,
	"components/layout-columns/layout-columns.js": 103,
	"components/layout/layout.js": 1995,
	"components/line-banner/line-banner.js": 2425,
	"components/mobile-nav/mobile-nav.js": 9143,
	"components/point-card/point-card.js": 549,
	"components/popUp/popUp.js": 9417,
	"components/slider/slider.js": 5073,
	"components/toasty/toasty.js": 2275,
	"components/tooltip/tooltip.js": 281,
	"components/up/up.js": 5057,
	"components/validator/validator.js": 4489,
	"components/video/video.js": 2305,
	"components/wave-text/wave-text.js": 3057,
	"components/widget/widget.js": 2079,
	"components/window/window.js": 6919
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 147;

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			23: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkwebpack_pug_esbuild_starter"] = self["webpackChunkwebpack_pug_esbuild_starter"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [96], () => (__webpack_require__(6153)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;