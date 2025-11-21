import { Observable } from "rxjs";
import { FormularioClienteResponse } from "../models/formulario-cliente-response.model";




export abstract class RecoleccionDatosDatasource {

  abstract getFormularioCliente(): Observable<FormularioClienteResponse>;

}
