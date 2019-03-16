import { NgModule } from '@angular/core';
import { ExLib2Component } from './ex-lib2.component';
import { FooComponent } from './foo/foo.component';

@NgModule({
  declarations: [ExLib2Component, FooComponent],
  imports: [
  ],
  exports: [ExLib2Component, FooComponent]
})
export class ExLib2Module { }
