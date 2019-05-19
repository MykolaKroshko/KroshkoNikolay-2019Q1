import './Carousel.css';

export default class CarouselView {
  constructor(selector) {
    this.selector = selector;
    this.clips = null;
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
      this.clips = null;
      this.carousel.innerHTML = '';
      this.carousel.classList.add('empty');
      this.carousel.classList.remove('error');
    } else if (clips.error) {
      this.clips = null;
      this.carousel.innerHTML = `
        <div class='carousel-error'>ERROR ${clips.error.code}: ${clips.error.message}</div>
      `;
      this.carousel.classList.add('error');
      this.carousel.classList.remove('empty');
    } else {
      this.clips = clips;
      const html = CarouselView.renderClips(clips);
      this.carousel.innerHTML = html;
      this.carousel.classList.remove('error');
      this.carousel.classList.remove('empty');
    }
  }

  appendClips(clips) {
    if (clips || Object.keys(clips).length > 0 || !clips.error) {
      if (!this.carousel.classList.contains('error') && !this.carousel.classList.contains('empty')) {
        const html = CarouselView.renderClips(clips);
        this.carousel.innerHTML += html;
      }
    }
  }

  static renderClips(clips) {
    const ids = Object.keys(clips);
    let html = '';
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i];
      const data = clips[id];
      html += CarouselView.clipTemplate(data, id);
    }
    return html;
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
