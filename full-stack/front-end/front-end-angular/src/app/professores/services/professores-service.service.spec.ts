import { TestBed } from '@angular/core/testing';

import { ProfessoresServiceService } from './professores-service.service';

describe('ProfessoresServiceService', () => {
  let service: ProfessoresServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessoresServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
