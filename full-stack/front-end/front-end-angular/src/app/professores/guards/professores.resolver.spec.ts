import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { professoresResolver } from './professores.resolver';

describe('professoresResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => professoresResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
