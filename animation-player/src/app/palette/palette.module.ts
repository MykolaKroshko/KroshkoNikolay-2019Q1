import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './palette.routes';

import { HeaderModule } from '../header';
import { UtilsModule } from '../utils/utils.module';

import { PaletteService } from './palette.service';

import { FrameComponent } from './frames-carousel';
import { FramesCarouselComponent } from './frames-carousel';
import { PaletteComponent } from './palette.component';
import { PaintCanvasComponent } from './paint-canvas';
import { PreviewComponent } from './preview';

@NgModule({
  declarations: [
    FrameComponent,
    FramesCarouselComponent,
    PaletteComponent,
    PaintCanvasComponent,
    PreviewComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FormsModule,
    UtilsModule,
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
