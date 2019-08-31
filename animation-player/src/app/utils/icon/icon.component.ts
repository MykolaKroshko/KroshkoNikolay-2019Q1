import { Component, Input, OnInit } from '@angular/core';
import { IconInfo } from './icon.info';

const ICON_INFOS = new Map();
ICON_INFOS.set('copy', new IconInfo(512, 512));
ICON_INFOS.set('delete', new IconInfo(408, 408));
ICON_INFOS.set('plus', new IconInfo(402, 402));

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() public name: string;
  public url: string;
  public viewBox: string;

  public initUrl() {
    this.url = ICON_INFOS.get(this.name).getUrl(this.name);
  }

  public initViewBox() {
    this.viewBox = ICON_INFOS.get(this.name).getViewBox();
  }

  public ngOnInit(): void {
    this.initUrl();
    this.initViewBox();
  }
}
