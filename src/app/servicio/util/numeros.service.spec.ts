import { TestBed } from '@angular/core/testing';

import { NumerosService } from './numeros.service';

describe('NumerosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NumerosService = TestBed.get(NumerosService);
    expect(service).toBeTruthy();
  });
});
