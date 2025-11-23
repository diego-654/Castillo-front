

import { Injectable } from "@angular/core";
import { SocioDatasource } from "@features/socio/domain/datasources/socio.datasource";
import { CrearMiembroRequest } from "@features/socio/domain/models/crear-miembro.request.model";
import { ListaMiembrosActivosRequest } from "@features/socio/domain/models/lista-miembros-activos-request.model";
import { ListaMiembrosActivosResponse } from "@features/socio/domain/models/lista-miembros-activos-response.model";
import { SocioRepository } from "@features/socio/domain/repositories/socio.repository";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class SocioRepositoryImpl implements SocioRepository {

  constructor(private dataSource: SocioDatasource) {
  }

  listaMiembrosActivos(request: ListaMiembrosActivosRequest): Observable<ListaMiembrosActivosResponse> {
    return this.dataSource.listaMiembrosActivos(request);
  }

  crearMiembro(request: CrearMiembroRequest): Observable<void> {
    return this.dataSource.crearMiembro(request);
  }

}
