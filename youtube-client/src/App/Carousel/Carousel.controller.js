import CarouselView from './Carousel.view';

export default class Carousel {
  constructor(nextPageCB) {
    this.nextPageCB = nextPageCB;
  }

  run() {
    this.view = new CarouselView('body');
    this.view.render();
    this.addEventListeners();
  }

  showClips(clips) {
    this.view.updateClips(clips);
  }

  addClips(clips) {
    this.view.appendClips(clips);
  }

  addEventListeners() {
    window.addEventListener('resize', () => {
      this.view.updateNavbar();
    });

    window.carousel__nav.addEventListener('click', (e) => {
      const el = e.target;
      if (el.classList.contains('carousel__item_button')) {
        if (!el.classList.contains('carousel__item_button--current')) {
          const last = this.view.goToPage(el.dataset.page, el);
          if (last) {
            this.nextPageCB();
          }
        }
      }
    });
  }
}
