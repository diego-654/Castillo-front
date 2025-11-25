import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObtenerDatosMembresiaResponse } from '@features/socio/domain/models/obtener-datos-membresia.response';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { DialogService } from '@shared/components/plugins/dialog';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';
import { SuspenderPopup } from '../../components/suspender-popup/suspender-popup';
import { RenovarPopup } from '../../components/renovar-popup/renovar-popup';

@Component({
  selector: 'app-detalle-socio-membresia',
  imports: [CommonModule],
  templateUrl: './detalle-socio-membresia.html',
  styleUrl: './detalle-socio-membresia.scss',
})
export default class DetalleSocioMembresia {
  socioRepository = inject(SocioRepository);
  utilservice = inject(UtilService);
  route = inject(ActivatedRoute);
  detalleSocioMembresia = signal<ObtenerDatosMembresiaResponse | null>(null);
  dialogService = inject(DialogService);

  socioId = signal<number>(0);

  ngOnInit() {
    let parent = this.route;
    while (parent && parent.snapshot.paramMap.get('id') == null) {
      parent = parent.parent!;
    }

    const id = Number(parent?.snapshot.paramMap.get('id') ?? 0);
    this.socioId.set(id);
    this.obtenerDatosMembresia();
  }

  async obtenerDatosMembresia() {
    this.utilservice.showLoader();
    const res = await firstValueFrom(this.socioRepository.obtenerDatosMembresia(this.socioId()));
    this.detalleSocioMembresia.set(res);
    this.utilservice.dismissLoader();
  }

  suspenderPopUp() {
    const dialogRef = this.dialogService.open(SuspenderPopup, {
      width: '100%',
      maxWidth: '421px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.utilservice.showLoader();
        this.socioRepository.suspenderMembresia(this.socioId()).subscribe({
          next: () => {
            this.utilservice.dismissLoader();
          },
          error: (error) => {
            this.utilservice.dismissLoader();
          },
        });
      }
    });
  }
  renovarPopUp() {
    const dialogRef = this.dialogService.open(RenovarPopup, {
      width: '100%',
      maxWidth: '421px',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.utilservice.showLoader();
        this.socioRepository.renovarMembresia(this.socioId()).subscribe({
          next: () => {
            this.utilservice.dismissLoader();
          },
          error: (error) => {
            this.utilservice.dismissLoader();
          },
        });
      }
    });
  }
}
