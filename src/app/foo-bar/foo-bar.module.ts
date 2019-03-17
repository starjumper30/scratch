import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExLib2Module, NoobForDirective } from 'ex-lib2';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ExLib2Module,
    NoobForDirective
  ],
  providers: [],
  bootstrap: []
})
export class FooBarModule { }
