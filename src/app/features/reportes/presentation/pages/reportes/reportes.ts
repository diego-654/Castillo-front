import { Component, inject, signal } from '@angular/core';
import { ReportesDisponibles } from '@features/reportes/domain/models/reportes-disponibles-response.model';
import { ReportesRepository } from '@features/reportes/domain/repositories/reportes.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';
import { Card } from '../../components/card/card';

@Component({
  selector: 'app-reportes',
  imports: [Card],
  templateUrl: './reportes.html',
  styleUrl: './reportes.scss',
})
export default class Reportes {

  readonly reportesDisponibles = inject(ReportesRepository);
  readonly utilService = inject(UtilService);

  listaReportesDisponibles = signal<ReportesDisponibles[]>([]);

  ngOnInit() {
    this.reporteDisponibles();
  }

  async reporteDisponibles() {
    this.utilService.showLoader();
    try {
      const res = await firstValueFrom(
        this.reportesDisponibles.getReportesDisponibles()
      );
      this.listaReportesDisponibles.set(res.listaReportes);
      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.dismissLoader();
    }
  }

}
