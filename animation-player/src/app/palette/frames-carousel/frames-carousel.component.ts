import { Component } from '@angular/core';
import { PaletteService } from '../palette.service'
@Component({
  selector: 'frames-carousel',
  templateUrl: './frames-carousel.component.html',
  styleUrls: [ './frames-carousel.component.scss' ]
})
export class FramesCarouselComponent {
  private frames: object[] = [];

  constructor(
    private plSrv: PaletteService
  ) {
    this.frames = plSrv.frames;
  }
}
