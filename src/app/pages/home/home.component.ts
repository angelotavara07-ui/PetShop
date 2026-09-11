import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    {
      icon: 'fa-solid fa-paw',
      title: 'Mascotas',
      subtitle: 'Ver y registrar',
      route: '/mascotas',
      color: 'blue'
    },
    {
      icon: 'fa-solid fa-user-group',
      title: 'Clientes',
      subtitle: 'Gestionar propietarios',
      route: '/clientes',
      color: 'green'
    },
    {
      icon: 'fa-solid fa-heart',
      title: 'Adopciones',
      subtitle: 'Dar una oportunidad',
      route: '/adopciones',
      color: 'orange'
    },
    {
      icon: 'fa-solid fa-chart-column',
      title: 'Dashboard',
      subtitle: 'Ver estadísticas',
      route: '/dashboard',
      color: 'purple'
    }
  ];
}