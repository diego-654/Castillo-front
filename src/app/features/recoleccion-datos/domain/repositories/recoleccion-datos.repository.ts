import { Observable } from "rxjs";
import { FormularioClienteResponse } from "../models/formulario-cliente-response.model";


export abstract class RecoleccionDatosRepository {

  abstract getFormularioCliente(): Observable<FormularioClienteResponse>

}
