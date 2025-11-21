import { Observable } from "rxjs";
import { FormularioClienteResponse } from "../models/formulario-cliente-response.model";
import { EventoFormularioResponse } from "../models/evento-formulario-response.model";


export abstract class RecoleccionDatosRepository {

  abstract getFormularioCliente(): Observable<FormularioClienteResponse>
  abstract getEventoFormulario(): Observable<EventoFormularioResponse>

}
