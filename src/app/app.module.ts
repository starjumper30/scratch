import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ExLib2Module } from 'ex-lib2';
import { NoobForDirective } from 'ex-lib2';
import { FooBarComponent } from './foo-bar/foo-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    FooBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ExLib2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
