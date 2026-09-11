import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Mascota {
  nombre: string;
  especie: string;
  raza: string;
  edad: number | null;
  sexo: string;
}

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-form.component.html',
  styleUrl: './pet-form.component.css'
})
export class PetFormComponent {
  especies = ['Perro', 'Gato', 'Ave', 'Otro'];

  mascota: Mascota = {
    nombre: '',
    especie: '',
    raza: '',
    edad: null,
    sexo: ''
  };

  mensaje = '';

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    console.log('Mascota registrada:', this.mascota);
    this.mensaje = `Mascota "${this.mascota.nombre}" registrada correctamente.`;

    form.resetForm();
  }

  onLimpiar(form: NgForm): void {
    form.resetForm();
    this.mensaje = '';
  }
}