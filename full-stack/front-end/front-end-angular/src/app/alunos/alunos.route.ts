import { Routes } from '@angular/router';
import { alunosResolver } from './guards/alunos.resolver';

export const alunos_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/alunos/alunos.component').then(
        (m) => m.AlunosComponent
      ),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/alunos-form/alunos-form.component').then(
        (m) => m.AlunosFormComponent
      ),
    resolve: {
      aluno: alunosResolver,
    },
  },
];
