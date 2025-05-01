import { Routes } from '@angular/router';

export const alunos_routes: Routes = [

  {path: '',
    loadComponent: () =>
      import('./containers/alunos/alunos.component').then(
        (m) => m.AlunosComponent
      ),
  }
];
