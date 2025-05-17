import { TestBed } from '@angular/core/testing';

import { FrequenciaService } from './frequencia.service';

describe('FrequenciaService', () => {
  let service: FrequenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
