import { Injectable } from '@angular/core';
import { MantenimientoDatasource } from '@features/mantenimiento/domain/datasources/mantenimiento.datasource';
import { ActualizarBeneficiosMembresiaRequest } from '@features/mantenimiento/domain/models/actualizar-beneficio-membresia-request.model';
import { CrearAliadoRequest } from '@features/mantenimiento/domain/models/crear-aliado-request.model';
import { CrearConcesionarioRequest } from '@features/mantenimiento/domain/models/crear-concesionario-request.model';
import { ListarAliadoRequest } from '@features/mantenimiento/domain/models/listar-aliado-request.model';
import { ListarAliadoResponse } from '@features/mantenimiento/domain/models/listar-aliado-response.model';
import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { ListarConcesionarioRequest } from '@features/mantenimiento/domain/models/listar-concesionario-request.model';
import { ListarConcesionarioResponse } from '@features/mantenimiento/domain/models/listar-concesionario-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { map, Observable, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MantenimientoRepositoryImpl implements MantenimientoRepository {
  constructor(private dataSource: MantenimientoDatasource) { }

  listarBeneficios(): Observable<ListarBeneficiosResponse> {
    return this.dataSource.listarBeneficios();
  }

  listarAliados(request: ListarAliadoRequest): Observable<ListarAliadoResponse> {
    return this.dataSource.listarAliados(request);
  }

  crearAliado(request: CrearAliadoRequest): Observable<void> {
    return this.dataSource.crearAliado(request);
  }
  listarConcesionarios(
    request: ListarConcesionarioRequest
  ): Observable<ListarConcesionarioResponse> {
    return this.dataSource.listarConcesionarios(request);
  }
  crearConcesionario(request: CrearConcesionarioRequest): Observable<void> {
    return this.dataSource.crearConcesionario(request);
  }
  actualizarBeneficiosMembresia(request: ActualizarBeneficiosMembresiaRequest): Observable<void> {
    return this.dataSource.actualizarBeneficiosMembresia(request);
  }

}

