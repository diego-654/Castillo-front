import { FormControl } from '@angular/forms';

export function validatorsErrors(control: FormControl): {
  [key: string]: string;
} {
  const errors: { [key: string]: string } = {
    required: 'Este campo es requerido.',
    email: 'Correo inválido.',
    minlength: 'Longitud inválida.',
    maxlength: 'Longitud inválida.',
    celularInvalido: 'Celular inválido.',
    dniInvalido: 'DNI inválido.',
    rucInvalido: 'RUC inválido.',
    soloEntero: 'Solo números enteros.',
    placaInvalido: 'Placa inválida, solo letras y números, 6 caracteres.',
    licenciaConducirInvalido: 'Licencia inválida.',
  };

  if (control?.errors?.['min']) {
    const minValue = control.errors['min'].min;
    errors['min'] = `Debe ser mayor o igual a ${minValue}.`;
  }
  if (control?.errors?.['maxValue']) {
    const maxValue = control.errors['maxValue'].requiredMax;
    errors['maxValue'] = `Debe ser menor o igual a ${maxValue}.`;
  }

  if (control?.errors?.['greaterThan']) {
    const minValue = control.errors['greaterThan'].min;
    errors['greaterThan'] = `Debe ser mayor a ${minValue}.`;
  }

  if (control?.errors?.['lessThan']) {
    const lessThan = control.errors['lessThan'].requiredMax;
    errors['lessThan'] = `Debe ser menor a ${lessThan}.`;
  }

  if (control?.errors?.['montoInvalido']) {
    const { maxEnteros, maxDecimales } = control.errors['montoInvalido'];
    errors[
      'montoInvalido'
    ] = `Cantidad inválida, solo hasta ${maxEnteros} enteros y hasta ${maxDecimales} decimales.`;
  }
  if (control?.errors?.['fechaInvalida']) {
    errors['fechaInvalida'] = 'Fecha inválida.';
  }

  if (control?.errors?.['fechaMaxima']) {
    const fechaMaxima = control.errors['fechaMaxima'].fechaLimite;
    errors['fechaMaxima'] = `La fecha no puede ser mayor a ${fechaMaxima}.`;
  }

  if (control?.errors?.['fechaMinima']) {
    const fechaMinima = control.errors['fechaMinima'].fechaLimite;
    errors[
      'fechaMinima'
    ] = `La fecha no puede ser menor o igual a ${fechaMinima}.`;
  }

  if (control?.errors?.['plazoPago']) {
    const maxPlazo = control.errors['plazoPago'].maxPlazo;
    errors['plazoPago'] = `El plazo no puede ser mayor a ${maxPlazo}.`;
  }

  if (control?.errors?.['fechaAntesDeMin']) {
    const min = control.errors['fechaAntesDeMin'].fechaLimite;
    errors['fechaAntesDeMin'] = min
      ? `La fecha no puede ser anterior a ${min}.`
      : 'La fecha no puede ser anterior a la fecha mínima permitida.';
  }

  if (control?.errors?.['fechaDespuesDeMax']) {
    const max = control.errors['fechaDespuesDeMax'].fechaLimite;
    errors['fechaDespuesDeMax'] = max
      ? `La fecha no puede ser posterior a ${max}.`
      : 'La fecha no puede ser posterior a la fecha máxima permitida.';
  }

  return errors;
}
