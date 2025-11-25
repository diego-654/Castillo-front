import { Injectable } from '@angular/core';
import { ReportesDataSource } from '@features/reportes/domain/datasources/reportes.datasources';
import { ReportesDisponiblesResponse } from '@features/reportes/domain/models/reportes-disponibles-response.model';
import { Observable, timer, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesDataSourceImpl implements ReportesDataSource {
  getReportesDisponibles(): Observable<ReportesDisponiblesResponse> {
    return timer(1000).pipe(
      map(() => ({
        listaReportes: [
          { id: 1, nombre: 'Reportes de Nuevos Clientes' },
          { id: 2, nombre: 'Reportes de Membresia Activa' },
          { id: 3, nombre: 'Reporte de Pagos Pendientes' },
        ],
      }))
    );
  }
}
