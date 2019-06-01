import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './palette.routes';

import { HeaderModule } from '../header';

import { PaletteService } from './palette.service';

import { CanvasBlockComponent } from './canvas-block';
import { PaletteComponent } from './palette.component';
import { PreviewComponent } from './preview';
import { FrameComponent } from './frames-carousel';
import { FramesCarouselComponent } from './frames-carousel';

@NgModule({
  declarations: [
    CanvasBlockComponent,
    FrameComponent,
    FramesCarouselComponent,
    PaletteComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    PaletteService,
  ]
})
export class PaletteModule {
  public static routes = routes;
}
