import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  {
    path: 'nosotros',
    loadComponent: () =>
      import('./pages/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },

  {
    path: 'mascotas',
    loadComponent: () =>
      import('./pages/pet-form/pet-form.component').then(
        (m) => m.PetFormComponent
      ),
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