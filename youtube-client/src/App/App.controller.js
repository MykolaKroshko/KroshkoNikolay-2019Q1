import '../assets/normalize.css';
import './App.css';
import Search from './Search/Search.controller';
import Carousel from './Carousel/Carousel.controller';

export default class App {
  searchCallback(clips) {
    this.carousel.showClips(clips);
  }

  renderNextPageCallback(clips) {
    this.carousel.addClips(clips);
  }

  requestNextPageCallback() {
    this.search.getNextPage();
  }

  run() {
    this.search = new Search(
      this.searchCallback.bind(this),
      this.renderNextPageCallback.bind(this),
    );
    this.search.run();
    this.carousel = new Carousel(
      this.requestNextPageCallback.bind(this),
    );
    this.carousel.run();
  }
}
