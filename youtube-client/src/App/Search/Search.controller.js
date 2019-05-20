import SearchModel from './Search.model';
import SearchView from './Search.view';

export default class Search {
  constructor(searchCB, nextPageCB) {
    this.searchCB = searchCB;
    this.nextPageCB = nextPageCB;
    this.timer = null;
  }

  run() {
    const view = new SearchView('body');
    view.render();
    this.addListeners();
  }

  addListeners() {
    this.model = new SearchModel();

    document.querySelector('.search__clear_btn').addEventListener('click', () => {
      window.search_input.value = '';
    });

    window.search_input.addEventListener('input', (e) => {
      const q = e.target.value;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (q.length > 3) {
        this.timer = setTimeout(async () => {
          const data = await this.model.getClips(q);
          this.searchCB(data);
        }, 1000);
      }
    });
  }

  async getNextPage() {
    const data = await this.model.getClips();
    this.nextPageCB(data);
  }
}
