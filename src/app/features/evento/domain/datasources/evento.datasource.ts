import { Observable } from 'rxjs';
import { FormularioEventoRequest } from '../models/formulario-evento-request.model';
import { ListarHistorialFormularioRequest } from '../models/listar-historial-formulario-request.model';
import { ListarHistorialFormularioResponse } from '../models/listar-historial-formulario-response.model';
import { ObtenerFormularioResponse } from '../models/obtener-formulario.response.model';

export abstract class EventoDatasource {
  abstract guardarFormulario(formulario: FormularioEventoRequest): Observable<void>;

  abstract listarHistorialFormulario(
    request: ListarHistorialFormularioRequest
  ): Observable<ListarHistorialFormularioResponse>;
  abstract eliminarHistorialFormulario(id: number): Observable<void>;
  abstract obtenerFormulario(id: number): Observable<ObtenerFormularioResponse>;

}
