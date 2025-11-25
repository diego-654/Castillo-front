import { Injectable } from '@angular/core';
import { ReportesDataSource } from '@features/reportes/domain/datasources/reportes.datasources';
import { ReportesDisponiblesResponse } from '@features/reportes/domain/models/reportes-disponibles-response.model';
import { ReportesRepository } from '@features/reportes/domain/repositories/reportes.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportesRepositoryImpl implements ReportesRepository {
  constructor(private dataSource: ReportesDataSource) {}
  
  getReportesDisponibles(): Observable<ReportesDisponiblesResponse> {
    return this.dataSource.getReportesDisponibles();
  }
}
