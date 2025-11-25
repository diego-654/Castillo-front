

import { Injectable } from "@angular/core";
import { SocioDatasource } from "@features/socio/domain/datasources/socio.datasource";
import { CrearBeneficiarioRequest } from "@features/socio/domain/models/crear-benficiario-request.model";
import { CrearInvitadoRequest } from "@features/socio/domain/models/crear-invitado-request.model";
import { CrearMiembroRequest } from "@features/socio/domain/models/crear-miembro.request.model";
import { ListaMiembrosActivosRequest } from "@features/socio/domain/models/lista-miembros-activos-request.model";
import { ListaMiembrosActivosResponse } from "@features/socio/domain/models/lista-miembros-activos-response.model";
import { ListarMembresiasResponse } from "@features/socio/domain/models/listar-membresias-response.model";
import { ObtenerDatosMembresiaResponse } from "@features/socio/domain/models/obtener-datos-membresia.response";
import { ObtenerDatosMiembroResponse } from "@features/socio/domain/models/obtener-datos-miembro.response.model";
import { ObtenerDatosPagosResponse } from "@features/socio/domain/models/obtener-datos-pagos.respone";
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

  listarMembresias(): Observable<ListarMembresiasResponse> {
    return this.dataSource.listarMembresias();
  }

  obtenerDatosMiembro(request: number): Observable<ObtenerDatosMiembroResponse> {
    return this.dataSource.obtenerDatosMiembro(request);
  }

  obtenerDatosMembresia(request: number): Observable<ObtenerDatosMembresiaResponse> {
    return this.dataSource.obtenerDatosMembresia(request);
  }

  obtenerDatosPagos(request: number): Observable<ObtenerDatosPagosResponse> {
    return this.dataSource.obtenerDatosPagos(request);
  }

  crearBeneficiario(request: CrearBeneficiarioRequest): Observable<void> {
    return this.dataSource.crearBeneficiario(request);
  }

  crearInvitado(request: CrearInvitadoRequest): Observable<void> {
    return this.dataSource.crearInvitado(request);
  }

}
