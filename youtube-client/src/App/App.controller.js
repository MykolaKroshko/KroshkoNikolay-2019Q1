import '../assets/normalize.css';
import './App.css';
import Search from './Search/Search.controller';
import Carousel from './Carousel/Carousel.controller';

export default class App {
  constructor() {
    this.state = {};
  }

  searchCallback(clips) {
    this.state = clips;
    this.carousel.showClips(this.state);
  }

  run() {
    const search = new Search(this.searchCallback.bind(this));
    search.run();
    this.carousel = new Carousel();
    this.carousel.run();
  }
}
