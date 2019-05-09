import SearchModel from './Search.model';
import SearchView from './Search.view';

export default class Search {
  constructor(cb) {
    this.cb = cb;
    this.model = new SearchModel();
  }

  run() {
    const view = new SearchView('body');
    view.render();
    this.addListeners();
  }

  addListeners() {
    document.querySelector('.search__clear_btn').addEventListener('click', () => {
      window.search_input.value = '';
    });

    window.search_input.addEventListener('input', async (e) => {
      const q = e.target.value;
      const data = await this.model.getClips(q);
      console.log(data);
    });
  }
}
