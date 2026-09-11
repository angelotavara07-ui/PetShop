export interface Adopcion {
  id?: number;
  clienteId: number;
  mascotaId: number;
  fechaSolicitud: string;
  motivo: string;
  tipoVivienda: 'Casa' | 'Departamento' | 'Otro';
  correo: string;
  observaciones?: string;
  estado?: 'Pendiente' | 'Aprobada' | 'Rechazada';
}
