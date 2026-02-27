import "./main.scss";
import "./fonts.scss";
import Viewer from 'viewerjs/dist/viewer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

import {
  summonAlert,
  removeAlert,
} from '../components/alert/alert';
import {
  summonPopUp,
  removePopUp,
} from '../components/popUp/popUp';
import {
  validateForm, maskNumber, maskSimplePhone, maskPhone, maskInternationalPhone,
  initPasswordEye, initAgreeCheckbox, initFileLoadInput, focusFirstInput,
  initSelectValidation, initChoicesValidation,
} from '../components/validator/validator';

const PHONE_REG_EXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/;
const BIRTHDAY_REG_EXP = /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/;
const INN_REG_EXP = /^(([0 - 9]{12})| ([0 - 9]{10}))?$/;
const TOKEN = 'd11e752ae788e61213f01ae6952bdbd85ceaa025';

// Находим ширину скролбара и узнаем на сколько добавлять отступ справа у body.
const body = document.querySelector('body');
const header = document.querySelector('.header__fixed');
const getScrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth;
let checker = false;

// Функция чтобы блочить экран и давать отступ.
const getPaddingOnBody = () => {
  const modal = document.querySelector('.Modal');
  const popUps = document.querySelectorAll('.popUp');
  const alertWrapper = document.querySelector('.alert-wrapper');

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

    body.classList.add('static');
    checker = true;
  }
};

// Функция чтобы снимать блокировку экрана и убирать отступ.
const getPaddingFromBody = () => {
  const modal = document.querySelector('.Modal');
  const popUps = document.querySelectorAll('.popUp');
  const alertWrapper = document.querySelector('.alert-wrapper');

  if (checker) {
    body.style.paddingRight = '';

    if (header) {
      header.style.paddingRight = '';
    }

    if (modal) {
      modal.style.paddingRight = '';
    }

    if (popUps) {
      popUps.forEach((popUp) => {
        popUp.style.paddingRight = '';
      });
    }

    if (alertWrapper) {
      alertWrapper.style.paddingRight = '';
    }

    body.classList.remove('static');
    checker = false;
  }
};

// Функция чтобы перемешать массив.
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// Функция чтобы ставить пробелы каждые 3 символа.
const numberSplitter = (num) => {
  const n = num.toString();
  return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
};

// автоматическая высота для textarea
function OnInput() {
  this.style.height = 'auto';
  this.style.height = `${this.scrollHeight}px`;
}

const setTextareaAutoHeight = (area) => {
  const textareas = document.querySelectorAll(`${area}`);
  textareas.forEach((element) => {
    element.setAttribute('style', `height:${element.scrollHeight}px; overflow-y: hidden;`);
    element.addEventListener('input', OnInput);
  });
};

const isObject = (object) => {
  const type = typeof object;
  return type === 'function' || type === 'object';
};

const createFormData = (values) => {
  const data = new FormData();

  // eslint-disable-next-line no-restricted-syntax
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
      button.removeAttribute('disabled');
      container.style.display = 'none';
      clearInterval(timer);
    } else {
      time -= 1;
      container.style.display = '';
      container.querySelector('b').textContent = `00:${String(time).padStart(2, '0')}`;
    }
  }, 1000);

  return timer;
};

const debounce = (cb, delay = 500) => {
  let timeoutId;

  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  };
};


const scrollToErrorField = (form) => {
  form.addEventListener('bouncerFormInvalid', () => {
    const firstError = form.querySelector('.validator__input--error');
    const scrollToFirstError = (error) => {
      error.style.scrollMarginTop = '140px';
      error.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    };

    setTimeout(() => {
      scrollToFirstError(firstError);
    }, 100);
  });
};

// Статус для системных сообщений "alert".
const setStatus = (status) => {
  switch (status) {
    case 'success':
      return 'alert--blue';

    case 'exclam':
      return 'alert--star';

    case 'error':
      return 'alert--red';

    default:
      return '';
  }
};

// Завязка чексбокса с кнопкой по дата-атрибуту.
const updateButtonState = (name) => {
  const checkbox = document.querySelector(`input[name="${name}"]`);
  const button = document.querySelector(`button[data-checkbox-name="${name}"]`);
  if (checkbox && button) {
    button.disabled = !checkbox.checked;
  }
};

// Функция чтобы навешивать вызов модального окна заявки по кнопке.
const activateRequestButtons = (func) => {
  const buttons = document.querySelectorAll('.button-request:not(.button-request--js)');

  buttons.forEach((button) => {
    button.classList.add('button-request--js');

    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      const { type, ...info } = button.dataset;

      if (!type) {
        console.warn('У кнопки не указан data-type, модалка не может быть вызвана');
        return;
      }

      const modalSelector = `#modal--${type}`;
      const modalClass = `.modal--${type}`;

      summonPopUp(modalSelector, true);
      const modal = document.querySelector(modalClass);

      if (!modal) {
        console.log(`Модальное окно ${modalSelector} не найдено`);

        return;
      }

      setTextareaAutoHeight(`${modalClass} textarea`);

      const buttonForCheckbox = modal.querySelector('button[data-checkbox-name]');
      if (buttonForCheckbox) {
        const name = buttonForCheckbox.dataset.checkboxName;
        const checkbox = document.querySelector(`input[name="${name}"]`);

        updateButtonState(name);
        if (checkbox) {
          checkbox.addEventListener('change', () => updateButtonState(name));
        }
      }

      const form = modal.querySelector('form');
      if (form) {
        Object.entries(info).forEach(([key, value]) => {
          form.insertAdjacentHTML('beforeend', `<input type="hidden" name="${key}" value="${value}">`);
        });

        const validatedForm = validateForm(`${modalClass} form`);
        maskPhone(modalClass, 'input[type="tel"]');

        form.addEventListener('bouncerFormValid', debounce(() => {
          if (!func) return;
          const answer = func(form);
          if (answer && answer.responseJSON && answer.responseJSON.status === 'success') {
            validatedForm.destroy();
            removePopUp(modalClass, true);

            summonAlert({
              template: '#alert--blue',
              text: answer.responseJSON.text,
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
  const cuttedSpacesValue = field.value.replace(/\s\s+/g, ' ');
  const trimmedValue = cuttedSpacesValue.trim();
  field.value = trimmedValue;
};
document.addEventListener('blur', blurHandler, true);


// Анимация появления карточек.
const initScrollRevealChain = (selector) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    const base = Math.floor(Math.random() * 10) * 50;
    const direction = Math.random() < 0.5 ? -1 : 1;
    const randomY = base * direction;

    gsap.from(el, {
      y: randomY,
      x: 0,
      z: 0,
      opacity: 0,
      duration: 1,
      delay: index * 0.2, // нарастающая задержка
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        // toggleActions: "play none none reverse",
      }
    });
  });
}

// Инициализция просмотра картинок в окне. 
const viewerImgInit = () => {
  const imgList = document.querySelectorAll('img[data-original]:not([viewerjs-init])');
  imgList.forEach((img) => {
    img.setAttribute('viewerjs-init', '');

    const viewer = new Viewer(img, {
      url: 'data-original',
      className: 'viewerjs__zoom',
      toolbar: {
        zoomIn: {
          show: true,
          size: 'large',
        },
        zoomOut: {
          show: true,
          size: 'large',
        },
        oneToOne: false,
        reset: false,
        prev: {
          show: true,
          size: 'large',
        },
        play: false,
        next: {
          show: true,
          size: 'large',
        },
        rotateLeft: {
          show: true,
          size: 'large',
        },
        rotateRight: {
          show: true,
          size: 'large',
        },
        flipHorizontal: false,
        flipVertical: false,
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
      },
    });
  });
};

viewerImgInit();

export {
  getPaddingOnBody,
  getPaddingFromBody,
  getScrollbarWidth,
  shuffle,
  numberSplitter,
  activateRequestButtons,
  PHONE_REG_EXP,
  INN_REG_EXP,
  BIRTHDAY_REG_EXP,
  TOKEN,
  createFormData,
  setTextareaAutoHeight,
  setStatus,
  startTimer,
  debounce,
  scrollToErrorField,
  updateButtonState,
  initScrollRevealChain,
};
