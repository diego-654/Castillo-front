import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObtenerDatosMembresiaResponse } from '@features/socio/domain/models/obtener-datos-membresia.response';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-socio-membresia',
  imports: [CommonModule],
  templateUrl: './detalle-socio-membresia.html',
  styleUrl: './detalle-socio-membresia.scss',
})
export default class DetalleSocioMembresia {
  socioRepository = inject(SocioRepository);
  route = inject(ActivatedRoute);
  detalleSocioMembresia = signal<ObtenerDatosMembresiaResponse | null>(null);

  socioId = signal<number>(0);

  ngOnInit() {
    this.obtenerIdSocio();
  }
  async obtenerIdSocio() {
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.socioId.set(id);
    this.obtenerDatosMembresia();
  }

  async obtenerDatosMembresia() {
    const res = await firstValueFrom(
      this.socioRepository.obtenerDatosMembresia(this.socioId())
    );
    this.detalleSocioMembresia.set(res);
  }
}
