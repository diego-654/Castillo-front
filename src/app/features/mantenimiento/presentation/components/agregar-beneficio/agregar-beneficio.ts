import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-agregar-beneficio',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './agregar-beneficio.html',
  styleUrl: './agregar-beneficio.scss',
})
export class AgregarBeneficio {

  dialogRef = inject(DialogRef<AgregarBeneficio, string | null>);

  form = new FormGroup({
    nombreBeneficio: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
  });


  cancelar() {
    this.dialogRef.close(null);
  }

  agregar() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    const nombre = this.form.getRawValue().nombreBeneficio;

    this.dialogRef.close(nombre);
  }


}


export type PopupAgregarBeneficio = DialogRef<
  AgregarBeneficio,
  string | null
>;
