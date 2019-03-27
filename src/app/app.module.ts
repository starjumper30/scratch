import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExLib2Module } from 'ex-lib2';
import { NoobForDirective } from 'ex-lib2';
import { NoobCarouselDirective } from 'ex-lib2';
import { FooBarComponent } from './foo-bar/foo-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import { TileComponent } from './tile/tile.component';
import {NgbCarouselExtendedModule} from '../../projects/ngbootstrap-carousel-extended/src/lib/carousel.module';

@NgModule({
  declarations: [
    AppComponent,
    FooBarComponent,
    TileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ExLib2Module,
    NgbCarouselModule,
    NgbCarouselExtendedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
