import { Routes } from '@angular/router';
import { alunos_routes } from './alunos/alunos.route';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'alunos' },
  {
    path: 'alunos',
    children: alunos_routes,
  },
];
