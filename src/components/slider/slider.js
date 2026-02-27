import './slider.scss';

import Swiper from 'swiper';
import {
  Navigation, Pagination, Scrollbar,
} from 'swiper/modules';

const sliderInit = (container) => {
  const slider = container;
  let sliderNolint;
  if (slider) {
    const swiper = slider.querySelector('.swiper');
    const buttonPrev = slider.querySelector('.slider__button--prev');
    const buttonNext = slider.querySelector('.slider__button--next');
    sliderNolint = new Swiper(swiper, {
      modules: [Navigation, Pagination, Scrollbar],
      // Optional parameters
      slidesPerView: 'auto',
      spaceBetween: 0,
      loop: false,
      // Navigation arrows
      navigation: {
        prevEl: buttonPrev,
        nextEl: buttonNext,
        disabledClass: 'slider__button--disabled',
      },
      // Scrollbar
      scrollbar: {
        el: '.slider__scrollbar',
        dragClass: 'slider__scrollbar-drag',
        draggable: true,
      },
      // Responsive breakpoints
      breakpoints: {},
    });
  }

  return sliderNolint;
};

const sliders = document.querySelectorAll('.slider');
sliders.forEach((el, index) => {
  sliderInit(el);
});
