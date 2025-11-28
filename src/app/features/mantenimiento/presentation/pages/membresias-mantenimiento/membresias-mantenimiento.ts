import { Component, inject, signal } from '@angular/core';
import { ActualizarBeneficiosMembresiaRequest } from '@features/mantenimiento/domain/models/actualizar-beneficio-membresia-request.model';
import { CrearNuevaMembresiaRequest } from '@features/mantenimiento/domain/models/crear-membresia-request.model';
import { Beneficios, ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CheckboxComponent } from '@shared/components/checkbox/checkbox.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-membresias-mantenimiento',
  imports: [ButtonComponent, SvgIconComponent, CheckboxComponent],
  templateUrl: './membresias-mantenimiento.html',
  styleUrl: './membresias-mantenimiento.scss',
})
export default class MembresiasMantenimiento {
  benficiosLista = signal<ListarBeneficiosResponse | null>(null);
  readonly mantenimientoRepository = inject(MantenimientoRepository);
  readonly utilService = inject(UtilService);

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


  // guardar solo la membresía en edición
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
          valor: cfg.valor,
          frecuencia: cfg.nombreMembresia,
        };
      })
      .filter(Boolean) as { idBeneficio: number; valor: boolean; frecuencia: string }[];

    const esNueva = this.nuevasMembresiasIds().includes(idMembresia);

    if (esNueva) {
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
          // la sacamos de la lista de nuevas
          this.nuevasMembresiasIds.update(list =>
            list.filter(id => id !== idMembresia)
          );
          this.editingTarget.set(null);
        },
        error: () => {
          this.utilService.dismissLoader();
        },
      });

    } else {
      const request: ActualizarBeneficiosMembresiaRequest = {
        idBeneficioGeneral: idGrupo,
        idMembresia,
        beneficios: payloadBeneficios,
      };

      console.log('REQUEST ACTUALIZAR', request);

      this.mantenimientoRepository.actualizarBeneficiosMembresia(request).subscribe({
        next: () => {
          this.utilService.dismissLoader();
          this.editingTarget.set(null);
        },
        error: () => {
          this.utilService.dismissLoader();
        },
      });
    }
  }


  crearNuevaMembresia(grupoId: number) {
    const data = this.benficiosLista();
    if (!data) return;

    const grupo = data.datosBeneficioMembresia.find(g => g.id === grupoId);
    if (!grupo) return;

    // nuevo id de membresía = max(id existentes) + 1
    const allMembresiaIds = data.datosBeneficioMembresia
      .flatMap(g => g.datosMembresia.map(m => m.id));

    const maxId = allMembresiaIds.length ? Math.max(...allMembresiaIds) : 0;
    const newId = maxId + 1;

    const nuevaMembresiaNombre = 'Esta es una nueva membresia';
    const nuevaFrecuencia = '1 vez al mes';

    const updated: ListarBeneficiosResponse = {
      ...data,
      // 1) agregar membresía al grupo (al inicio)
      datosBeneficioMembresia: data.datosBeneficioMembresia.map(g => {
        if (g.id !== grupoId) return g;
        return {
          ...g,
          datosMembresia: [
            {
              id: newId,
              nombreMembresia: nuevaMembresiaNombre,
              tipoMembresia: 'Membresía',
            },
            ...g.datosMembresia,
          ],
        };
      }),
      // 2) agregar regla de membresía a cada beneficio del grupo
      beneficios: data.beneficios.map(b => {
        if (b.idBeneficioGeneral !== grupoId) return b;
        return {
          ...b,
          membresia: [
            {
              id: newId,
              nombreMembresia: nuevaFrecuencia,
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
  }


}

type EditingTarget = { grupoId: number; membresiaId: number } | null;
