import { TestBed } from '@angular/core/testing';

import { Feature1Service } from './feature1.service';

describe('Feature1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Feature1Service = TestBed.get(Feature1Service);
    expect(service).toBeTruthy();
  });
});
