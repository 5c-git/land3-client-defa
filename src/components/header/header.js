import './header.scss';
import {
  getPaddingOnBody,
  getPaddingFromBody,
} from '../../utils/utils';

const header = document.querySelector('header');
if (header) {
  // Скрывает шапку при скроле вниз
  const hideHeaderOnMove = () => {
    let scrollPosition = 0;
    let hideChecker = 0;
    let showChecker = 0;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= scrollPosition && window.pageYOffset >= header.offsetHeight) {
        showChecker = 0;
        hideChecker += (window.pageYOffset - scrollPosition);
        scrollPosition = window.pageYOffset;
      } else {
        showChecker += (scrollPosition - window.pageYOffset);
        hideChecker = 0;
        scrollPosition = window.pageYOffset;
      }

      if (showChecker >= 300) {
        header.classList.remove('header--hidden');
        hideChecker = 0;
      } else if (hideChecker >= 300) {
        header.classList.add('header--hidden');
      }
    });
  };

  hideHeaderOnMove();

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 0 && !header.classList.contains('header--fixed')) {
      header.classList.add('header--fixed');
    } else if (window.pageYOffset === 0) {
      header.classList.remove('header--fixed');
    }
  });


  const burger = header.querySelector('.header__burger');
  // Закрывает все пункты меню
  const menuOff = () => {
    getPaddingFromBody();
    header.classList.remove('header--dropdown');
    header.querySelectorAll('.mobile-nav__sub-container--active').forEach((el) => {
      el.classList.remove('mobile-nav__sub-container--active');
    });
    header.querySelectorAll('.mobile-nav__nav-item--sub').forEach((el) => {
      el.classList.remove('mobile-nav__nav-item--sub');
    });
    header.querySelectorAll('.mobile-dropdown__sub--active').forEach((el) => {
      el.classList.remove('mobile-dropdown__sub--active');
      el.style.maxHeight = null;
    });
  };
  if (burger) {
    burger.addEventListener('click', () => {
      if (header.classList.contains('header--dropdown')) {
        menuOff();
      } else {
        header.classList.add('header--dropdown');
        getPaddingOnBody();
      }
    });
  }
}
