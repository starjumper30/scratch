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
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create backend
import { backendProvider } from '../interceptors/backend';

import { JwtInterceptor } from '../interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../interceptors/error.interceptor'

@NgModule({
  declarations: [
    AppComponent,
    FooBarComponent,
    TileComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ExLib2Module,
    NgbCarouselModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    backendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
