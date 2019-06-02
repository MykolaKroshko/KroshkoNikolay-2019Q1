import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PaletteService } from '../palette.service';
@Component({
  selector: 'frames-carousel',
  templateUrl: './frames-carousel.component.html',
  styleUrls: [ './frames-carousel.component.scss' ]
})
export class FramesCarouselComponent implements OnInit, OnDestroy {
  public framesList: object[] = [];
  private framesListSub: Subscription = null;

  constructor(
    private plSrv: PaletteService
  ) {}

  public ngOnInit() {
    this.framesListSub = this.plSrv.framesList.subscribe((frames) => {
      this.framesList = frames;
      console.log(frames);
    });
  }

  public ngOnDestroy() {
    this.framesListSub.unsubscribe();
  }

  public onNewFrameBtnClick() {
    this.plSrv.appendNewFrame();
  }
}
