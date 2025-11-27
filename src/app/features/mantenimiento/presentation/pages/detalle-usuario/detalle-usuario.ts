import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetalleAliadoResponse } from '@features/mantenimiento/domain/models/detalle-aliado-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogService } from '@shared/components/plugins/dialog';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-usuario',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.scss',
})
export default class DetalleUsuario {
  utilService = inject(UtilService);
  mantenimientoRepository = inject(MantenimientoRepository);
  route = inject(ActivatedRoute);

  detalleUsuario = signal<DetalleAliadoResponse | null>(null);
  dialogService = inject(DialogService);

  idusuario = signal<number>(0);

  ngOnInit() {
    let parent = this.route;
    while (parent && parent.snapshot.paramMap.get('id') == null) {
      parent = parent.parent!;
    }

    const id = Number(parent?.snapshot.paramMap.get('id') ?? 0);
    this.idusuario.set(id);
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    this.utilService.showLoader();
    const res = await firstValueFrom(this.mantenimientoRepository.obtenerDetalleAliado(this.idusuario()));
    this.detalleUsuario.set(res);
    this.utilService.dismissLoader();
  }

  obtenerLetras(nombre: string) {
    return nombre.split(' ').map(n => n[0]).join('');
  }

}
