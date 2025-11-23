import { Observable } from "rxjs";
import { ListarInteresadosResponse } from "../models/listar-interesados-response.model";
import { ListarInteresadosRequest } from "../models/listar-interesados-request.model";



export abstract class InteresadosRepository {
  abstract listarInteresados(
    request: ListarInteresadosRequest
  ): Observable<ListarInteresadosResponse>;
}
