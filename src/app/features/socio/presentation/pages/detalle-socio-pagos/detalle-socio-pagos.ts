import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObtenerDatosPagosResponse } from '@features/socio/domain/models/obtener-datos-pagos.respone';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-socio-pagos',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './detalle-socio-pagos.html',
  styleUrl: './detalle-socio-pagos.scss',
})
export default class DetalleSocioPagos {
  socioRepository = inject(SocioRepository);
  utilservice = inject(UtilService);
  route = inject(ActivatedRoute);
  detalleSocioPagos = signal<ObtenerDatosPagosResponse | null>(null);
  socioId = signal<number>(0);

  ngOnInit() {
    this.obtenerIdSocio();
  }

  async obtenerIdSocio() {
    this.utilservice.showLoader();
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.socioId.set(id);
    this.obtenerDatosPagos();
  }

  async obtenerDatosPagos() {
    const res = await firstValueFrom(
      this.socioRepository.obtenerDatosPagos(this.socioId())
    );
    this.detalleSocioPagos.set(res);
    this.utilservice.dismissLoader();
  }


}
