

import { Observable } from "rxjs";
import { ListaMiembrosActivosRequest } from "../models/lista-miembros-activos-request.model";
import { ListaMiembrosActivosResponse } from "../models/lista-miembros-activos-response.model";


export abstract class SocioDatasource {

  abstract listaMiembrosActivos(request: ListaMiembrosActivosRequest): Observable<ListaMiembrosActivosResponse>;

}
