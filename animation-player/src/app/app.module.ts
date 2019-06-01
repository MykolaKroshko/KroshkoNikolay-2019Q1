import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.route';

import { PaletteModule } from './palette/palette.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PaletteModule,
    RouterModule.forRoot(ROUTES, {
      onSameUrlNavigation: 'reload',
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    })
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
