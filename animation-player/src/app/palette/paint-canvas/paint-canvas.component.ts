import { Component, OnInit, OnDestroy, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { PaletteService } from '../palette.service';

@Component({
  selector: 'paint-canvas',
  templateUrl: './paint-canvas.template.html',
  styleUrls: [ './paint-canvas.template.scss' ]
})
export class PaintCanvasComponent implements OnInit, OnDestroy, AfterViewInit {
  public currentFrame: object[] = [];
  public canvasSize: number = 0;

  private currentIndex: number = 0;
  private framesList: object[][] = [];

  private framesListSub: Subscription = null;
  private currentFrameSub: Subscription = null;

  @HostListener('window:resize', ['$event.target']) 
  onResize() { 
    const elHeight = this.el.nativeElement.offsetHeight;
    const elWidth = this.el.nativeElement.offsetWidth;
    this.canvasSize = elHeight > elWidth ? elWidth : elHeight;
  }
  
  constructor(
    private el: ElementRef,
    private plSrv: PaletteService
  ) {
    this.el = el; 
  }

  public ngOnInit() {
    this.framesListSub = this.plSrv.framesList.subscribe((frames) => {
      this.framesList = frames;
      this.updateCurrentFrame();
    });

    this.currentFrameSub = this.plSrv.currentFrame.subscribe((index) => {
      this.currentIndex = index;
      this.updateCurrentFrame();
    });
  }

  public ngAfterViewInit() {
    this.onResize();
  }

  public ngOnDestroy() {
    this.framesListSub.unsubscribe();
    this.currentFrameSub.unsubscribe();
  }

  private updateCurrentFrame() {
    this.currentFrame = this.framesList[this.currentIndex]
  }
}
