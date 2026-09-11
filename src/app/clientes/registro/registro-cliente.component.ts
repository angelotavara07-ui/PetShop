import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css',
})
export class RegistroClienteComponent {
  form: FormGroup;
  registroExitoso = false;
  clientesRegistrados: Cliente[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
    });
  }

  /** Devuelve true si el control fue tocado/modificado y es inválido */
  fieldInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty));
  }

  hasError(field: string, error: string): boolean {
    return !!this.form.get(field)?.hasError(error);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuevo: Cliente = { ...this.form.value, id: Date.now() };
    this.clientesRegistrados.unshift(nuevo);
    this.registroExitoso = true;
    this.form.reset();

    setTimeout(() => (this.registroExitoso = false), 4000);
  }
}
