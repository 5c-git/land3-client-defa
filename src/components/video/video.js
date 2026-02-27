import './video.scss';

const generateURL = (id) => {
  const query = '?rel=0&showinfo=0&autoplay=1';

  return `https://www.youtube.com/embed/${id}${query}`;
};

const createIframe = (id) => {
  const iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
};

const parseMediaURL = (video) => {
  const regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i;
  const url = video.href;
  const match = url.match(regexp);

  return match[1];
};

const setupVideo = (video) => {
  const link = video.querySelector('.video__link');
  const button = video.querySelector('.video__button');
  const source = video.querySelector('source');
  const media = video.querySelector('.video__media');
  const id = parseMediaURL(link);
  source.setAttribute('srcset', `https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`);
  media.setAttribute('src', `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  video.addEventListener('click', () => {
    const iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
};

const findVideos = () => {
  document.querySelectorAll('.video__wrapper').forEach((el) => {
    setupVideo(el);
  });
};

findVideos();

export default findVideos;
