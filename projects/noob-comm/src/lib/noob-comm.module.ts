import { NgModule } from '@angular/core';
import { NoobCommComponent } from './noob-comm.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RecogniseInterceptor, Recognition} from './recognise-interceptor';
import {API_URL, NoobCommService} from './noob-comm.service';

export function foo(noobComm: NoobCommService) {
  return new RecogniseInterceptor(NoobCommService.getRecognition()); // Is this even working? @Chris,please help!!
}

export function bar() {
  return new RecogniseInterceptor(1);
  // Am i using a lambda here to inject the recognise value? Wow!!
}

@NgModule({
  declarations: [NoobCommComponent],
  imports: [
  ],
  exports: [NoobCommComponent],
  // Provider is declaration of where the value of token comes from.
  providers: [
  //   {
  //   provide: Recognition,
  //     useClass: RecogniseInterceptor,
  //     multi: true Do i need multi to be true as there can be different instances running around and angular can trip up?
    // Answer : i need all values provided at different times, so that all can be captured and combined for e.g. in a routing
  // }
    {
      provide: Recognition,
      useFactory: bar
    },
    // But what if I need a service. I need deps, i cannot only specify
    {
      provide : Recognition,
      useFactory: foo,
      deps: [NoobCommService]
    },
    NoobCommService, // I am generating first instance of service, but if i use useClass to provide a service say
    // useClass will generate another instance of same service and diff versions at diff places
    {
      provide: API_URL,
      useExisting: NoobCommService // alias does not have problems, see existing token and update with that, so i have one instance really
    }
]
})
export class NoobCommModule { }
