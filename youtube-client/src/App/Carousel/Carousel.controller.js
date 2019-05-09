import CarouselView from './Carousel.view';

export default class Carousel {
  run() {
    this.view = new CarouselView('body');
    this.view.render();
  }

  showClips(clips) {
    this.view.updateClips(clips);
  }
}
