import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { InputNumberComponent } from '@shared/components/input-number/input-number.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent, OptionComponent } from '@shared/components/select/select.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { formularioData } from '../../data/formulario-data';
import { TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { optionsData } from '@features/recoleccion-datos/presentation/pages/formulario-registro-cliente/formulario-registro-cliente';

@Component({
  selector: 'app-formulario',
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
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export default class Formulario {

  // Membresía
  options = signal<Option[]>(optionsData);
  option = signal<boolean | null>(null);

  formulario = formularioData;
  typeInput = TipoInputType;

}



export interface Option {
  value: boolean | null;
  label: string;
}
