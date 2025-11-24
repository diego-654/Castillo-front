import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estado, estadosData } from '@core/data/estados.data';
import { celularValidator } from '@core/validators/celular.validator';
import { CrearMiembroRequest } from '@features/socio/domain/models/crear-miembro.request.model';
import { ListarMembresias } from '@features/socio/domain/models/listar-membresias-response.model';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { OptionComponent, SelectComponent } from '@shared/components/select/select.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-socio',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
    OptionComponent,
    InputComponent,
    DatePickerComponent,
  ],
  templateUrl: './formulario-socio.html',
  styleUrl: './formulario-socio.scss',
})
export class FormularioSocio {

  dialogService = inject(DialogRef<FormularioSocio, boolean>);
  utilService = inject(UtilService);
  readonly socioRepository = inject(SocioRepository);

  estados = signal<Estado[]>(estadosData);
  membresias = signal<ListarMembresias[]>([]);


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

  ngOnInit() {
    this.obtenerMembresias();
  }

  async obtenerMembresias() {

    const res = await firstValueFrom(
      this.socioRepository.listarMembresias()
    );
    this.membresias.set(res.lista);

  }

  cancelar() {
    this.dialogService.close(false);

  }

  agregar() {

    if (!this.formulario.valid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.utilService.showLoader();

    const rawValue = this.formulario.getRawValue();

    const request: CrearMiembroRequest = {
      cliente: rawValue.cliente,
      celular: rawValue.celular,
      fechaNacimiento: rawValue.fechaNacimiento!,
      email: rawValue.email,
      membresia: rawValue.membresia!,
      fechaInicio: rawValue.fechaInicio!,
      estado: rawValue.estado!,
    };

    this.socioRepository.crearMiembro(request).subscribe({
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

}


export type PopupSocioFormulario = DialogRef<
  FormularioSocio,
  boolean
>;

