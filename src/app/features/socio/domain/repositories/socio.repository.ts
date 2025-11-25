import { Observable } from "rxjs";
import { ListaMiembrosActivosRequest } from "../models/lista-miembros-activos-request.model";
import { ListaMiembrosActivosResponse } from "../models/lista-miembros-activos-response.model";
import { CrearMiembroRequest } from "../models/crear-miembro.request.model";
import { ListarMembresiasResponse } from "../models/listar-membresias-response.model";
import { ObtenerDatosMiembroResponse } from "../models/obtener-datos-miembro.response.model";
import { ObtenerDatosMembresiaResponse } from "../models/obtener-datos-membresia.response";
import { ObtenerDatosPagosResponse } from "../models/obtener-datos-pagos.respone";
import { CrearBeneficiarioRequest } from "../models/crear-benficiario-request.model";
import { CrearInvitadoRequest } from "../models/crear-invitado-request.model";



export abstract class SocioRepository {

  abstract listaMiembrosActivos(request: ListaMiembrosActivosRequest): Observable<ListaMiembrosActivosResponse>;
  abstract crearMiembro(request: CrearMiembroRequest): Observable<void>;
  abstract listarMembresias(): Observable<ListarMembresiasResponse>;
  abstract obtenerDatosMiembro(request: number): Observable<ObtenerDatosMiembroResponse>;
  abstract obtenerDatosMembresia(request: number): Observable<ObtenerDatosMembresiaResponse>;
  abstract obtenerDatosPagos(request: number): Observable<ObtenerDatosPagosResponse>;

  abstract crearBeneficiario(request: CrearBeneficiarioRequest): Observable<void>;
  abstract crearInvitado(request: CrearInvitadoRequest): Observable<void>;
  abstract suspenderMembresia(request: number): Observable<void>;
  abstract renovarMembresia(request: number): Observable<void>;
}
