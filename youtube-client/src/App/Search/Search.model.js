import YOUTUBE_API_KEY from '../constants';

export default class SearchModel {
  constructor() {
    this.video_url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=15&q=`;
    this.views_url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&part=snippet,statistics&id=`;
    this.controller = undefined;
    this.signal = undefined;
    this.clipData = {};
    this.clipIds = [];
    this.nextPage = '';
    this.query = '';
  }

  async getClips(q) {
    let clips;
    if (q) {
      this.query = q;
      clips = await this.fetchYoutubeData(`${this.video_url}${this.query}`);
    } else {
      clips = await this.fetchYoutubeData(`${this.video_url}${this.query}&pageToken=${this.nextPage}`);
    }
    if (!clips) {
      return false;
    }
    if (clips.error) {
      return clips;
    }
    this.extractClipData(clips);
    const views = await this.fetchYoutubeData(`${this.views_url}${this.clipIds.join()}`);
    this.extractClipViews(views);
    return this.clipData;
  }

  extractClipData(data) {
    const clipIds = [];
    const clipData = {};
    data.items.forEach((clip) => {
      clipIds.push(clip.id.videoId);
      clipData[clip.id.videoId] = {
        title: clip.snippet.title,
        description: clip.snippet.description,
        channelTitle: clip.snippet.channelTitle,
        publishedAt: clip.snippet.publishedAt,
        image: clip.snippet.thumbnails.medium.url,
      };
    });
    this.clipIds = clipIds;
    this.clipData = clipData;
    this.nextPage = data.nextPageToken || '';
  }

  extractClipViews(data) {
    data.items.forEach((clip) => {
      if (this.clipIds.indexOf(clip.id) > -1) {
        this.clipData[clip.id].views = clip.statistics.viewCount;
      }
    });
  }

  async fetchYoutubeData(link) {
    if (this.controller !== undefined) {
      this.controller.abort();
    }

    if ('AbortController' in window) {
      this.controller = new AbortController();
      this.signal = this.controller.signal;
    }

    const response = await fetch(
      link,
      {
        signal: this.signal,
      },
    )
      .then(res => res.json())
      .catch(() => {
        // eslint-disable-next-line
        console.warn('Not finished request was canceled');
      });

    return response;
  }
}
