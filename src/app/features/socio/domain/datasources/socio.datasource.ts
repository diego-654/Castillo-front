

import { Observable } from "rxjs";
import { ListaMiembrosActivosRequest } from "../models/lista-miembros-activos-request.model";
import { ListaMiembrosActivosResponse } from "../models/lista-miembros-activos-response.model";
import { CrearMiembroRequest } from "../models/crear-miembro.request.model";
import { ListarMembresiasResponse } from "../models/listar-membresias-response.model";


export abstract class SocioDatasource {

  abstract listaMiembrosActivos(request: ListaMiembrosActivosRequest): Observable<ListaMiembrosActivosResponse>;
  abstract crearMiembro(request: CrearMiembroRequest): Observable<void>;
  abstract listarMembresias(): Observable<ListarMembresiasResponse>;

}
