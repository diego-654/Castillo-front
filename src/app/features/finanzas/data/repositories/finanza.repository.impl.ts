import { Injectable } from '@angular/core';
import { FinanzasDatasource } from '@features/finanzas/domain/datasources/finanzas.datasource';
import { CrearFacturaRequest } from '@features/finanzas/domain/models/crear-factura-request.model';
import { ListarFacturacionRequest } from '@features/finanzas/domain/models/listar-facturacion-request.model';
import { ListarFacturacionResponse } from '@features/finanzas/domain/models/listar-facturacion-response.model';
import { ListarRegistroPagosRequest } from '@features/finanzas/domain/models/listar-registro-pagos-request.model';
import { ListarRegistroPagosResponse } from '@features/finanzas/domain/models/listar-registro-pagos-response-model';
import { ObtenerFacturaResponse } from '@features/finanzas/domain/models/obtener-factura-response.model';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanzasRepositoryImpl implements FinanzasRepository {
  constructor(private dataSource: FinanzasDatasource) {}
  listarFacturacion(request: ListarFacturacionRequest): Observable<ListarFacturacionResponse> {
    return this.dataSource.listarFacturacion(request);
  }
  listarRegistroPagos(
    request: ListarRegistroPagosRequest
  ): Observable<ListarRegistroPagosResponse> {
    return this.dataSource.listarRegistroPagos(request);
  }
  crearFactura(request: CrearFacturaRequest): Observable<void> {
    return this.dataSource.crearFactura(request);
  }
  obtenerFactura(id: number): Observable<ObtenerFacturaResponse> {
    return this.dataSource.obtenerFactura(id);
  }
}
