import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { alunosResolver } from './alunos.resolver';

describe('alunosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => alunosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
