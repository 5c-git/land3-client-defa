import './widget.scss';

const widget = document.querySelector('.widget');
if (widget) {
  const widgetClose = widget.querySelector('.widget__close');
  const widgetOverlay = widget.querySelector('.widget__overlay');
  const body = document.querySelector('body');

  const getWidgetWork = () => {
    const isActive = widget.classList.contains('widget--active');
    if (!isActive) {
      widget.classList.add('widget--active');
      widgetClose.classList.add('widget__close--active');
      body.classList.add('fixed');
    } else {
      widget.classList.remove('widget--active');
      widgetClose.classList.remove('widget__close--active');
      body.classList.remove('fixed');
    }
  };

  widgetClose.addEventListener('click', () => {
    getWidgetWork();
  });

  widgetOverlay.addEventListener('click', () => {
    getWidgetWork();
  });

  const currentPage = window.location.pathname.split('/').pop();
  const links = widget.querySelectorAll('li a');
  links.forEach((link) => {
    const page = link.href.split('/').pop();
    if (page === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
