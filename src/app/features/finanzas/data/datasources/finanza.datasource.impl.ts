import { Injectable } from "@angular/core";
import { FinanzasDatasource } from "@features/finanzas/domain/datasources/finanzas.datasource";
import { ListarFacturacionRequest } from "@features/finanzas/domain/models/listar-facturacion-request.model";
import { ListarFacturacionResponse, FacturacionData } from "@features/finanzas/domain/models/listar-facturacion-response.model";
import { Observable, timer, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FinanzasDatasourceImpl implements FinanzasDatasource {
  listarFacturacion(request: ListarFacturacionRequest): Observable<ListarFacturacionResponse> {
    return timer(200).pipe(
      map((): ListarFacturacionResponse => {
        const lista: FacturacionData[] = [];

        for (let i = 0; i < 10; i++) {
          lista.push({
            id: i,
            nombre: 'Nombre ' + i,
            factura: 'Factura ' + i,
            membresia: 'Membresia ' + i,
            fecha: '2025-01-0' + i,
          });
        }

        return {
          paginacion: {
            paginaNro: request.paginacion.paginaNro,
            paginaTamanio: request.paginacion.paginaTamanio,
            total: lista.length,
            paginasTotal: Math.ceil(lista.length / request.paginacion.paginaTamanio),
          },
          orden: {
            ordenCampo: 'id',
            ordenDireccion: 'ASC',
          },
          lista: lista,
        };
      })
    );
  }
}
