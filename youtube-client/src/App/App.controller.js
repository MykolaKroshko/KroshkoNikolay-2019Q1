import '../assets/normalize.css';
import './App.css';
import Search from './Search/Search.controller';
import Carousel from './Carousel/Carousel.controller';

export default class App {
  searchCallback(clips) {
    this.carousel.showClips(clips);
  }

  nextPageCallback(clips) {
    this.carousel.addClips(clips);
  }

  run() {
    const search = new Search(
      this.searchCallback.bind(this),
      this.nextPageCallback.bind(this),
    );
    search.run();
    this.carousel = new Carousel();
    this.carousel.run();
  }
}
