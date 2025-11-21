import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { InputNumberComponent } from '@shared/components/input-number/input-number.component';
import { InputComponent } from '@shared/components/input/input.component';
import { SelectComponent, OptionComponent } from '@shared/components/select/select.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { formularioData } from '../../data/formulario-data';
import { TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { optionsData } from '@features/recoleccion-datos/presentation/pages/formulario-registro-cliente/formulario-registro-cliente';
import { DialogService } from '@shared/components/plugins/dialog';
import { AgregarFormulario, Pregunta } from '../../components/agregar-formulario/agregar-formulario';
import { FormularioEventoRequest } from '@features/evento/domain/models/formulario-evento-request.model';
import { EventoRepository } from '@features/evento/domain/repositories/evento.repository';

@Component({
  selector: 'app-formulario',
  imports: [
    SvgIconComponent,
    InputComponent,
    DatePickerComponent,
    InputNumberComponent,
    SelectComponent,
    OptionComponent,
    ButtonComponent,
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export default class Formulario {

  dialogService = inject(DialogService);
  eventoRepository = inject(EventoRepository);

  // Membresía
  options = signal<Option[]>(optionsData);
  option = signal<boolean | null>(null);

  formulario = signal<FormularioEventoRequest>(formularioData);
  typeInput = TipoInputType;

  openAgregarFormulario(indexGrupo: number) {
    const dialogRef = this.dialogService.open(AgregarFormulario, {
      width: '100%',
      maxWidth: '530px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.agregarPregunta(indexGrupo, result);
      }
    });
  }


  agregarPregunta(indexGrupo: number, nuevaPregunta: Pregunta) {
    this.formulario.update((prev) => {
      const clone = structuredClone(prev);

      clone.lista[indexGrupo].campos.lista.push({
        nombre: nuevaPregunta.pregunta,
        type: nuevaPregunta.tipo,
      });

      return clone;
    });

    console.log(this.formulario());

    this.actualizarFormulario();
  }

  actualizarFormulario() {
    this.eventoRepository.guardarFormulario(this.formulario()).subscribe();
  }

}



export interface Option {
  value: boolean | null;
  label: string;
}
