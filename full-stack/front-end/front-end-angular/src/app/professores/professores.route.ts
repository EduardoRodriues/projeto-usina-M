import { Routes } from '@angular/router';
import { professoresResolver } from './guards/professores.resolver';

export const professores_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/professores/professores.component').then(
        (m) => m.ProfessoresComponent
      ),
  },
  {
    path: 'novo',
    loadComponent: () =>
      import('./components/professores-form/professores-form.component').then(
        (m) => m.ProfessoresFormComponent
      ),
    resolve: {
      professor: professoresResolver,
    },
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./components/professores-form/professores-form.component').then(
        (m) => m.ProfessoresFormComponent
      ),
    resolve: {
      professor: professoresResolver,
    },
  },
];
