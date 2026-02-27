import './line-banner.scss';

import Swiper from 'swiper';
import {
  FreeMode,
  Mousewheel,
  Pagination,
  Scrollbar,
  Navigation,
} from 'swiper/modules';

const initLineSlider = () => {
  const line = document.querySelector('.line-banner');
  if (!line) return;

  const swiperEl = line.querySelector('.swiper');
  if (!swiperEl) return;

  const buttonPrev = line.querySelector('.line-banner__button--prev');
  const buttonNext = line.querySelector('.line-banner__button--next');
  const scrollbar = line.querySelector('.line-banner__scrollbar');
  const pagination = line.querySelector('.line-banner__pagination');

  let slider = null;
  let isMobile = null;

  const destroySlider = () => {
    if (slider) {
      slider.destroy(true, true);
      slider = null;
    }
  };

  const initSlider = () => {
    slider = new Swiper(swiperEl, {
      modules: [
        FreeMode,
        Mousewheel,
        Pagination,
        Scrollbar,
        Navigation,
      ],

      slidesPerView: 'auto',
      spaceBetween: 0,

      freeMode: {
        enabled: true,
      },
      mousewheel: {
        enabled: true,
        releaseOnEdges: true,
      },

      pagination: {
        enabled: true,
        el: pagination,
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' +
            ' | ' +
            '<span class="' + totalClass + '"></span>';
        },
      },

      scrollbar: {
        enabled: true,
        el: scrollbar,
        dragClass: 'line-banner__scrollbar-drag',
        draggable: true,
      },

      navigation: {
        enabled: false,
        prevEl: buttonPrev,
        nextEl: buttonNext,
        disabledClass: 'line-banner__button--disabled',
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
            disabledClass: 'line-banner__button--disabled',
          },
          speed: 600,
        },
      },
    });
  };

  const checkBreakpoint = () => {
    const mobile = window.matchMedia('(max-width: 991px)').matches;

    if (isMobile === mobile) return;

    isMobile = mobile;

    destroySlider();
    initSlider();
  };

  checkBreakpoint();
  window.addEventListener('resize', checkBreakpoint);
};

initLineSlider();
