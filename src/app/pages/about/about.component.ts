import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  values = [
    {
      icon: 'fa-solid fa-heart',
      title: 'Compromiso',
      description: 'Cada mascota merece un hogar lleno de amor y cuidado responsable.'
    },
    {
      icon: 'fa-solid fa-shield-heart',
      title: 'Bienestar animal',
      description: 'Priorizamos la salud y el trato digno en cada proceso de adopción.'
    },
    {
      icon: 'fa-solid fa-handshake',
      title: 'Confianza',
      description: 'Acompañamos a familias y mascotas en todo el proceso de adaptación.'
    }
  ];

  stats = [
    { value: '500+', label: 'Adopciones exitosas' },
    { value: '18', label: 'Años de experiencia' },
    { value: '1200+', label: 'Clientes registrados' },
    { value: '24', label: 'Especialistas veterinarios' }
  ];
}