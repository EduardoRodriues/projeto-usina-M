import { ResolveFn } from '@angular/router';
import { Professores } from '../containers/professores/model/professores';
import { ProfessoresServiceService } from '../services/professores-service.service';
import { inject } from '@angular/core';
import { of } from 'rxjs';

export const professoresResolver: ResolveFn<Professores> = (route, state) => {
  const service = inject(ProfessoresServiceService);

  if (route.params && route.params['id']) {
    return service.buscarId(route.params['id']);
  }
  return of({ _id: '', nome: '', email: '', cpf: '', contato: '' });
};
