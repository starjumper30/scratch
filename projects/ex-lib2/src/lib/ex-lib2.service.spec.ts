import { TestBed } from '@angular/core/testing';

import { ExLib2Service } from './ex-lib2.service';

describe('ExLib2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExLib2Service = TestBed.get(ExLib2Service);
    expect(service).toBeTruthy();
  });
});
