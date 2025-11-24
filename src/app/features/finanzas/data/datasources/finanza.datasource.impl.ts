import { Injectable } from '@angular/core';
import { FinanzasDatasource } from '@features/finanzas/domain/datasources/finanzas.datasource';
import { CrearFacturaRequest } from '@features/finanzas/domain/models/crear-factura-request.model';
import { ListarFacturacionRequest } from '@features/finanzas/domain/models/listar-facturacion-request.model';
import {
  ListarFacturacionResponse,
  FacturacionData,
} from '@features/finanzas/domain/models/listar-facturacion-response.model';
import { ListarRegistroPagosRequest } from '@features/finanzas/domain/models/listar-registro-pagos-request.model';
import {
  ListarRegistroPagosResponse,
  RegistroPagosData,
} from '@features/finanzas/domain/models/listar-registro-pagos-response-model';
import { ObtenerFacturaResponse } from '@features/finanzas/domain/models/obtener-factura-response.model';
import { Observable, timer, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FinanzasDatasourceImpl implements FinanzasDatasource {
  listarFacturacion(request: ListarFacturacionRequest): Observable<ListarFacturacionResponse> {
    return timer(200).pipe(
      map((): ListarFacturacionResponse => {
        const lista: FacturacionData[] = [];

        for (let i = 1; i < 10; i++) {
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
  listarRegistroPagos(
    request: ListarRegistroPagosRequest
  ): Observable<ListarRegistroPagosResponse> {
    return timer(200).pipe(
      map((): ListarRegistroPagosResponse => {
        const lista: RegistroPagosData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            nombre: 'Nombre ' + i,
            metodo: 'Metodo ' + i,
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
  crearFactura(request: CrearFacturaRequest): Observable<void> {
    return timer(200).pipe(
      map((): void => {
        console.log('crear factura');
      })
    );
  }
  obtenerFactura(id: number): Observable<ObtenerFacturaResponse> {
    return timer(200).pipe(
      map((): ObtenerFacturaResponse => {
        const lista: FacturacionData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            nombre: 'Nombre ' + i,
            factura: 'Factura ' + i,
            membresia: 'Membresia ' + i,
            fecha: '2025-01-0' + i,
          });
        }

        return {
          id: id,
          cliente: 'Cliente ' + id,
          correo: 'Correo ' + id,
          mes: id,
        };
      })
    );
  }
}
