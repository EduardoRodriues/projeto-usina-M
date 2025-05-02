import { ResolveFn } from '@angular/router';
import { Alunos } from '../containers/alunos/models/alunos';
import { AlunosService } from '../services/alunos.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const alunosResolver: ResolveFn<Alunos> = (route, state) => {
  const service = inject(AlunosService);

  if (route.params && route.params['id']) {
    return service.buscarId(route.params['id']);
  }
  return of({ _id: '', nome: '', email: ''});
};
