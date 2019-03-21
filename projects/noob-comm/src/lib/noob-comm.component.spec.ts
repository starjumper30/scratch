import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoobCommComponent } from './noob-comm.component';

describe('NoobCommComponent', () => {
  let component: NoobCommComponent;
  let fixture: ComponentFixture<NoobCommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoobCommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoobCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
