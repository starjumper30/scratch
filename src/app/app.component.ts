import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientSideComposition';


  tileData = [
    {
      title: 'tile 1'
    },
    {
      title: 'tile 2'
    },
    {
      title: 'tile 3'
    },
    {
      title: 'tile 4'
    }
  ];
}
