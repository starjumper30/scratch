import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-feature1',
  template: `
    <p>
      feature1 works!
    </p>
  `,
  styles: []
})
export class Feature1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
