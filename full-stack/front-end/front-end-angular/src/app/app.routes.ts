import { Routes } from '@angular/router';
import { alunos_routes } from './alunos/alunos.route';
import { frequencia_routes } from './frequencia/frequencia.route';
import { login_cadastro_routes } from './login_cadastro/login_cadastro.routes';
import { AuthGuard } from './login_cadastro/services/auth-guard.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    children: login_cadastro_routes,
  },
  {
    path: 'alunos',
    canActivate: [AuthGuard],
    children: alunos_routes,
  },
  {
    path: 'frequencias',
    canActivate: [AuthGuard],
    children: frequencia_routes,
  },
];
