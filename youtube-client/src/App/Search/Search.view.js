import './Search.css';

export default class SearchView {
  constructor(selector) {
    this.selector = selector;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('search');
    div.innerHTML = `
      <input class="search__input" id="search_input" type="text"/>
      <button class="search__clear_btn" type="button"></button>
    `;
    document.querySelector(this.selector).appendChild(div);
  }
}
