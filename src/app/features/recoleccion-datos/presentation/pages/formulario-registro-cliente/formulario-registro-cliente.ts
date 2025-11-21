import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioClienteResponse, TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { RecoleccionDatosRepository } from '@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository';
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
    CheckboxComponent
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

  form: FormGroup = new FormGroup({});

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

      this.crearFormularioDinamico();

      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.dismissLoader();
      console.error(error);
    }
  }

  aplicarOption(option: Option) {
    this.option.set(option.value);
  }

  crearFormularioDinamico(): void {
    const controls: Record<string, FormControl<any>> = {};

    const lista = this.formulario()?.lista;
    if (!lista) return;

    lista.forEach((item) => {
      item.campos.lista.forEach((input) => {

        const key = input.nombre.toLowerCase().trim();

        switch (input.type) {

          case this.typeInput.TEXT:
            controls[key] = new FormControl<string | null>(null);
            break;

          case this.typeInput.NUMBER:
            controls[key] = new FormControl<number | null>(null);
            break;

          case this.typeInput.DATE:
            controls[key] = new FormControl<Date | null>(null);
            break;

          default:
            controls[key] = new FormControl<string | null>(null);
        }
      });
    });

    controls['membresia'] = new FormControl<boolean | null>(null);
    controls['terminos'] = new FormControl<boolean | null>(null);

    this.form = new FormGroup(controls);
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
