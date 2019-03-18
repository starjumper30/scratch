import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NoobForDirective } from 'ex-lib2';

@Component({
  selector: 'app-foo-bar',
  templateUrl: './foo-bar.component.html',
  styleUrls: ['./foo-bar.component.css']
})
export class FooBarComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef) { }

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

  public selectedWolfId = 1;

  ngOnInit() {
    this.selectedWolfId = 1;
  }

  wolfSelected(wolf: Wolf): boolean {
    // console.log('my wolf is', wolf);
    // console.log('selected wolf id', this.selectedWolfId);
/*    if (wolf.id === this.selectedWolfId) { did not work as the method did not reexecute after change detection
      console.log('returning true');
      return true;
    } else {
      console.log('returning false');
      return false;
    }*/
    return wolf.id < 10;
  }

  chooseWolf(selector: boolean) {
    this.selectedWolfId = selector ? this.selectedWolfId + 1 : this.selectedWolfId - 1;
    // console.log('selected id:', this.selectedWolfId);
    this.cd.markForCheck();
  }
}

export interface Wolf {
  id: number;
  name: string;
  alternate?: string;
}
