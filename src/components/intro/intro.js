import './intro.scss';
import { initScrollRevealChain } from '../../utils/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ==========================
// Параллакс от движения мыши
// ==========================
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

  // Проверка — если устройство с мышью
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
      rotateTo: gsap.quickTo(el, "rotation", animConfig),
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

  // Возвращаем функцию, чтобы можно было выключить эффект при необходимости
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}

// Включить
// const destroyParallax = initMouseParallax();

// Выключить
// destroyParallax();


// Анимация появления карточек и затем покачивание но из-за этого картинки мылятся. 
const initScrollRevealDynamic = (selector = "[data-reveal]") => {
  document.querySelectorAll(selector).forEach((el, index) => {
    const base = Math.floor(Math.random() * 10) * 50;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const randomY = base * direction;

    // Анимация появления
    gsap.fromTo(
      el,
      { y: randomY, opacity: 0, rotation: 0 },
      {
        y: 0,
        opacity: 1,
        rotation: Math.random() * 10 - 5, // покачивание ±5°
        duration: 1.2,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
        },
        onComplete: () => {
          // После появления запускаем постоянное лёгкое колебание
          gsap.to(el, {
            rotation: Math.random() * 4 - 2,
            y: "+=0", // чтобы gsap считал это анимацией
            duration: 1 + Math.random() * 1, // длительность 1-2 сек
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });

          gsap.to(el, {
            y: "+=" + (Math.random() * 10 - 5), // вертикальное колебание ±5px
            duration: 1 + Math.random() * 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        }
      }
    );
  });
};

// initScrollRevealDynamic();



initScrollRevealChain('[data-reveal]');
