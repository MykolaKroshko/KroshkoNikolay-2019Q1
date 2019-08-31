import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { CanvasBlockComponent } from './canvas-block';
import { IconComponent } from './icon';

@NgModule({
  declarations: [
    CanvasBlockComponent,
    IconComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    CanvasBlockComponent,
    IconComponent,
  ],
  providers: [
  ]
})
export class UtilsModule {}
