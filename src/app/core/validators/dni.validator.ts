import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // No validar si el campo está vacío (usar required aparte si es obligatorio)
    }

    const regex = /^\d+$/; // Solo números

    if (value.length != 8) {
      return { dniInvalido: true }; // Error si tiene menos de 8 caracteres
    }

    if (!regex.test(value)) {
      return { dniInvalido: true }; // Error si no es un número
    }

    return null; // Es válido
  };
}
