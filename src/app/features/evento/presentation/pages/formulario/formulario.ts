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
import { EventoRepository } from '@features/evento/domain/repositories/evento.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { FormularioEventoRequest } from '@features/evento/domain/models/formulario-evento-request.model';

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
    CheckboxComponent
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export default class Formulario {

  dialogService = inject(DialogService);
  eventoRepository = inject(EventoRepository);
  utilService = inject(UtilService);

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
        label: nuevaPregunta.pregunta,
        isRequired: nuevaPregunta.isRequired,
        type: nuevaPregunta.tipo,
      });

      return clone;
    });

    console.log(this.formulario());

    this.actualizarFormulario();
  }

  actualizarFormulario() {
    this.utilService.showLoader();

    this.eventoRepository.guardarFormulario(this.formulario()).subscribe({
      next: () => {
        this.utilService.dismissLoader();
        // this.dialogService.showSnackBar('Formulario guardado');
      },
      error: (error) => {
        this.utilService.dismissLoader();
        // this.dialogService.showSnackBar('Error al guardar formulario');
      }
    });
  }

  changeNombreEncuesta(nombre: string) {
    this.formulario.update((prev) => {
      prev.nombreEncuesta = nombre;
      return prev;
    });
  }
  changeFechaInicio(fecha: Date | null) {
    if (!fecha) return;

    this.formulario.update(prev => ({
      ...prev,
      fechaInicio: fecha
    }));
  }

  changeFechaFin(fecha: Date | null) {
    if (!fecha) return;

    this.formulario.update(prev => ({
      ...prev,
      fechaFin: fecha
    }));
  }

  guardarFormulario() {

    const FormularioEventoRequest: FormularioEventoRequest = {
      id: this.formulario()?.id ?? 0,
      nombreEncuesta: this.formulario()?.nombreEncuesta ?? '',
      fechaInicio: this.formulario()?.fechaInicio,
      fechaFin: this.formulario()?.fechaFin,
      lista: this.formulario()?.lista.map((seccion) => ({
        typeFormulario: seccion.typeFormulario,

        campos: {
          lista: seccion.campos.lista.map((campo) => ({
            label: campo.label,
            extras: campo.extras,
            isRequired: campo.isRequired,
            type: campo.type,
          }))
        }
      })) ?? []
    }

  }

 

}



export interface Option {
  value: boolean | null;
  label: string;
}
