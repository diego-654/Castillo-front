import { Observable } from "rxjs";
import { ListarInteresadosRequest } from "../models/listar-interesados-request.model";
import { ListarInteresadosResponse } from "../models/listar-interesados-response.model";


export abstract class InteresadosDataSource {
  abstract listarInteresados(
    request: ListarInteresadosRequest
  ): Observable<ListarInteresadosResponse>;
  abstract eliminarInteresado(id: number): Observable<void>;
}
