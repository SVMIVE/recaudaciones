import { TestBed } from '@angular/core/testing';

import { DosaService } from './dosa.service';

describe('DosaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DosaService = TestBed.get(DosaService);
    expect(service).toBeTruthy();
  });
});
