import { Observable } from 'rxjs';
import { ListarBeneficiosResponse } from '../models/listar-beneficios-response.model';
import { ListarAliadoRequest } from '../models/listar-aliado-request.model';
import { ListarAliadoResponse } from '../models/listar-aliado-response.model';
import { CrearAliadoRequest } from '../models/crear-aliado-request.model';
import { CrearConcesionarioRequest } from '../models/crear-concesionario-request.model';
import { ListarConcesionarioRequest } from '../models/listar-concesionario-request.model';
import { ListarConcesionarioResponse } from '../models/listar-concesionario-response.model';
import { ActualizarBeneficiosMembresiaRequest } from '../models/actualizar-beneficio-membresia-request.model';
import { CrearNuevaMembresiaRequest } from '../models/crear-membresia-request.model';

export abstract class MantenimientoRepository {
  abstract listarBeneficios(): Observable<ListarBeneficiosResponse>;

  abstract listarAliados(request: ListarAliadoRequest): Observable<ListarAliadoResponse>;
  abstract crearAliado(request: CrearAliadoRequest): Observable<void>;
  abstract listarConcesionarios(request: ListarConcesionarioRequest): Observable<ListarConcesionarioResponse>;
  abstract crearConcesionario(request: CrearConcesionarioRequest): Observable<void>;

  abstract actualizarBeneficiosMembresia(request: ActualizarBeneficiosMembresiaRequest): Observable<void>;
  abstract crearNuevaMembresia(request: CrearNuevaMembresiaRequest): Observable<void>;
}
