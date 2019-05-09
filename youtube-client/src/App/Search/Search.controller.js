// import SearchModel from './Search.model';
import SearchView from './Search.view';

export default class Search {
  constructor(cb) {
    this.state = {
      url: '',
    };

    this.cb = cb;
  }

  run() {
    // const model = new SearchModel(this.state);
    // const data = await model.getClipNames();

    const view = new SearchView('body');
    view.render();
    console.log(this);
  }
}
