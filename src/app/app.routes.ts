import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'clientes/registro',
    loadComponent: () =>
      import('./clientes/registro/registro-cliente.component').then(
        (m) => m.RegistroClienteComponent
      ),
  },
  {
    path: 'adopciones/solicitud',
    loadComponent: () =>
      import('./adopciones/solicitud/solicitud-adopcion.component').then(
        (m) => m.SolicitudAdopcionComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

