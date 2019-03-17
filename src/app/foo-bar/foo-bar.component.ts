import { Component, OnInit } from '@angular/core';
import { NoobForDirective } from 'ex-lib2';

@Component({
  selector: 'app-foo-bar',
  templateUrl: './foo-bar.component.html',
  styleUrls: ['./foo-bar.component.css']
})
export class FooBarComponent implements OnInit {

  constructor() { }

  public Wolves: Wolf[] = [
    {id: 1, name: 'Nightrunner'},
    {id: 2, name: 'Starjumper'},
    {id: 3, name: 'Holtfinder', alternate: 'Shyhider'},
    {id: 4, name: 'Whitebrow'},
    {id: 5, name: 'Firecoat'},
    {id: 6, name: 'Bristlebrush'},
    {id: 7, name: 'Smoketreader'},
    {id: 8, name: 'Trollhammer'},
    {id: 9, name: 'Lionskin'},
    {id: 10, name: 'Briersting'},
    {id: 11, name: 'Woodshaver'},
    {id: 12, name: 'Hotburr'},
    {id: 13, name: 'Silvergrace'}
  ];

  public selectedWolfId: number;

  ngOnInit() {
    this.selectedWolfId = 1;
  }

  wolfSelected(wolf: Wolf): boolean {
    console.log('my wolf is', wolf);
    if (wolf.id === this.selectedWolfId) {
      return true;
    } else {
      return false;
    }
  }

  chooseWolf(selector: boolean) {
    this.selectedWolfId = selector ? this.selectedWolfId + 1 : this.selectedWolfId - 1;
    console.log('selected id:', this.selectedWolfId);
  }
}

export interface Wolf {
  id: number;
  name: string;
  alternate?: string;
}
