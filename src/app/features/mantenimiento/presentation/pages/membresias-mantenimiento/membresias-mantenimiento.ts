import { Component, inject, signal } from '@angular/core';
import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-membresias-mantenimiento',
  imports: [ButtonComponent, SvgIconComponent],
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


  // Ajusta el tipo según tu modelo real
  beneficiosPorMembresia(idMembresia: number) {
    const data = this.benficiosLista();
    if (!data) return [];

    return data.beneficios.filter(b =>
      b.membresia?.some(m => m.id === idMembresia)
    );
  }


  frecuenciaBeneficio(beneficio: any, idMembresia: number): string | null {
    const m = beneficio.membresia?.find((x: any) => x.id === idMembresia);
    return m?.nombreMembresia ?? null;
  }

}
