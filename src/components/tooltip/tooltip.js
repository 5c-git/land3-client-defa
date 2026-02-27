import './tooltip.scss';
import tippy from 'tippy.js';
import {
  getPaddingOnBody,
  getPaddingFromBody,
} from '../../utils/utils';

const tooltips = document.querySelectorAll('.tooltip');
if (tooltips.length > 0) {
  tooltips.forEach((tooltip) => {
    const main = tooltip.querySelector('.tooltip__main');
    if (main) {
      const options = {
        content(reference) {
          const template = `<div class="tooltip__main">${reference.querySelector('.tooltip__main').innerHTML}</div>`;

          return template;
        },
        placement: 'bottom-start',
        allowHTML: true,
        animation: 'scale',
        arrow: false,
        maxWidth: 280,
        interactive: true,
        appendTo: () => document.body,
      };

      const instance = tippy(tooltip, options);

      const getChecker = () => {
        if (window.innerWidth > 767 && !instance.state.isEnabled) {
          instance.enable();
        } else if (window.innerWidth <= 767 && instance.state.isEnabled) {
          instance.disable();
        }
      };

      getChecker();

      window.addEventListener('resize', () => {
        getChecker();
      });

      const bottomSheetInit = () => {
        const openSheetButton = tooltip.querySelector('.tooltip__button');
        const newBottomSheet = tooltip.cloneNode(true);

        const body = document.querySelector('body');
        const bottomSheet = newBottomSheet.querySelector('.tooltip__wrapper');
        const sheetContents = bottomSheet.querySelector('.tooltip__main');
        const draggableArea = bottomSheet.querySelector('.tooltip__drag');
        let height; // in vh
        let sheetHeight; // in vh

        const animateIn = () => {
          sheetContents.style.height = '';
          sheetContents.removeEventListener('transitionend', animateIn);
        };

        const setSheetHeight = (value) => {
          sheetHeight = Math.max(0, Math.min(100, value));
          sheetContents.style.height = `${sheetHeight}vh`;

          if (sheetHeight === 100) {
            sheetContents.classList.add('tooltip__main--full');
          } else {
            sheetContents.classList.remove('tooltip__main--full');
          }
        };

        const setIsSheetShown = (value) => {
          bottomSheet.setAttribute('aria-hidden', String(!value));
          if (value) {
            getPaddingOnBody();
          } else {
            getPaddingFromBody();
            sheetContents.addEventListener('transitionend', animateIn);
          }
        };

        openSheetButton.addEventListener('click', () => {
          if (window.innerWidth < 768) {
            body.appendChild(newBottomSheet);
            height = (sheetContents.offsetHeight / document.documentElement.clientHeight) * 100;
            setSheetHeight(Math.min(height, 100));
            setIsSheetShown(true);
          }
        });

        // Hide the sheet when clicking the 'close' button
        bottomSheet.querySelector('.tooltip__close').addEventListener('click', () => {
          setIsSheetShown(false);
          setTimeout(() => {
            newBottomSheet.remove();
          }, 500);
        });

        // Hide the sheet when clicking the background
        bottomSheet.querySelector('.tooltip__overlay').addEventListener('click', () => {
          setIsSheetShown(false);
          setTimeout(() => {
            newBottomSheet.remove();
          }, 500);
        });

        const touchPosition = (event) => (event.touches ? event.touches[0] : event);

        let dragPosition;

        const onDragStart = (event) => {
          dragPosition = touchPosition(event).pageY;
          sheetContents.classList.add('not-selectable');
        };

        const onDragMove = (event) => {
          if (dragPosition === undefined) return;

          const y = touchPosition(event).pageY;
          const deltaY = dragPosition - y;
          const deltaHeight = (deltaY / window.innerHeight) * 100;

          setSheetHeight(sheetHeight + deltaHeight);
          dragPosition = y;
        };

        const onDragEnd = () => {
          dragPosition = undefined;
          sheetContents.classList.remove('not-selectable');

          if (sheetHeight < height / 2) {
            setIsSheetShown(false);
          } else if (sheetHeight > height) {
            setSheetHeight(height);
          } else {
            setSheetHeight(height);
          }
        };

        draggableArea.addEventListener('mousedown', onDragStart);
        draggableArea.addEventListener('touchstart', onDragStart);

        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('touchmove', onDragMove);

        window.addEventListener('mouseup', onDragEnd);
        window.addEventListener('touchend', onDragEnd);
      };

      bottomSheetInit();
    }
  });
}
