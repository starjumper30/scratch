import { NgModule } from '@angular/core';
import { ExLib2Component } from './ex-lib2.component';
import { FooComponent } from './foo/foo.component';
import { NoobForDirective } from './directives/noob-for.directive';

@NgModule({
  declarations: [ExLib2Component, FooComponent, NoobForDirective],
  imports: [
  ],
  exports: [ExLib2Component, FooComponent, NoobForDirective]
})
export class ExLib2Module { }
