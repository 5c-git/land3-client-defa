import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Анимация появления букв.
const initScrollRevealSplitRandomJump = (selector) => {
  document.querySelectorAll(selector).forEach((title) => {
    const split = new SplitText(title, { type: "chars, words" });
    const chars = split.chars;

    // CSS для корректного рендера
    chars.forEach((char) => {
      char.style.display = "inline-block";
      char.style.transform = "translateZ(0)";
      char.style.backfaceVisibility = "hidden";
      char.style.willChange = "transform, opacity";
    });

    gsap.from(chars, {
      // рандомное смещение по Y для каждой буквы
      y: () => gsap.utils.random(20, 100),  
      opacity: 0,
      rotation: 0,
      duration: 1,
      ease: "power3.out",
      delay: () => Math.random() * 0.8, // рандомная задержка
      scrollTrigger: {
        trigger: title,
        start: "top bottom",
      },
      onComplete: () => {
        chars.forEach((char) => {
          gsap.to(char, {
            y: "+=" + gsap.utils.random(-5, 5),
            rotation: gsap.utils.random(-3, 3),
            duration: 1 + Math.random(),
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
      },
    });
  });
};

initScrollRevealSplitRandomJump('.wave-text');
