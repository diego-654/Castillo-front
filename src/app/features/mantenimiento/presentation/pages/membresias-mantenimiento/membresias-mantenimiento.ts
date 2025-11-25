import { Component, inject, signal } from '@angular/core';
import { Beneficios, ListarBeneficiosResponse, Membresia } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
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

  ngOnInit() {
    this.cargarBeneficios();
  }

  async cargarBeneficios() {
    this.utilService.showLoader();
    const res = await firstValueFrom(
      this.mantenimientoRepository.listarBeneficios()
    );
    this.benficiosLista.set(res);
    this.utilService.dismissLoader();
  }


  beneficiosPorMembresiaYGrupo(idMembresia: number, idGrupo: number) {
    const data = this.benficiosLista();
    if (!data) return [];

    return data.beneficios.filter(b =>
      b.idBeneficioGeneral === idGrupo &&           // 👈 mismo bloque
      b.membresia?.some(m => m.id === idMembresia) // 👈 misma membresía
    );
  }



  configBeneficioPorMembresia(beneficio: Beneficios, idMembresia: number): Membresia | null {
    return beneficio.membresia?.find(m => m.id === idMembresia) ?? null;
  }

  frecuenciaBeneficio(beneficio: Beneficios, idMembresia: number): string | null {
    const cfg = this.configBeneficioPorMembresia(beneficio, idMembresia);
    return cfg?.nombreMembresia ?? null;
  }

  beneficiosPorGrupo(idGrupo: number) {
    const data = this.benficiosLista();
    if (!data) return [];
    return data.beneficios.filter(b => b.idBeneficioGeneral === idGrupo);
  }

}
