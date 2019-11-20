import { TestBed } from '@angular/core/testing';

import { TasaService } from './tasa.service';

describe('TasaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasaService = TestBed.get(TasaService);
    expect(service).toBeTruthy();
  });
});
