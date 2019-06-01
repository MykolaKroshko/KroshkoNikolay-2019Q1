import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './palette.routes';

import { HeaderModule } from '../header';

import { PaletteService } from './palette.service';

import { PaletteComponent } from './palette.component';

@NgModule({
  declarations: [
    PaletteComponent
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
