import {Inject, Injectable, InjectionToken} from '@angular/core';
export const Recognition = new InjectionToken<string>('Default number of tries for Wolfrider to recognise');

// Injecting token is something like looking up values in a map, then the token is a key,
// token has to have run-time values, so a class type , but not interface or string
providers

@Injectable()
export class RecogniseInterceptor {
  constructor(@Inject(Recognition) recognise: number) {}
}
