import { TestBed } from '@angular/core/testing';

import { NoobCommService } from './noob-comm.service';

describe('NoobCommService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NoobCommService = TestBed.get(NoobCommService);
    expect(service).toBeTruthy();
  });
});
