import { Observable } from "rxjs";
import { FormularioClienteResponse } from "../models/formulario-cliente-response.model";
import { EventoFormularioResponse } from "../models/evento-formulario-response.model";
import { FormularioClienteRequest } from "../models/formulario-cliente-request.model";




export abstract class RecoleccionDatosDatasource {

  abstract getFormularioCliente(): Observable<FormularioClienteResponse>;
  abstract getEventoFormulario(): Observable<EventoFormularioResponse>
  abstract guardarFormulario(formulario: FormularioClienteRequest): Observable<void>;

}
