import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './palette.routes';

import { HeaderModule } from '../header';

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
  exports: [

  ],
  providers: [

  ]
})
export class PaletteModule {
  public static routes = routes;
}
