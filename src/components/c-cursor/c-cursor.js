import './c-cursor.scss';
import { gsap } from 'gsap';

export const magneticInit = () => {
  const MIN_WIDTH = 1024; // ширина, начиная с которой работает магнита

  // Переменные для хранения обработчиков, чтобы можно было их удалять
  let mouseMoveHandler = null;
  let mouseOverHandler = null;
  let mouseOutHandler = null;
  const btnHandlers = new Map(); // кнопка => { mousemove, mouseout }

  const cursor = document.querySelector('.c-cursor__pointer');
  const page = document.body;

  if (!cursor) return; // страховка, если нет кастомного курсора

  gsap.set(cursor, { autoAlpha: 1 });

  const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.3 });
  const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.3 });

  const moveMousePos = (e) => {
    if (e.target.classList.contains('button-magnetic')) return;
    cursorX(e.clientX);
    cursorY(e.clientY);
  };

  const updateOnHover = (e) => {
    const { tagName, classList, parentElement } = e.target;
    if (
      tagName === 'LABEL' ||
      tagName === 'A' ||
      tagName === 'BUTTON' ||
      classList.contains('is-cursor-hover') ||
      (parentElement?.tagName === 'A' && tagName === 'IMG')
    ) {
      document.documentElement.classList.toggle('is-hover');
    }
  };

  const attach = () => {
    // Навешиваем обработчики
    mouseMoveHandler = moveMousePos;
    mouseOverHandler = updateOnHover;
    mouseOutHandler = updateOnHover;

    page.addEventListener('mousemove', mouseMoveHandler);
    page.addEventListener('mouseover', mouseOverHandler);
    page.addEventListener('mouseout', mouseOutHandler);

    // Кнопки
    const magneticButtons = [...document.querySelectorAll('.button-magnetic')];
    magneticButtons.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left;
        const relY = e.clientY - rect.top;

        // Курсор прилипает
        const cursorTargetX = rect.left + rect.width / 2 + (relX - rect.width / 2) / 1.5;
        const cursorTargetY = rect.top + rect.height / 2 + (relY - rect.height / 2) / 1.5;
        cursorX(cursorTargetX);
        cursorY(cursorTargetY);

        // Кнопка тянется
        gsap.to(btn, {
          x: ((relX - rect.width / 2) / rect.width) * 50,
          y: ((relY - rect.height / 2) / rect.height) * 50,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onOut = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      };

      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseout', onOut);

      btnHandlers.set(btn, { onMove, onOut });
    });
  };

  const detach = () => {
    // Убираем обработчики страницы
    if (mouseMoveHandler) page.removeEventListener('mousemove', mouseMoveHandler);
    if (mouseOverHandler) page.removeEventListener('mouseover', mouseOverHandler);
    if (mouseOutHandler) page.removeEventListener('mouseout', mouseOutHandler);
    mouseMoveHandler = mouseOverHandler = mouseOutHandler = null;

    // Убираем обработчики с кнопок
    btnHandlers.forEach(({ onMove, onOut }, btn) => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseout', onOut);
    });
    btnHandlers.clear();

    // Сбрасываем кнопки в нормальное состояние
    document.querySelectorAll('.button-magnetic').forEach((btn) =>
      gsap.set(btn, { x: 0, y: 0 })
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

  // Первичная проверка
  initOrDestroyMagnetic();

  // Слушаем resize
  window.addEventListener('resize', initOrDestroyMagnetic);
};



// const magneticInit = () => {
//   // Проверяем, есть ли мышь (не тач)
//   const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
//   if (isTouchDevice) {
//     // на планшетах/телефонах магнит не нужен
//     return;
//   }

//   // Находим все кнопки, которые должны магнититься
//   const magneticButtons = [...document.querySelectorAll('.button-magnetic')];

//   magneticButtons.forEach(btn => {
//     btn.addEventListener('mousemove', (e) => {
//       const rect = btn.getBoundingClientRect();
//       const relX = e.clientX - rect.left;
//       const relY = e.clientY - rect.top;

//       // Случайный «разброс» силы, чтобы кнопка вела себя живее
//       const randomForce = 45 + Math.random() * 10; // 45–55 px

//       gsap.to(btn, {
//         x: ((relX - rect.width / 2) / rect.width) * randomForce,
//         y: ((relY - rect.height / 2) / rect.height) * randomForce,
//         duration: 0.3,
//         ease: 'power2.out'
//       });
//     });

//     btn.addEventListener('mouseout', () => {
//       // Возвращаем кнопку на место с пружинкой
//       gsap.to(btn, {
//         x: 0,
//         y: 0,
//         duration: 0.6,
//         ease: 'elastic.out(1, 0.4)'
//       });
//     });
//   });
// };

magneticInit();
