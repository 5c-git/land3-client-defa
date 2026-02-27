import './popUp.scss';
/* eslint-disable */
import {
  getPaddingOnBody,
  getPaddingFromBody,
} from '../../utils/utils';
/* eslint-enable */

const body = document.querySelector('body');

// Общая функция открытия модалки
const openPopup = (options) => {
  const {
    template,
    blockScroll = true,
    redirect,
    overlay = {
      use: true,
      closeOnClick: true,
    },
    esc = {
      closeOnEsc: true,
    },
  } = options;

  const popUpName = template.replace(/^#/, '');
  const templateElement = document.querySelector(`#${popUpName}`);

  if (!templateElement) {
    console.warn(`#${popUpName} модального окна не существует.`);
    return;
  }

  if (document.querySelector(`.${popUpName}`)) {
    console.warn(`Модалка ${popUpName} уже открыта.`);
    return;
  }

  const templateContent = templateElement.content.cloneNode(true);
  const popup = templateContent.querySelector(`.${popUpName}`);

  if (!popup) {
    console.error(`В шаблоне #${popUpName} нет элемента с классом .${popUpName}`);
    return;
  }

  body.append(popup);

  const overlayEl = popup.querySelector('.popUp__overlay');
  const closes = popup.querySelectorAll('.popUp__close');

  function removePopup() {
    // // Закрытие с анимацией
    // popup.classList.add('popUp--closing');
    // popup.addEventListener('animationend', () => {
    //   popup.remove();
    //   // Разблокируем скролл только если больше нет открытых попапов
    //   if (blockScroll && !document.querySelector('.popUp')) {
    //     getPaddingFromBody();
    //   }
    // }, { once: true });

    popup.remove();
    // Разблокируем скролл только если больше нет открытых попапов
    if (blockScroll && !document.querySelector('.popUp')) {
      getPaddingFromBody();
    }

    document.removeEventListener('keydown', onPopupEscPress);

    if (redirect) {
      setTimeout(() => {
        window.location.href = redirect;
      }, 300);
    }
  }

  function onPopupEscPress(evt) {
    if (!esc.closeOnEsc) return;
    if (evt.code !== 'Escape') return;

    evt.preventDefault();
    // Закрываем только текущую модалку
    removePopup();
  }

  if (blockScroll) getPaddingOnBody();

  if (overlayEl) {
    if (overlay.use && overlay.closeOnClick) {
      overlayEl.addEventListener('click', removePopup);
    } else if (!overlay.use) {
      overlayEl.remove();
    }
  }

  closes.forEach((close) => close.addEventListener('click', removePopup));

  // ESC только если включено в опциях
  if (esc.closeOnEsc) {
    document.addEventListener('keydown', onPopupEscPress);
  }
};

// Основная функция summonPopUp с поддержкой старого и нового вызова
const summonPopUp = (arg1, arg2, arg3) => {
  // Новый вариант: передан объект
  if (typeof arg1 === 'object' && arg1 !== null) {
    const {
      template,
      blockScroll = true,
      redirect,
      overlay = {
        use: true,
        closeOnClick: true,
      },
      esc = {
        closeOnEsc: true,
      },
    } = arg1;

    if (!template) {
      console.warn('Не передан template для модалки');
      return;
    }

    openPopup({
      template,
      blockScroll,
      redirect,
      overlay,
      esc,
    });
  } else if (typeof arg1 === 'string') {
    // Старый вариант: строка + опции
    const template = arg1;
    const blockScroll = arg2 !== undefined ? arg2 : true;
    const redirect = arg3;

    openPopup({
      template,
      blockScroll,
      redirect,
      overlay: {
        use: true,
        closeOnClick: true,
      },
      esc: {
        closeOnEsc: true,
      },
    });
  } else {
    console.warn('Неверные аргументы для summonPopUp');
  }
};

// Функция removePopUp с безопасной анимацией и поддержкой нескольких попапов
const removePopUp = (arg) => {
  const findPopup = (name) => {
    if (name.startsWith('#')) return document.querySelector(`.${name.slice(1)}`);

    const cls = name.startsWith('.') ? name : `.${name}`;
    return document.querySelector(cls);
  };

  let popup = null;
  if (typeof arg === 'string') {
    popup = findPopup(arg);
  } else if (typeof arg === 'object' && arg !== null) {
    popup = findPopup(arg.template);
  }

  if (!popup) return;

  // // Закрытие с анимацией
  // popup.classList.add('popUp--closing');
  // popup.addEventListener('animationend', () => {
  //   popup.remove();

  //   // Проверяем оставшиеся модалки с overlay
  //   if (!document.querySelector('.popUp__overlay')) getPaddingFromBody();
  // }, { once: true });

  popup.remove();

  // Проверяем оставшиеся модалки с overlay
  if (!document.querySelector('.popUp__overlay')) getPaddingFromBody();
};

export {
  summonPopUp,
  removePopUp,
};
