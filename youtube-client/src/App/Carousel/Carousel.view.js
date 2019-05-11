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
    const ids = Object.keys(clips);
    let html = '';
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const data = clips[id];
      html += CarouselView.clipTemplate(data, id);
    }
    this.carousel.innerHTML = html;
  }

  static clipTemplate(clip, id) {
    return `
      <li class='carousel__list_item'>
        <div class='clip'>
          <div class='clip__image_container'>
            <img class='clip__image' src='${clip.image}'/>
            <span class='clip__title'>
              <a href="https://www.youtube.com/watch?v=${id}" target="_blank">${clip.title}</a>
            </span>
          </div>
          <div class='clip__texts'>
            <div class='clip__chanel has-icon'>${clip.channelTitle}</div>
            <div class='clip__published has-icon'>${clip.publishedAt.replace(/T.*/, '')}</div>
            <div class='clip__views has-icon'>${clip.views}</div>
            <div class='clip__description'>${clip.description}</div>
          </div>
        </div>
      </li>
    `;
  }
}
