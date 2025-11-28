import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { celularValidator } from '@core/validators/celular.validator';
import { rucValidator } from '@core/validators/ruc.validator';
import { CrearAliadoRequest } from '@features/mantenimiento/domain/models/crear-aliado-request.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { SunatRepository } from '@features/sunat/domain/repositories/sunat.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { InputNumberComponent } from '@shared/components/input-number/input-number.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-aliado',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    InputComponent,
    DatePickerComponent,
    InputNumberComponent,
  ],
  templateUrl: './formulario-aliado.html',
  styleUrl: './formulario-aliado.scss',
})
export class FormularioAliado {

  dialogRef = inject(DialogRef<FormularioAliado, boolean>);
  readonly sunatRepository = inject(SunatRepository);
  readonly utilService = inject(UtilService);
  readonly mantenimientoRepository = inject(MantenimientoRepository);

  formulario = new FormGroup({
    ruc: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        rucValidator(),
      ],
    }),
    nombreEmpresa: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    fechaIncorporacion: new FormControl<Date | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),
    representante: new FormControl<string>('', {
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

    correo: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,
      ],
    }),

    direccion: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
      ],
    }),


  });

  cancelar() {
    this.dialogRef.close(false);
  }

  agregar() {
    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.utilService.showLoader();

    const rawValue = this.formulario.getRawValue();
    const request: CrearAliadoRequest = {
      ruc: rawValue.ruc,
      nombreEmpresa: rawValue.nombreEmpresa,
      fechaIncorporacion: rawValue.fechaIncorporacion!,
      representante: rawValue.representante,
      celular: rawValue.celular,
      correo: rawValue.correo,
      direccion: rawValue.direccion,
    };

    this.mantenimientoRepository.crearAliado(request).subscribe({
      next: () => {
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Aliado creado', 'success');
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Error al crear aliado', 'error');
      }
    });

  }

  async BuscarRuc() {
    const ruc = this.formulario.getRawValue().ruc;
    if (!ruc) return;

    try {
      this.utilService.showLoader();

      const res = await firstValueFrom(
        this.sunatRepository.consultaRuc({
          ruc: ruc,
        })
      );
      this.formulario.patchValue({
        nombreEmpresa: res.nombre,
      });


      this.utilService.dismissLoader();

    } catch (error) {
      this.utilService.dismissLoader();
      this.utilService.openSnackBar('Error al buscar ruc', 'error');
    }
  }

}

export type PopupFormularioAliado = DialogRef<
  FormularioAliado,
  boolean
>;
