import { Component, inject, signal, input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormularioClienteRequest } from '@features/recoleccion-datos/domain/models/formulario-cliente-request.model';
import { FormularioClienteResponse, TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { ObtenerFormularioRespuestasResponse } from '@features/recoleccion-datos/domain/models/obtener-formulario-respuestas-response.molde';
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
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);

  formulario = signal<FormularioClienteResponse | null>(null);
  typeInput = TipoInputType;

  // Membresía
  options = signal<Option[]>(optionsData);
  option = signal<boolean | null>(null);

  //form
  form: FormGroup = new FormGroup({});

  editMode = signal<boolean>(false);

  //
  formularioId = signal<number>(0);


  ngOnInit() {
    this.evaluarModo();
  }

  evaluarModo() {
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    const path = this.route.snapshot.routeConfig?.path ?? '';

    const esEditar = path === 'formulario/editar/:id';

    console.log('path actual:', path, 'esEditar:', esEditar, 'id:', id);

    // 👇 guardamos el id SIEMPRE que exista
    if (id) {
      this.formularioId.set(id);
    }

    if (esEditar && id) {
      this.editMode.set(true);
      this.obtenerFormularioRespuestas(id);
    } else if (id) {
      this.editMode.set(false);
      this.obtenerFormularioCliente();
    } else {
      this.editMode.set(false);
      this.obtenerFormularioCliente();
    }
  }

  async obtenerFormularioRespuestas(id: number) {
    this.utilService.showLoader();

    const res = await firstValueFrom(
      this.recoleccionDatosRepository.obtenerFormularioRespuestas(id)
    );

    this.formulario.set(res);
    this.crearFormulario(res);
    this.valoresFormulario(res);
    this.editMode.set(true);

    this.utilService.dismissLoader();
  }

  async obtenerFormularioCliente() {
    try {
      this.utilService.showLoader();

      const res = await firstValueFrom(
        this.recoleccionDatosRepository.getFormularioCliente(this.formularioId())
      );
      this.utilService.openSnackBar('Formulario cargado', 'success');
      this.formulario.set(res);
      this.crearFormulario(res);
      this.editMode.set(false);

      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.openSnackBar('Error al cargar formulario', 'error');
      this.utilService.dismissLoader();
      console.error(error);
    }
  }

  toggleVisibility(input: any) {
  input.visible = !input.visible;
}

  aplicarOption(option: Option) {
    this.option.set(option.value);
  }

  crearFormulario(formulario: FormularioClienteResponse) {
    this.form = new FormGroup({});

    formulario.lista.forEach((seccion) => {
      seccion.campos.lista.forEach((campo) => {
        const nombreControl = this.formatoNombre(campo.label);

        let control: FormControl;

        switch (campo.type) {
          case TipoInputType.DATE:
            control = new FormControl<Date | null>(null, {
              validators: campo.isRequired ? [Validators.required] : [],
            });
            break;

          case TipoInputType.NUMBER:
            control = new FormControl<number | null>(null, {
              validators: campo.isRequired ? [Validators.required] : [],
            });
            break;

          case TipoInputType.BOOLEAN:
            control = new FormControl<boolean>(false, {
              validators: campo.isRequired ? [Validators.required] : [],
            });
            break;

          default: // TEXT
            control = new FormControl<string | null>(null, {
              validators: campo.isRequired ? [Validators.required] : [],
            });
        }

        this.form.addControl(nombreControl, control);
      });
    });
  }

  valoresFormulario(formulario: ObtenerFormularioRespuestasResponse) {
    formulario.lista.forEach((seccion) => {
      seccion.campos.lista.forEach((campo) => {
        const nombreControl = this.formatoNombre(campo.label);
        this.form.get(nombreControl)?.setValue(campo.respuesta);
      });
    });
  }


  guardarFormulario() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.utilService.showLoader();

    const baseRequest: FormularioClienteRequest = {
      id: this.formularioId(), // siempre el id de ruta (evento o respuesta)
      lista: this.formulario()?.lista.map((seccion) => ({
        typeFormulario: seccion.typeFormulario,
        campos: {
          lista: seccion.campos.lista.map((campo) => ({
            label: campo.label,
            extras: campo.extras,
            isRequired: campo.isRequired,
            type: campo.type,
            respuesta: this.form.value[this.formatoNombre(campo.label)] ?? null,
          })),
        },
      })) ?? [],
    };

    // 🟡 MODO EDICIÓN → actualizar respuestas existentes
    if (this.editMode()) {
      this.recoleccionDatosRepository.editarFormularioCliente(baseRequest).subscribe({
        next: () => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Formulario actualizado', 'success');
          // si quieres: this.router.navigate(['/recoleccion-datos']);
        },
        error: (error) => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Error al actualizar formulario', 'error');
          console.error(error);
        },
      });

      console.log('JSON EDITAR', baseRequest);
      return;
    }

    // 🟢 MODO NUEVO → guardar respuestas por primera vez
    this.recoleccionDatosRepository.guardarFormulario(baseRequest).subscribe({
      next: () => {
        this.limpiarFormulario();
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Formulario guardado', 'success');
        // si quieres: this.router.navigate(['/recoleccion-datos']);
      },
      error: (error) => {
        this.utilService.dismissLoader();
        this.utilService.openSnackBar('Error al guardar formulario', 'error');
        console.error(error);
      },
    });

    console.log('JSON CREAR', baseRequest);
  }

  limpiarFormulario() {
    // Limpia los valores de los controles, pero mantiene la estructura
    if (this.form) {
      this.form.reset();
    }

    // Si quieres, resetea también la opción de membresía
    this.option.set(null);

    // Si NO estás en modo edición, normalmente tiene sentido
    // volver a cargar el formulario vacío desde el backend
    if (!this.editMode()) {
      // recarga la estructura del formulario del evento
      this.obtenerFormularioCliente();
    } else {
      // En modo edición, puedes dejar el form vacío
      // o volver a cargar las respuestas actuales del backend:
      // this.obtenerFormularioRespuestas(this.formularioId());
    }
  }


  cancelar() {
    this.router.navigate(['/recoleccion-datos']);
  }


  formatoNombre(nombre: string | undefined): string {
    if (!nombre) return '';
    return nombre
      .toLowerCase()
      .trim()
      .replaceAll(' ', '_'); // mucho mejor para evitar colisiones
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

