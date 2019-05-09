import './Carousel.css';

export default class CarouselView {
  constructor(selector) {
    this.selector = selector;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('carousel');
    const ul = document.createElement('ul');
    ul.classList.add('carousel__list');
    ul.setAttribute('id', 'carousel__list');
    this.carousel = ul;
    div.appendChild(ul);
    document.querySelector(this.selector).appendChild(div);
  }

  updateClips(clips) {
    if (!clips || Object.keys(clips).length === 0) {
      this.carousel.innerHTML = '';
    } else if (clips.error) {
      this.carousel.innerHTML = `
        <div class='carousel-error'>ERROR ${clips.error.code}: ${clips.error.message}</div>
      `;
    } else {
      this.renderClips(clips);
    }
  }

  renderClips(clips) {
    this.carousel.innerHTML = 'clips to be added';
    console.log(clips);
  }
}
