import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function celularValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // No validar si el campo está vacío (usar required aparte si es obligatorio)
    }

    const regex = /^9\d{8}$/; // Expresión regular para un número que empieza en 9 y tiene 9 dígitos

    return regex.test(value) ? null : { celularInvalido: true };
  };
}
