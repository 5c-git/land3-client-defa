import './chess-gallery.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const columns = document.querySelectorAll('.chess-gallery__text-inner');
const translateY = [-150, 80, -120];

const mm = gsap.matchMedia();

mm.add('(min-width: 992px)', () => {
  columns.forEach((column, i) => {
    gsap.to(column, {
      x: translateY[i] ?? 0,
      scrollTrigger: {
        trigger: column,
        start: 'top bottom',
        end: '80% top',
        scrub: 2,
      },
    });
  });
});

mm.add('(max-width: 991px)', () => {
  // мобилка — без анимаций
});