import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { MantenimientoDatasource } from '@features/mantenimiento/domain/datasources/mantenimiento.datasource';
import { ActualizarBeneficiosMembresiaRequest } from '@features/mantenimiento/domain/models/actualizar-beneficio-membresia-request.model';
import { CrearAliadoRequest } from '@features/mantenimiento/domain/models/crear-aliado-request.model';
import { CrearConcesionarioRequest } from '@features/mantenimiento/domain/models/crear-concesionario-request.model';
import { CrearNuevaMembresiaRequest } from '@features/mantenimiento/domain/models/crear-membresia-request.model';
import { DetalleAliadoResponse } from '@features/mantenimiento/domain/models/detalle-aliado-response.model';
import { ListarAliadoRequest } from '@features/mantenimiento/domain/models/listar-aliado-request.model';
import { AliadoData, ListarAliadoResponse } from '@features/mantenimiento/domain/models/listar-aliado-response.model';
import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { ListarConcesionarioRequest } from '@features/mantenimiento/domain/models/listar-concesionario-request.model';
import { ListarConcesionarioResponse, ConcesionarioData } from '@features/mantenimiento/domain/models/listar-concesionario-response.model';
import { map, Observable, timer } from 'rxjs';
import { ListarBeneficiosResponseDto } from '../dto/listar-beneficios-response.dto';
import { ListarBeneficiosResponseMapper } from '../mapper/listar-beneficios-response.mapper';


@Injectable({ providedIn: 'root' })
export class MantenimientoDatasourceImpl implements MantenimientoDatasource {

  apiService = inject(ApiService);

  listarBeneficios(): Observable<ListarBeneficiosResponse> {
    return this.apiService.get<ListarBeneficiosResponseDto>('membresia/trabajar-beneficio/0').pipe(
      map((response) => ListarBeneficiosResponseMapper.toModel(response))
    );

  }
  listarAliados(request: ListarAliadoRequest): Observable<ListarAliadoResponse> {
    return timer(200).pipe(
      map((): ListarAliadoResponse => {
        const lista: AliadoData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            nombre: 'Nombre ' + i,
            tipo: 'Tipo ' + i,
            nombreEmpresa: 'Empresa ' + i,
            fecha: new Date(),
          });
        }

        return {
          paginacion: {
            paginaNro: request.paginacion.paginaNro,
            paginasTotal: Math.ceil(lista.length / request.paginacion.paginaTamanio),
          },
          lista: lista,
        };
      })
    );
  }

  crearAliado(request: CrearAliadoRequest): Observable<void> {
    return timer(200).pipe(
      map((): void => {
        console.log('crear aliado');
      })
    );
  }

  listarConcesionarios(
    request: ListarConcesionarioRequest
  ): Observable<ListarConcesionarioResponse> {
    return timer(200).pipe(
      map((): ListarConcesionarioResponse => {
        const lista: ConcesionarioData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            servicio: 'Servicio ' + i,
            proveedor: 'Proveedor ' + i,
            nombreEmpresa: 'Empresa ' + i,
            estado: 'Estado ' + i,
          });
        }

        return {
          paginacion: {
            paginaNro: request.paginacion.paginaNro,
            paginaTamanio: request.paginacion.paginaTamanio,
            total: lista.length,
            paginasTotal: Math.ceil(lista.length / request.paginacion.paginaTamanio),
          },
          orden: {
            ordenCampo: 'id',
            ordenDireccion: 'ASC',
          },
          lista: lista,
        };
      })
    );
  }
  crearConcesionario(request: CrearConcesionarioRequest): Observable<void> {
    return timer(200).pipe(
      map((): void => {
        console.log('crear concesionario');
      })
    );
  }

  actualizarBeneficiosMembresia(request: ActualizarBeneficiosMembresiaRequest): Observable<void> {
    return timer(200).pipe(
      map((): void => {
        console.log('actualizar beneficios membresia');
        console.log(request);

      })
    );
  }

  crearNuevaMembresia(request: CrearNuevaMembresiaRequest): Observable<void> {
    return timer(200).pipe(
      map((): void => {
        console.log('crear nueva membresia');
        console.log(request);
      })
    );
  }

  obtenerDetalleAliado(request: number): Observable<DetalleAliadoResponse> {
    return timer(200).pipe(
      map((): DetalleAliadoResponse => {
        const lista: DetalleAliadoResponse = {
          id: 1,
          nombre: 'Castillo Buffet',
          ruc: '201520010055',
          fechaIcorporacion: '10/10/2023',
          fechaCaducidad: '10/10/2024',
          socioRepresentante: 'María González Quispe',
          listContacto: [
            {
              id: 1,
              socioNombre: 'María González Quispe',
              correo: 'mgonzales@example.com',
              telefono: '987654321',
              direccion: 'Av. Principal 123, Col. Centro',
            },
            {
              id: 2,
              socioNombre: 'María González Quispe',
              correo: 'mgonzales@example.com',
              telefono: '987654321',
              direccion: 'Av. Principal 123, Col. Centro',
            },
          ],
          listaBeneficios: [
            {
              id: 1,
              nombre: 'Membresía - MEDIEVAL',
              beneficios: [
                {
                  id: 1,
                  nombre: 'Descuento de comida en un 30%',
                },
              ],
            },
            {
              id: 2,
              nombre: 'Membresía - REAL',
              beneficios: [
                {
                  id: 1,
                  nombre: 'Descuento de comida en un 30%',
                },
                {
                  id: 2,
                  nombre: 'Descuento de comida en un 50%',
                },

              ],
            },
          ],
        };
        return lista;
      })
    );
  }

}
