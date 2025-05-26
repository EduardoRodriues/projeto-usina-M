import { alunos_routes } from '../alunos/alunos.route';
import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';

export const login_cadastro_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../login_cadastro/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'cadastrar',
    loadComponent: () =>
      import('../login_cadastro/pages/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: 'alunos',
    children: alunos_routes,
  },
];
