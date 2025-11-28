import { Component, inject, signal } from '@angular/core';
import { ActualizarBeneficiosMembresiaRequest } from '@features/mantenimiento/domain/models/actualizar-beneficio-membresia-request.model';
import { CrearNuevaMembresiaRequest } from '@features/mantenimiento/domain/models/crear-membresia-request.model';
import { Beneficios, ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DialogService } from '@shared/components/plugins/dialog';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';
import { AgregarBeneficio } from '../../components/agregar-beneficio/agregar-beneficio';
import { InputComponent } from '@shared/components/input/input.component';
import { EditarMembresiaRequest } from '@features/mantenimiento/domain/models/editar-membresia-request.model';

@Component({
  selector: 'app-membresias-mantenimiento',
  imports: [ButtonComponent, SvgIconComponent, InputComponent],
  templateUrl: './membresias-mantenimiento.html',
  styleUrl: './membresias-mantenimiento.scss',
})
export default class MembresiasMantenimiento {
  benficiosLista = signal<ListarBeneficiosResponse | null>(null);
  readonly mantenimientoRepository = inject(MantenimientoRepository);
  readonly utilService = inject(UtilService);
  readonly dialogService = inject(DialogService);

  // 👇 nueva: id de la membresía que se está editando
  editingTarget = signal<EditingTarget>(null);

  //funcion crear nueva membresia
  nuevasMembresiasIds = signal<number[]>([]);


  ngOnInit() {
    this.cargarBeneficios();
  }

  async cargarBeneficios() {
    try {
      this.utilService.showLoader();
      const res = await firstValueFrom(
        this.mantenimientoRepository.listarBeneficios()
      );
      this.benficiosLista.set(res);
      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.openSnackBar('Error al cargar beneficios', 'error');
      this.utilService.dismissLoader();

    }
  }

  beneficiosPorGrupo(idGrupo: number) {
    const data = this.benficiosLista();
    if (!data) return [];
    return data.beneficios.filter(b => b.idBeneficioGeneral === idGrupo);
  }

  beneficiosPorMembresiaYGrupo(idMembresia: number, idGrupo: number) {
    const data = this.benficiosLista();
    if (!data) return [];
    return data.beneficios.filter(
      b =>
        b.idBeneficioGeneral === idGrupo &&
        b.membresia?.some(m => m.id === idMembresia),
    );
  }

  configBeneficioPorMembresia(beneficio: Beneficios, idMembresia: number) {
    return beneficio.membresia?.find(m => m.id === idMembresia) ?? null;
  }

  frecuenciaBeneficio(beneficio: Beneficios, idMembresia: number): string | null {
    const cfg = this.configBeneficioPorMembresia(beneficio, idMembresia);
    return cfg?.nombreMembresia ?? null;
  }

  // 👉 llamar desde el icono de editar
  EditarMembresia(idGrupo: number, idMembresia: number) {
    this.editingTarget.set({ grupoId: idGrupo, membresiaId: idMembresia });
  }

  // helper para saber si una card está en modo edición
  isEditingMembresia(idGrupo: number, idMembresia: number): boolean {
    const t = this.editingTarget();
    return !!t && t.grupoId === idGrupo && t.membresiaId === idMembresia;
  }


  // cuando cambia un checkbox
  onCheckboxChange(
    idGrupo: number,
    idMembresia: number,
    idBeneficio: number,
    checked: boolean
  ) {
    const data = this.benficiosLista();
    if (!data) return;

    const clone: ListarBeneficiosResponse = {
      ...data,
      beneficios: data.beneficios.map(b => {
        if (b.id !== idBeneficio || b.idBeneficioGeneral !== idGrupo) return b;
        return {
          ...b,
          membresia: b.membresia.map(m =>
            m.id === idMembresia ? { ...m, valor: checked } : m
          ),
        };
      }),
    };

    this.benficiosLista.set(clone);
  }


  guardarMembresia(idGrupo: number, idMembresia: number) {
    const data = this.benficiosLista();
    if (!data) return;

    this.utilService.showLoader();

    const beneficiosGrupo = data.beneficios.filter(
      b => b.idBeneficioGeneral === idGrupo
    );

    const payloadBeneficios = beneficiosGrupo
      .map(b => {
        const cfg = b.membresia.find(m => m.id === idMembresia);
        if (!cfg) return null;

        return {
          idBeneficio: b.id,
          frecuencia: cfg.nombreMembresia, // 👈 frecuencia escrita en el input
        };
      })
      .filter(Boolean) as { idBeneficio: number; valor: boolean; frecuencia: string }[];

    const esNueva = this.nuevasMembresiasIds().includes(idMembresia);

    if (esNueva) {
      // ====== CREAR NUEVA MEMBRESÍA ======
      const grupoInfo = data.datosBeneficioMembresia.find(g => g.id === idGrupo);
      const membInfo = grupoInfo?.datosMembresia.find(m => m.id === idMembresia);

      const request: CrearNuevaMembresiaRequest = {
        idBeneficioGeneral: idGrupo,
        nombreMembresia: membInfo?.nombreMembresia ?? 'Esta es una nueva membresia',
        tipoMembresia: membInfo?.tipoMembresia ?? 'Membresía',
        beneficios: payloadBeneficios,
      };

      console.log('REQUEST CREAR', request);

      this.mantenimientoRepository.crearNuevaMembresia(request).subscribe({
        next: () => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Membresía creada', 'success');

          this.nuevasMembresiasIds.update(list =>
            list.filter(id => id !== idMembresia)
          );
          this.editingTarget.set(null);
        },
        error: () => {
          this.utilService.openSnackBar('Error al crear membresía', 'error');
          this.utilService.dismissLoader();
        },
      });

    } else {
      // ====== EDITAR MEMBRESÍA EXISTENTE ======
      const grupoInfo = data.datosBeneficioMembresia.find(g => g.id === idGrupo);
      const membInfo = grupoInfo?.datosMembresia.find(m => m.id === idMembresia);

      const request: EditarMembresiaRequest = {
        id: idMembresia,
        idBeneficioGeneral: idGrupo,
        nombreMembresia: membInfo?.nombreMembresia!,
        tipoMembresia: membInfo?.tipoMembresia!,
        beneficios: payloadBeneficios,
      };

      console.log('REQUEST EDITAR', request);

      this.mantenimientoRepository.editarMembresia(request).subscribe({
        next: () => {
          this.utilService.dismissLoader();
          this.utilService.openSnackBar('Membresía actualizada', 'success');
          this.editingTarget.set(null);
          //obtener datos de la membresia
          this.cargarBeneficios();
        },
        error: () => {
          this.utilService.openSnackBar('Error al actualizar membresía', 'error');
          this.utilService.dismissLoader();
        },
      });
    }
  }

  cancelarGuardarMembresia() {
    const target = this.editingTarget();
    if (!target) return;

    const { grupoId, membresiaId } = target;
    const esNueva = this.nuevasMembresiasIds().includes(membresiaId);

    if (esNueva) {
      // 👉 Si la membresía fue creada solo en frontend, la quitamos del estado
      const data = this.benficiosLista();
      if (data) {
        const updated: ListarBeneficiosResponse = {
          ...data,
          // 1) quitar la membresía del grupo
          datosBeneficioMembresia: data.datosBeneficioMembresia.map(g => {
            if (g.id !== grupoId) return g;
            return {
              ...g,
              datosMembresia: g.datosMembresia.filter(m => m.id !== membresiaId),
            };
          }),
          // 2) quitar la regla de membresía de cada beneficio del grupo
          beneficios: data.beneficios.map(b => {
            if (b.idBeneficioGeneral !== grupoId) return b;
            return {
              ...b,
              membresia: b.membresia.filter(m => m.id !== membresiaId),
            };
          }),
        };

        this.benficiosLista.set(updated);
      }

      // limpiar el id de la lista de nuevas
      this.nuevasMembresiasIds.update(list =>
        list.filter(id => id !== membresiaId)
      );

      this.editingTarget.set(null);
    } else {
      this.editingTarget.set(null);
      this.cargarBeneficios(); // esto vuelve a poner los valores originales
    }
  }




  crearNuevaMembresia(grupoId: number) {
    const dialogRef = this.dialogService.open(AgregarBeneficio, {
      width: '530px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // result será el nombre de la membresía (o null/undefined si cancelan)
      if (!result) return;

      const data = this.benficiosLista();
      if (!data) return;

      // 👇 si tu diálogo devuelve un objeto, adapta aquí:
      // const nombreMembresia = result.nombreMembresia;
      const nombreMembresia = String(result).trim();

      // frecuencia por defecto (puedes pedirla también en el dialog si quieres)
      const nuevaFrecuencia = '';
      const tipoMembresia = 'Membresía';

      // nuevo id de membresía = max(id existentes) + 1
      const allMembresiaIds = data.datosBeneficioMembresia
        .flatMap(g => g.datosMembresia.map(m => m.id));

      const maxId = allMembresiaIds.length ? Math.max(...allMembresiaIds) : 0;
      const newId = maxId + 1;

      const updated: ListarBeneficiosResponse = {
        ...data,
        datosBeneficioMembresia: data.datosBeneficioMembresia.map(g => {
          if (g.id !== grupoId) return g;
          return {
            ...g,
            datosMembresia: [
              {
                id: newId,
                nombreMembresia,
                tipoMembresia,
              },
              ...g.datosMembresia,
            ],
          };
        }),

        beneficios: data.beneficios.map(b => {
          if (b.idBeneficioGeneral !== grupoId) return b;
          return {
            ...b,
            membresia: [
              {
                id: newId,
                nombreMembresia: nuevaFrecuencia, // aquí usas el campo como frecuencia
                valor: false,
              },
              ...b.membresia,
            ],
          };
        }),
      };

      this.benficiosLista.set(updated);

      // marcar como membresía nueva
      this.nuevasMembresiasIds.update(list => [...list, newId]);

      // activar modo edición automáticamente
      this.editingTarget.set({ grupoId, membresiaId: newId });
    });
  }

  eliminarMembresia(idGrupo: number, idMembresia: number) {

    this.utilService.confirmarEliminar((result) => {
      if (result) {
        this.mantenimientoRepository.eliminarMembresia(idMembresia).subscribe({
          next: () => {
            this.utilService.openSnackBar('Membresia eliminada', 'success');
            this.cargarBeneficios();
          },
          error: (error) => {
            this.utilService.openSnackBar('Error al eliminar membresia', 'error');
            this.utilService.dismissLoader();
          },
        })
      }
    })

  }

  onFrecuenciaChange(
    idGrupo: number,
    idMembresia: number,
    idBeneficio: number,
    valor: string
  ) {
    const data = this.benficiosLista();
    if (!data) return;

    const clone: ListarBeneficiosResponse = {
      ...data,
      beneficios: data.beneficios.map(b => {
        if (b.id !== idBeneficio || b.idBeneficioGeneral !== idGrupo) return b;
        return {
          ...b,
          membresia: b.membresia.map(m =>
            m.id === idMembresia
              ? { ...m, nombreMembresia: valor } // 👈 aquí guardamos lo que se escribe en el input
              : m
          ),
        };
      }),
    };

    this.benficiosLista.set(clone);
  }


}

type EditingTarget = { grupoId: number; membresiaId: number } | null;
