import { DialogRef } from '@shared/components/plugins/dialog/ref/dialog-ref';
import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Mes, mesesData } from '@core/data/seleccione-mes.data';
import { CrearFacturaRequest } from '@features/finanzas/domain/models/crear-factura-request.model';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent, OptionComponent } from '@shared/components/select/select.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';
import { DIALOG_DATA } from '@shared/components/plugins/dialog';

@Component({
  selector: 'app-formulario-factura',
  imports: [
    SvgIconComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    SelectComponent,
    OptionComponent,
    InputComponent,
  ],
  templateUrl: './formulario-factura.html',
  styleUrl: './formulario-factura.scss',
})
export class FormularioFactura {
  dialogService = inject(DialogRef<FormularioFactura, boolean>);
  utilService = inject(UtilService);
  readonly finanzaRepository = inject(FinanzasRepository);

  readonly data = inject<DataFormularioFactura>(DIALOG_DATA)
  readonly facturaId?: number =this.data.facturaId;
  seleccioneMeses = signal<Mes[]>(mesesData);

  formulario = new FormGroup({
    cliente: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    correo: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    mes: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    this.initForm();
    console.log('facturaId recibido:', this.facturaId);
  }

  async initForm(){
    this.utilService.showLoader();
    this.formulario.reset({});
    try {
      await
        this.obtenerFactura();
    }catch(error){
      this.utilService.dismissLoader();
    }
    this.utilService.dismissLoader();
  }

  async obtenerFactura() {
    if(!this.facturaId) return;

    const response = await firstValueFrom(
      this.finanzaRepository.obtenerFactura(this.facturaId)
    );
    this.formulario.setValue({
      cliente: response.cliente,
      correo: response.correo,
      mes: response.mes,
    });
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

    const request: CrearFacturaRequest = {
      cliente: rawValue.cliente,
      correo: rawValue.correo,
      mes: rawValue.mes!,
    };

    this.finanzaRepository.crearFactura(request).subscribe({
      next: () => {
        this.utilService.dismissLoader();
        console.log(request);

        this.dialogService.close(true);
      },
      error: (error) => {
        this.utilService.dismissLoader();
        this.dialogService.close(false);
      },
    });
  }
}

export type PopupFacturaFormulario = DialogRef<FormularioFactura, boolean>;
export interface DataFormularioFactura {
  readonly facturaId?: number;
}
