export class IconInfo {
  public width: number;
  public height: number;
  public hash: string = 'root';

  constructor(width: number, height: number, hash?: string) {
    this.width = width;
    this.height = height;
    if (hash != null) {
      this.hash = hash;
    }
  }

  public getViewBox(): string {
    return '0 0 ' + this.width + ' ' + this.height;
  }

  public getUrl(iconName: string): string {
    return '/assets/img/icons/' + iconName + '.svg#' + this.hash;
  }

}
