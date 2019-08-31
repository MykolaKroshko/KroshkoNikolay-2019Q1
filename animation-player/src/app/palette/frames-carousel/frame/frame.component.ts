import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PaletteService } from '../../palette.service';

@Component({
  selector: 'frame-item',
  templateUrl: './frame.component.html',
  styleUrls: [ './frame.component.scss' ]
})

export class FrameComponent implements OnDestroy, OnInit{
  @Input() public frame: object[] = [];
  @Input() public frameIndex: number = 0;
  public currentIndex: number = 0;

  private currentFrameSub: Subscription = null;

  constructor(
    private plSrv: PaletteService
  ) {}

  public ngOnInit() {
    this.currentFrameSub = this.plSrv.currentFrame.subscribe((index) => {
      this.currentIndex = index;
    });
  }

  public ngOnDestroy() {
    this.currentFrameSub.unsubscribe();
  }

  public onDeleteBynClick() {
    this.plSrv.removeFrame(this.frameIndex);
  }
  
  public onCopyBynClick() {
    this.plSrv.duplicateFrame(this.frameIndex);
  }
}
