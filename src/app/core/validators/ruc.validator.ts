import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rucValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // No validar si está vacío (usar required aparte si es obligatorio)
    }

    // convertir siempre a string
    value = String(value).trim();

    const regex = /^\d+$/; // Solo números

    if (value.length !== 11) {
      return { rucInvalido: true }; // Error si no tiene 11 caracteres
    }

    if (!regex.test(value)) {
      return { rucInvalido: true }; // Error si no es un número válido
    }

    return null; // Es válido
  };
}
