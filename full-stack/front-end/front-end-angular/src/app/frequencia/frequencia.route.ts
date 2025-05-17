import { Routes } from '@angular/router';

export const frequencia_routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../frequencia/containers/frequencia/frequencia.component').then(
        (m) => m.FrequenciaComponent
      ),
  },
];
