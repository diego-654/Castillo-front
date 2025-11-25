import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearBeneficiarioRequest } from '@features/socio/domain/models/crear-benficiario-request.model';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-formulario-invitado',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
  ],
  templateUrl: './formulario-invitado.html',
  styleUrl: './formulario-invitado.scss',
})
export class FormularioInvitado {
  dialogService = inject(DialogRef<FormularioInvitado, boolean>);
  utilService = inject(UtilService);
  readonly socioRepository = inject(SocioRepository);

  formulario = new FormGroup({
    dni: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    nombreApellido: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    parentesco: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
  });

  agregar() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.utilService.showLoader();
    const rawValue = this.formulario.getRawValue();
    const request: CrearBeneficiarioRequest = {
      dni: rawValue.dni,
      nombreApellido: rawValue.nombreApellido,
      parentesco: rawValue.parentesco,
    };
    this.socioRepository.crearBeneficiario(request).subscribe({
      next: () => {
        this.utilService.dismissLoader();
        console.log(request);
        this.dialogService.close(true);
      },
      error: (error) => {
        this.utilService.dismissLoader();
        this.dialogService.close(false);
      }
    });
  }

  cancelar() {
    this.dialogService.close(false);
  }
}
