import { Observable } from "rxjs";
import { FormularioEventoRequest } from "../models/formulario-evento-request.model";



export abstract class EventoDatasource {

  abstract guardarFormulario(formulario: FormularioEventoRequest): Observable<void>;

}
