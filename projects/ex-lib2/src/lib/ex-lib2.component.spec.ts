import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExLib2Component } from './ex-lib2.component';

describe('ExLib2Component', () => {
  let component: ExLib2Component;
  let fixture: ComponentFixture<ExLib2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExLib2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExLib2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
