import './Carousel.css';

export default class CarouselView {
  constructor(selector) {
    this.selector = selector;
    this.clips = null;
    this.carousel = null;
    this.navigation = null;
    this.lastPage = 0;
  }

  render() {
    const div = document.createElement('div');
    div.classList.add('carousel');
    const ul = document.createElement('ul');
    ul.classList.add('carousel__list');
    ul.setAttribute('id', 'carousel__list');
    this.carousel = ul;
    div.appendChild(ul);

    const nav = document.createElement('ul');
    nav.classList.add('carousel__nav');
    nav.setAttribute('id', 'carousel__nav');
    this.navigation = nav;
    div.appendChild(nav);

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
      const html = this.renderClips(clips);
      this.carousel.innerHTML = html;
      this.carousel.classList.remove('error');
      this.carousel.classList.remove('empty');
    }
  }

  appendClips(clips) {
    if (clips || Object.keys(clips).length > 0 || !clips.error) {
      if (!this.carousel.classList.contains('error') && !this.carousel.classList.contains('empty')) {
        this.clips = { ...this.clips, ...clips };
        const html = this.renderClips(clips);
        this.carousel.innerHTML += html;
      }
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
    this.updateNavbar();
    return html;
  }

  updateNavbar() {
    if (!this.clips) {
      return;
    }
    const clipsNumber = Object.keys(this.clips).length || 0;
    const styles = getComputedStyle(document.documentElement);
    const perPage = parseInt(styles.getPropertyValue('--clips-per-page'), 10);
    const currentPage = parseInt(styles.getPropertyValue('--current-page'), 10);
    this.lastPage = Math.floor(clipsNumber / perPage);
    let html = '';
    for (let i = 0; i < this.lastPage; i += 1) {
      html += `
        <li class="carousel__nav_item">
          <button type="button" data-page="${i}" class="carousel__item_button ${i === currentPage ? 'carousel__item_button--current' : ''}">
            ${i + 1}
          </button>
          <div class="carousel__nav_tooltip">${i + 1}</div>
        </li>
      `;
    }
    this.navigation.innerHTML = html;
  }

  goToPage(page, node) {
    const pageInt = parseInt(page, 10);
    document.documentElement.style.setProperty('--current-page', pageInt);
    this.navigation.querySelector('.carousel__item_button--current').classList.remove('carousel__item_button--current');
    node.classList.add('carousel__item_button--current');
    return (pageInt + 1) === this.lastPage;
  }

  static clipTemplate(clip, id) {
    return `
      <li class='carousel__list_item'>
        <div class='clip'>
          <div class='clip__image_container'>
            <img class='clip__image' src='${clip.image}'/>
            <span class='clip__title'>
              <a href="https://www.youtube.com/watch?v=${id}" tabindex="-1" target="_blank">${clip.title}</a>
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
