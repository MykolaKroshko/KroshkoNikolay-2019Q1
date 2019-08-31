import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PaletteService } from '../palette.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: [ './preview.component.scss' ]
})

export class PreviewComponent implements OnInit, OnDestroy {
  public currentFPS: number = 0;
  public currentFrame: object[] = []; 

  private currentFrameNumber: number = 0;
  private framesList: object[][] = [];
  private framesListSub: Subscription = null;
  private previewInterval: any = null;

  constructor(
    private plSrv: PaletteService
  ) {}

  public ngOnInit() {
    this.framesListSub = this.plSrv.framesList.subscribe((frames) => {
      this.framesList = frames;
      this.onFPSChange(this.currentFPS);
    });
  }

  public ngOnDestroy() {
    this.framesListSub.unsubscribe();
  }

  public onFPSChange($event) {
    this.cleanInterval()
    if ($event === 0 || this.framesList.length <= 1) {
      this.currentFrame = this.framesList[this.currentFrameNumber];
      return;
    }
    this.previewInterval = setInterval(() => {
      this.currentFrameNumber++;
      if (this.currentFrameNumber >= this.framesList.length) {
        this.currentFrameNumber = 0;
      }
      this.currentFrame = this.framesList[this.currentFrameNumber];
    }, 1000 / this.currentFPS);
  }

  private cleanInterval() {
    if (this.previewInterval) {
      clearInterval(this.previewInterval);
      this.previewInterval = null;
    }
  }
}
