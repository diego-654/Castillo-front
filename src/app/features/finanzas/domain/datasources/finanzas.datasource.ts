import { Observable } from "rxjs";
import { ListarFacturacionRequest } from "../models/listar-facturacion-request.model";
import { ListarFacturacionResponse } from "../models/listar-facturacion-response.model";

export abstract class FinanzasDatasource {
  abstract listarFacturacion(request: ListarFacturacionRequest): Observable<ListarFacturacionResponse>;
}
