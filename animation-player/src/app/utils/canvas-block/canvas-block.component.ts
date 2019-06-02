import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'canvas-block',
  templateUrl: './canvas-block.component.html',
  styleUrls: [ './canvas-block.component.scss' ]
})
export class CanvasBlockComponent implements AfterViewInit{
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  @Input() set picture(pic: string[][]){
    this._frame = pic;
    Promise.resolve(null).then(() =>
      this.drawPicture()
    );
  };
  
  @Input() set size(size: number){
    this._size = size;
    Promise.resolve(null).then(() =>
      this.drawPicture()
    );
  };

  get size() {
    return this._size;
  }
  
  private _frame: string[][] = [];
  private _size: number = 0;

  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

  private drawPicture() {
    const pic = this._frame;
    console.log('size', this._size)
    console.log('pic', pic.length)
    const len = pic.length;
    const sideLen = this._size/len;
    pic.map((row, i) => {
      row.map((color, j) => {
        this.context.fillStyle = color;
        this.context.fillRect(
          i * sideLen, 
          j * sideLen, 
          (i + 1) * sideLen, 
          (j + 1) * sideLen
        );
      })
    })
  }
}
