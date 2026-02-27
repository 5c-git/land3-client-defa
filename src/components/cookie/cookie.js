import './cookie.scss';
import {
  summonPopUp,
  removePopUp,
} from '../popUp/popUp';

const setCookie = (name, value) => {
  const updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};path=/;max-age=31536000;`;
  document.cookie = updatedCookie;
};

const getCookie = (name) => {
  const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const showMessage = () => {
  summonPopUp({
    template: '#cookie',
    blockScroll: false,
    overlay: {
      use: false,
      closeOnClick: false,
    },
    esc: {
      closeOnEsc: false,
    },
  });

  const closeButton = document.querySelector('.cookie__button');

  if (closeButton) {
    closeButton.addEventListener('click', () => {
      setCookie('agreeCookie', true);
      removePopUp('#cookie');
    });
  }
};

const cookie = () => {
  const result = getCookie('agreeCookie');
  if (result === undefined) {
    showMessage();
  }
};

cookie();
