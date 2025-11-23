import { Injectable } from '@angular/core';
import { FinanzasDatasource } from '@features/finanzas/domain/datasources/finanzas.datasource';
import { ListarFacturacionRequest } from '@features/finanzas/domain/models/listar-facturacion-request.model';
import { ListarFacturacionResponse } from '@features/finanzas/domain/models/listar-facturacion-response.model';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanzasRepositoryImpl implements FinanzasRepository {
  constructor(private dataSource: FinanzasDatasource) {}
  listarFacturacion(request: ListarFacturacionRequest): Observable<ListarFacturacionResponse> {
    return this.dataSource.listarFacturacion(request);
  }
}
