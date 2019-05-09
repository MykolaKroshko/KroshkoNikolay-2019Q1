export default class SearchModel {
  constructor(state) {
    this.state = state;
  }

  static extractClipNames(data) {
    return data.items.map(clip => clip.snippet.title);
  }

  async getClipNames() {
    const { url } = this.state;

    const response = await fetch(url);
    const data = await response.json();

    return SearchModel.extractClipNames(data);
  }
}
