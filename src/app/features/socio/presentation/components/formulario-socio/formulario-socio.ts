import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { celularValidator } from '@core/validators/celular.validator';
import { ButtonComponent } from '@shared/components/button/button.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-formulario-socio',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ɵInternalFormsSharedModule
],
  templateUrl: './formulario-socio.html',
  styleUrl: './formulario-socio.scss',
})
export class FormularioSocio {

  formulario = new FormGroup({
    cliente: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    celular: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        celularValidator(),
      ],
    }),
    fechaNacimiento: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),
    membresia: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    fechaInicio: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),

    estado: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),

  });

  cancelar() {
  }

}
