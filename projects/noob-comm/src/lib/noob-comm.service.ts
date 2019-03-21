import {Inject, Injectable, InjectionToken} from '@angular/core';
export const API_URL = new InjectionToken<string>('Api endpoint url');

@Injectable({
  providedIn: 'root'
})


export class NoobCommService {
  constructor(@Inject(API_URL) endpoint: string) { }

   static getRecognition(): number {
    return Math.random();
  }
}
