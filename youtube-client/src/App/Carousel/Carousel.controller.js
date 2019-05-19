import CarouselView from './Carousel.view';

export default class Carousel {
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
    console.log('addEventListeners');
    window.addEventListener('resize', () => {
      console.log('resize');
      this.view.updateNavbar();
    });
  }
}
