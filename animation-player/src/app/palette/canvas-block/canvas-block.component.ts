import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'canvas-block',
  templateUrl: './canvas-block.component.html',
  styleUrls: [ './canvas-block.component.scss' ]
})
export class CanvasBlockComponent implements AfterViewInit{
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;

  @Input() set picture(pic: object[]){
    Promise.resolve(null).then(() =>
      this.drawPicture(pic)
    );
  };
  @Input() public size: number = 0;
  
  ngAfterViewInit(): void {
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  }

  private drawPicture(pic) {
    const len = pic.length;
    const sideLen = this.size/len;
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
