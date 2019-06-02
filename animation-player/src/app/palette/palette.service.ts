import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PaletteService {
  public paletteSize;
  public framesList;
  public currentFrame;

  private framesListSubject = new BehaviorSubject<object[]>([]);
  private currentFrameSubject = new BehaviorSubject<number>(0);
  private paletteSizeSubject = new BehaviorSubject<number>(32);

  constructor() {
    this.framesList = this.framesListSubject.asObservable();
    this.currentFrame = this.currentFrameSubject.asObservable();
    this.paletteSize = this.paletteSizeSubject.asObservable();
    this.appendNewFrame();
  }

  public appendNewFrame() {
    const size = this.getObservableValue(this.paletteSize);
    const framesList = this.getObservableValue(this.framesList);
    const frame = new Array(size).fill(null);
    frame.map((a, i) => {
      const line = new Array(size).fill(null);
      line.map((b, j) => {
        line[j] = this.getRandomColor();
      });
      frame[i] = line;
    })
    this.framesListSubject.next([...framesList, frame]);
    this.currentFrameSubject.next(framesList.length);
  }

  public duplicateFrame(index: number) {
    let framesList = this.getObservableValue(this.framesList);
    framesList = [
      ...framesList.slice(0, index + 1),
      framesList[index],
      ...framesList.slice(index + 1)
    ];
    this.framesListSubject.next(framesList);
    this.currentFrameSubject.next(index + 1);
  }

  public removeFrame(index: number) {
    let framesList = this.getObservableValue(this.framesList);
    const currentFrame = this.getObservableValue(this.currentFrame);
    framesList = [
      ...framesList.slice(0, index),
      ...framesList.slice(index + 1)
    ]
    this.framesListSubject.next(framesList);
    if(index === currentFrame && index !== 0 || index < currentFrame) {
      this.currentFrameSubject.next(index - 1);
    }
  }

  private getRandomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  public getObservableValue(obser) {
    return obser.source._value;
  }
}
