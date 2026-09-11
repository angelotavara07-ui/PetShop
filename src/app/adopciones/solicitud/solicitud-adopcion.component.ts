import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Adopcion } from '../../models/adopcion.model';
import { Cliente } from '../../models/cliente.model';

interface Mascota {
  id: number;
  nombre: string;
  especie: string;
}

@Component({
  selector: 'app-solicitud-adopcion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud-adopcion.component.html',
  styleUrl: './solicitud-adopcion.component.css',
})
export class SolicitudAdopcionComponent implements OnInit {
  form!: FormGroup;
  registroExitoso = false;
  solicitudesRegistradas: Adopcion[] = [];

  tiposVivienda: Array<'Casa' | 'Departamento' | 'Otro'> = [
    'Casa',
    'Departamento',
    'Otro',
  ];

  /** Datos simulados de clientes y mascotas */
  clientes: Cliente[] = [
    { id: 1, nombres: 'Ana', apellidos: 'García', dni: '12345678', telefono: '987654321', correo: 'ana@mail.com', direccion: 'Lima' },
    { id: 2, nombres: 'Luis', apellidos: 'Torres', dni: '23456789', telefono: '912345678', correo: 'luis@mail.com', direccion: 'Miraflores' },
    { id: 3, nombres: 'María', apellidos: 'López', dni: '34567890', telefono: '923456789', correo: 'maria@mail.com', direccion: 'San Isidro' },
  ];

  mascotas: Mascota[] = [
    { id: 1, nombre: 'Max', especie: 'Perro' },
    { id: 2, nombre: 'Luna', especie: 'Gato' },
    { id: 3, nombre: 'Rocky', especie: 'Perro' },
    { id: 4, nombre: 'Mia', especie: 'Gato' },
    { id: 5, nombre: 'Tobi', especie: 'Conejo' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      clienteId: [null, Validators.required],
      mascotaId: [null, Validators.required],
      fechaSolicitud: [this.hoy(), Validators.required],
      tipoVivienda: [null, Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      motivo: ['', [Validators.required, Validators.minLength(10)]],
      observaciones: [''],
    });
  }

  private hoy(): string {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  fieldInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  hasError(field: string, error: string): boolean {
    return !!this.form.get(field)?.hasError(error);
  }

  getNombreCliente(id: number): string {
    const c = this.clientes.find((x) => x.id === +id);
    return c ? `${c.nombres} ${c.apellidos}` : '—';
  }

  getNombreMascota(id: number): string {
    const m = this.mascotas.find((x) => x.id === +id);
    return m ? `${m.nombre} (${m.especie})` : '—';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nueva: Adopcion = {
      ...this.form.value,
      id: Date.now(),
      estado: 'Pendiente',
    };
    this.solicitudesRegistradas.unshift(nueva);
    this.registroExitoso = true;
    this.form.reset({ fechaSolicitud: this.hoy() });

    setTimeout(() => (this.registroExitoso = false), 4000);
  }
}
