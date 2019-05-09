import '../assets/normalize.css';
import './App.css';
import Search from './Search/Search.controller';

export default class App {
  constructor() {
    this.state = {};
  }

  searchCallback(state) {
    this.state = state;
    console.log(state);
  }

  run() {
    const search = new Search(this.searchCallback);
    search.run();
  }
}
