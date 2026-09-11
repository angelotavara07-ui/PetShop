import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Adopcion } from '../models/adopcion.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
  // Estado Reactivo usando Signals (Angular 18+)
  solicitudes = signal<Adopcion[]>([
    { id: 1001, clienteId: 1, mascotaId: 2, fechaSolicitud: '2026-09-10', motivo: 'Hogar amoroso y seguro con jardín.', tipoVivienda: 'Casa', correo: 'ana@mail.com', estado: 'Pendiente', observaciones: 'Tiene experiencia con mascotas pequeñas.' },
    { id: 1002, clienteId: 2, mascotaId: 3, fechaSolicitud: '2026-09-09', motivo: 'Busca compañía para sus hijos pequeños.', tipoVivienda: 'Departamento', correo: 'luis@mail.com', estado: 'Aprobada' },
    { id: 1003, clienteId: 3, mascotaId: 1, fechaSolicitud: '2026-09-08', motivo: 'Hogar con jardín amplio en las afueras.', tipoVivienda: 'Casa', correo: 'maria@mail.com', estado: 'Pendiente' },
    { id: 1004, clienteId: 1, mascotaId: 4, fechaSolicitud: '2026-09-07', motivo: 'Experiencia previa con gatos rescatados.', tipoVivienda: 'Departamento', correo: 'ana@mail.com', estado: 'Aprobada' },
    { id: 1005, clienteId: 2, mascotaId: 5, fechaSolicitud: '2026-09-06', motivo: 'Familia numerosa, poco espacio pero mucho amor.', tipoVivienda: 'Casa', correo: 'luis@mail.com', estado: 'Rechazada', observaciones: 'Espacio insuficiente reportado en entrevista.' },
    { id: 1006, clienteId: 3, mascotaId: 2, fechaSolicitud: '2026-09-05', motivo: 'Primera mascota en el hogar.', tipoVivienda: 'Otro', correo: 'maria@mail.com', estado: 'Pendiente' },
  ]);

  filtroEstado = signal<'Todos' | 'Pendiente' | 'Aprobada' | 'Rechazada'>('Todos');
  solicitudSeleccionada = signal<Adopcion | null>(null);

  // KPIs Derivados (Computed Signals)
  solicitudesFiltradas = computed(() => {
    const estado = this.filtroEstado();
    if (estado === 'Todos') return this.solicitudes();
    return this.solicitudes().filter(s => s.estado === estado);
  });

  pendientesCount = computed(() => this.solicitudes().filter(s => s.estado === 'Pendiente').length);
  aprobadasCount = computed(() => this.solicitudes().filter(s => s.estado === 'Aprobada').length);
  
  // Hardcoded counts for layout representation
  totalMascotas = signal(24);
  totalClientes = signal(18);

  tasaAdopcion = computed(() => {
    const total = this.solicitudes().length;
    if (total === 0) return 0;
    return Math.round((this.aprobadasCount() / total) * 100);
  });

  // Acciones Interactiva
  setFiltro(estado: 'Todos' | 'Pendiente' | 'Aprobada' | 'Rechazada') {
    this.filtroEstado.set(estado);
  }

  cambiarEstado(id: number | undefined, nuevoEstado: 'Aprobada' | 'Rechazada') {
    if (!id) return;
    this.solicitudes.update(lista => 
      lista.map(sol => sol.id === id ? { ...sol, estado: nuevoEstado } : sol)
    );
  }

  verDetalle(sol: Adopcion) {
    this.solicitudSeleccionada.set(sol);
  }

  cerrarDetalle() {
    this.solicitudSeleccionada.set(null);
  }

  // Helpers UI
  getBadgeClass(estado?: string): string {
    switch (estado) {
      case 'Aprobada': return 'ps-badge-success';
      case 'Rechazada': return 'ps-badge-danger';
      default: return 'ps-badge-warning';
    }
  }

  getNombreCliente(id: number): string {
    const clientes: Record<number, string> = { 1: 'Ana García', 2: 'Luis Torres', 3: 'María López' };
    return clientes[id] ?? `Cliente #${id}`;
  }

  getNombreMascota(id: number): string {
    const mascotas: Record<number, string> = { 1: 'Max (Perro)', 2: 'Luna (Gato)', 3: 'Rocky (Perro)', 4: 'Mia (Gato)', 5: 'Tobi (Conejo)' };
    return mascotas[id] ?? `Mascota #${id}`;
  }
}
