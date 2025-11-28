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
import {
  AgregarFormulario,
  Pregunta,
} from '../../components/agregar-formulario/agregar-formulario';
import { EventoRepository } from '@features/evento/domain/repositories/evento.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { FormularioEventoRequest } from '@features/evento/domain/models/formulario-evento-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarFormularioRequest } from '@features/evento/domain/models/editar-formulario-request.model';

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
    CheckboxComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.scss',
})
export default class Formulario {
  dialogService = inject(DialogService);
  eventoRepository = inject(EventoRepository);
  utilService = inject(UtilService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  // Membresía
  options = signal<Option[]>(optionsData);
  option = signal<boolean | null>(null);

  formulario = signal<FormularioEventoRequest | null>(null);
  typeInput = TipoInputType;

  editMode = signal<boolean>(false);

  idFormulario = signal<number>(0);

  ngOnInit() {
    let parent = this.route;
    while (parent && parent.snapshot.paramMap.get('id') == null) {
      parent = parent.parent!;
    }

    const id = Number(parent?.snapshot.paramMap.get('id') ?? 0);
    this.idFormulario.set(id);
    console.log(this.idFormulario());

    this.obtenerFormulario();
  }

  async obtenerFormulario() {
    this.utilService.showLoader();
    if (this.idFormulario()) {
      const id = Number(this.route.snapshot.paramMap.get('id'));

      const res = await firstValueFrom(this.eventoRepository.obtenerFormulario(id));

      this.formulario.set(res);
      this.editMode.set(true);
      this.utilService.dismissLoader();
    } else {
      this.formulario.set(formularioData);
      this.editMode.set(false);
      this.utilService.dismissLoader();
    }
  }

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

      clone?.lista[indexGrupo].campos.lista.push({
        label: nuevaPregunta.pregunta,
        isRequired: nuevaPregunta.isRequired,
        isVisible: nuevaPregunta.isVisible,
        isCampoNuevo: true,
        type: nuevaPregunta.tipo,
      });

      return clone;
    });

    console.log(this.formulario());

    this.actualizarFormulario();
  }



  actualizarFormulario() {
    this.utilService.showLoader();

    if (!this.formulario()) return;

    this.eventoRepository.guardarFormulario(this.formulario()!).subscribe({
      next: () => {
        this.utilService.dismissLoader();
        // this.dialogService.showSnackBar('Formulario guardado');
      },
      error: (error) => {
        this.utilService.dismissLoader();
        // this.dialogService.showSnackBar('Error al guardar formulario');
      },
    });
  }

  changeNombreEncuesta(nombre: string) {
    if (!this.formulario()) return;
    this.formulario.update((prev) => {
      prev!.nombreEncuesta = nombre;
      return prev;
    });
  }
  changeFechaInicio(fecha: Date | null) {
    if (!fecha) return;
    if (!this.formulario()) return;
    this.formulario.update((prev) => ({
      ...prev!,
      fechaInicio: fecha,
    }));
  }

  changeFechaFin(fecha: Date | null) {
    if (!fecha) return;
    if (!this.formulario()) return;
    this.formulario.update((prev) => ({
      ...prev!,
      fechaFin: fecha,
    }));
  }

  guardarFormulario() {
    const form = this.formulario();
    if (!form) return;

    if (!form.fechaInicio || !form.fechaFin || !form.nombreEncuesta) {
      console.log('Debes completar los campos de fecha');
      this.utilService.openSnackBar('Debes completar los campos', 'error');
      return;
    }

    this.utilService.showLoader();

    // Payload base común para crear/editar
    const payloadBase: FormularioEventoRequest = {
      nombreEncuesta: form.nombreEncuesta,
      fechaInicio: form.fechaInicio,
      fechaFin: form.fechaFin,
      lista:
        form.lista.map((seccion) => ({
          typeFormulario: seccion.typeFormulario,
          campos: {
            lista: seccion.campos.lista.map((campo) => ({
              label: campo.label,
              extras: campo.extras,
              isRequired: campo.isRequired,
              isVisible: campo.isVisible,
              isCampoNuevo: campo.isCampoNuevo,
              type: campo.type,
            })),
          },
        })) ?? [],
    };

    // 🔁 Si estamos en modo edición → EDITAR
    if (this.editMode()) {
      const requestEditar: EditarFormularioRequest = {
        id: this.idFormulario(),
        ...payloadBase,
      };

      this.eventoRepository.editarFormulario(requestEditar).subscribe({
        next: () => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Formulario actualizado', 'success');
          // Si quieres, recargar datos o navegar:
          // this.obtenerFormulario();
          this.eventoRepository.obtenerFormulario(this.idFormulario()).subscribe({
            next: (response) => {
              this.formulario.set(response);
            },
            error: (error) => {
              this.utilService.dismissLoader();
              this.utilService.openSnackBar('Error al obtener formulario', 'error');
              console.error(error);
            },
          });
          // this.router.navigate(['/eventos/lista']);
        },
        error: (error) => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Error al actualizar formulario', 'error');
          console.error(error);
        },
      });

      return;
    }

    // 🆕 Si NO es modo edición → CREAR
    this.eventoRepository.guardarFormulario(payloadBase).subscribe({
      next: () => {
        this.resetFormulario();
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Formulario guardado', 'success');
      },
      error: (error) => {
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Error al guardar formulario', 'error');
        console.error(error);
      },
    });
  }


  toggleCampoVisible(indexGrupo: number, indexCampo: number) {
    this.formulario.update((prev) => {
      if (!prev) return prev;

      const clone = structuredClone(prev);

      const campo = clone.lista[indexGrupo].campos.lista[indexCampo];
      // si viene undefined, lo tratamos como true por defecto
      campo.isVisible = campo.isVisible === false ? true : false;

      return clone;
    });


  }

  eliminarCampo(indexGrupo: number, indexCampo: number) {
    this.formulario.update((prev) => {
      if (!prev) return prev;

      const clone = structuredClone(prev);

      clone.lista[indexGrupo].campos.lista.splice(indexCampo, 1);

      return clone;
    });

  }

  resetFormulario() {
    this.formulario.update((prev) => ({
      ...prev!,
      nombreEncuesta: '',
      fechaInicio: null,
      fechaFin: null,
      lista: formularioData.lista,
    }));
  }



  cancelar() {
    this.router.navigate(['/eventos/formulario']);
  }
}

export interface Option {
  value: boolean | null;
  label: string;
}
