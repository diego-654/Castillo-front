import { Component, inject, signal, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormularioClienteResponse, TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { RecoleccionDatosRepository } from '@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { InputNumberComponent } from '@shared/components/input-number/input-number.component';
import { InputComponent } from '@shared/components/input/input.component';
import { OptionComponent, SelectComponent } from '@shared/components/select/select.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-registro-cliente',
  imports: [
    SvgIconComponent,
    InputComponent,
    DatePickerComponent,
    InputNumberComponent,
    SelectComponent,
    OptionComponent,
    FormsModule,
    ReactiveFormsModule,
    CheckboxComponent,
    ButtonComponent,
  ],
  templateUrl: './formulario-registro-cliente.html',
  styleUrl: './formulario-registro-cliente.scss',
})
export default class FormularioRegistroCliente {

  readonly recoleccionDatosRepository = inject(RecoleccionDatosRepository);
  readonly utilService = inject(UtilService);

  formulario = signal<FormularioClienteResponse | null>(null);
  typeInput = TipoInputType;

  // Membresía
  options = signal<Option[]>(optionsData);
  option = signal<boolean | null>(null);


  ngOnInit() {
    this.obtenerFormularioCliente();
  }

  async obtenerFormularioCliente() {
    try {
      this.utilService.showLoader();

      const res = await firstValueFrom(
        this.recoleccionDatosRepository.getFormularioCliente()
      );

      this.formulario.set(res);


      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.dismissLoader();
      console.error(error);
    }
  }

  aplicarOption(option: Option) {
    this.option.set(option.value);
  }

  respuestas = signal<{ [key: string]: any }>({});


  guardarRespuesta(label: string, valor: any) {
    const key = this.formatoNombre(label);

    this.respuestas.update((prev) => ({
      ...prev,
      [key]: valor,
    }));
  }


  guardarFormulario() {
    const request = {
      id: this.formulario()?.id,
      lista: this.formulario()?.lista.map((seccion) => ({
        ...seccion,
        campos: {
          lista: seccion.campos.lista.map((campo) => ({
            ...campo,
            respuesta: this.respuestas()[this.formatoNombre(campo.label)] ?? null
          }))
        }
      }))
    };

    console.log("JSON FINAL", request);
  }

  formatoNombre(label: string): string {
    return label.toLowerCase().trim();
  }

}

export const optionsData = [
  { value: true, label: 'Si' },
  { value: false, label: 'No' },
];

export interface Option {
  value: boolean | null;
  label: string;
}

