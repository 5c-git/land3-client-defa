import './toasty.scss';
import { gsap } from "gsap";

let isAnimating = false; // <-- флаг блокировки

const createToastyElement = () => {
  const el = document.createElement("div");
  el.classList.add("toasty");

  const img = document.createElement("img");
  img.src = './assets/images/toasty.png';
  img.alt = "Toasty!";
  el.appendChild(img);

  const caption = document.createElement("div");
  caption.classList.add("toasty__caption");
  caption.textContent = "TOASTY!";
  el.appendChild(caption);

  document.body.appendChild(el);
  return el;
}

const showToasty = () => {
  if (isAnimating) return; // блокируем, если анимация уже идёт
  isAnimating = true;

  let el = document.querySelector(".toasty");
  if (!el) el = createToastyElement();

  const caption = el.querySelector(".toasty__caption");

  // изначально — за пределами экрана
  gsap.set(el, {
    x: '150%',
    bottom: '-25px',
    right: 0,
    position: 'fixed',
    zIndex: 9999,
    pointerEvents: 'none',
    opacity: 1,
  });

  const tl = gsap.timeline({
    onComplete: () => {
      el.remove();
      isAnimating = false; // разблокируем после анимации
    },
  });

  tl.to(el, {
    x: "0%",
    duration: 0.4,
    ease: "back.out(2)",
    onComplete: () => {
      // bounce текста
      gsap.fromTo(
        caption,
        { scale: 1 },
        {
          scale: 1.3,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "back.out(3)",
        }
      );
    },
  })
    .to(el, {
      duration: 0.6, // пауза
    })
    .to(el, {
      x: "150%",
      duration: 0.4,
      ease: "back.in(2)",
    });

  // звук
  const audio = new Audio('./assets/sounds/toasty!.mp3');
  audio.play().catch(() => {});
}

// логика 5 быстрых кликов
let clickTimes = [];
document.addEventListener("click", () => {
  if (isAnimating) return; // игнорируем клики пока анимация идёт

  const now = Date.now();
  clickTimes.push(now);
  clickTimes = clickTimes.filter((t) => now - t < 1500);

  if (clickTimes.length >= 5) {
    showToasty();
    clickTimes = [];
  }
});
