import { Observable } from "rxjs";
import { FormularioClienteResponse } from "../models/formulario-cliente-response.model";
import { EventoFormularioResponse } from "../models/evento-formulario-response.model";
import { FormularioClienteRequest } from "../models/formulario-cliente-request.model";
import { ObtenerFormularioRespuestasResponse } from "../models/obtener-formulario-respuestas-response.molde";
import { EditarFormularioClienteRequest } from "../models/editar-formulario-cliente-request.model";




export abstract class RecoleccionDatosDatasource {

  abstract getFormularioCliente(request: number): Observable<FormularioClienteResponse>;
  abstract getEventoFormulario(): Observable<EventoFormularioResponse>
  abstract guardarFormulario(formulario: FormularioClienteRequest): Observable<void>;
  abstract obtenerFormularioRespuestas(id: number): Observable<ObtenerFormularioRespuestasResponse>;
  abstract editarFormularioCliente(request: EditarFormularioClienteRequest): Observable<void>;

}
