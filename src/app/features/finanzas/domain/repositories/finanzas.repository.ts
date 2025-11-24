import { Observable } from 'rxjs';
import { ListarFacturacionRequest } from '../models/listar-facturacion-request.model';
import { ListarFacturacionResponse } from '../models/listar-facturacion-response.model';
import { ListarRegistroPagosRequest } from '../models/listar-registro-pagos-request.model';
import { ListarRegistroPagosResponse } from '../models/listar-registro-pagos-response-model';
import { CrearFacturaRequest } from '../models/crear-factura-request.model';
import { ObtenerFacturaResponse } from '../models/obtener-factura-response.model';

export abstract class FinanzasRepository {
  abstract listarFacturacion(
    request: ListarFacturacionRequest
  ): Observable<ListarFacturacionResponse>;
  abstract listarRegistroPagos(
    request: ListarRegistroPagosRequest
  ): Observable<ListarRegistroPagosResponse>;

  abstract crearFactura(request: CrearFacturaRequest): Observable<void>;
  abstract obtenerFactura(id:number): Observable<ObtenerFacturaResponse>;
}
