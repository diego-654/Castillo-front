import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { SwitchComponent } from '@shared/components/switch/switch.component';
import { TextAreaComponent } from '@shared/components/text-area/text-area.component';

@Component({
  selector: 'app-agregar-formulario',
  imports: [
    ButtonComponent,
    SvgIconComponent,
    TextAreaComponent,
    CommonModule,
    ReactiveFormsModule,
    SwitchComponent,
    CommonModule
  ],
  templateUrl: './agregar-formulario.html',
  styleUrl: './agregar-formulario.scss',
})
export class AgregarFormulario {
  dialogRef = inject(DialogRef<AgregarFormulario, Pregunta | null>);

  tipoPregunta = tipoPregunta;

  tipoInput = TipoInputType;

  tipo = signal<TipoInputType>(TipoInputType.TEXT);
  isRequired = signal<boolean>(false);

  form = new FormGroup<{
    pregunta: FormControl<string>;
  }>({
    pregunta: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });


  handleTipo(tipo: TipoInputType) {
    this.tipo.set(tipo);
  }

  handleIsRequired(isRequired: boolean) {
    this.isRequired.set(isRequired);
  }

  cancelar() {
    this.dialogRef.close();
  }

  aceptar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();

    this.dialogRef.close({
      pregunta: raw.pregunta,
      isRequired: this.isRequired(),
      tipo: this.tipo(),
    });
  }

}

export type PopupAgregarFormulario = DialogRef<
  AgregarFormulario,
  Pregunta | null
>;

export interface Pregunta {
  pregunta: string;
  isRequired: boolean;
  tipo: TipoInputType;
}

// TIPO PREGUNTA

export interface TipoPregunta {
  label: string;
  value: TipoInputType;
}

export const tipoPregunta: TipoPregunta[] = [
  {
    label: 'Texto',
    value: TipoInputType.TEXT,
  },
  {
    label: 'Número',
    value: TipoInputType.NUMBER,
  },
  {
    label: 'Fecha',
    value: TipoInputType.DATE,
  },
];
