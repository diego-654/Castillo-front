

import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api/api.service";
import { EventoDatasource } from "@features/evento/domain/datasources/evento.datasource";
import { FormularioEventoRequest } from "@features/evento/domain/models/formulario-evento-request.model";
import { ListarHistorialFormularioRequest } from "@features/evento/domain/models/listar-historial-formulario-request.model";
import { HistorialFormularioData, ListarHistorialFormularioResponse } from "@features/evento/domain/models/listar-historial-formulario-response.model";
import { map, Observable, timer } from "rxjs";
import { CrearEventoRequestMapper } from "../mappers/crear-evento-request.mapper";
import { ListarEventosResponseMapper } from "../mappers/listar-eventos-response.mapper";
import { ListarEventosResponseDto } from "../dto/listar-eventos-response.dto";
import { ObtenerFormularioResponseDto } from "../dto/obtener-formulario-response.dto";
import { ObtenerFormularioResponseMapper } from "../mappers/obtener-formulario-response.dto";
import { EditarFormularioRequest } from "@features/evento/domain/models/editar-formulario-request.model";
import { EditarFormularioRequestMapper } from "../mappers/editar-formulario-request.mapper";


@Injectable({ providedIn: 'root' })
export class EventoDatasourceImpl implements EventoDatasource {

  apiService = inject(ApiService);

  guardarFormulario(formulario: FormularioEventoRequest): Observable<void> {

    const body = CrearEventoRequestMapper.toDto(formulario);

    return this.apiService.post<void>('evento/trabajar-evento/0', body);


  }

  listarHistorialFormulario(request: ListarHistorialFormularioRequest): Observable<ListarHistorialFormularioResponse> {
    return timer(200).pipe(
      map((): ListarHistorialFormularioResponse => {
        const lista: HistorialFormularioData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            nombreEncuesta: 'Nombre ' + i,
            fechaInicio: '2025-01-0' + i,
            fechaFin: '2025-01-0' + i,
          });
        }

        return {
          // paginacion: {
          //   paginaNro: request.paginacion.paginaNro,
          //   paginaTamanio: request.paginacion.paginaTamanio,
          //   total: lista.length,
          //   paginasTotal: Math.ceil(lista.length / request.paginacion.paginaTamanio),
          // },
          // orden: {
          //   ordenCampo: 'id',
          //   ordenDireccion: 'ASC',
          // },
          lista: lista,
        };
      })
    );
  }

  listarHistorialFormulario2(): Observable<ListarHistorialFormularioResponse> {
    return this, this.apiService.get<ListarEventosResponseDto>('evento/trabajar-evento/0').pipe(
      map((response) => ListarEventosResponseMapper.toModel(response))
    );
  }

  eliminarHistorialFormulario(id: number): Observable<void> {
    return this.apiService.delete<void>(`evento/trabajar-evento/${id}`);
  }

  obtenerFormulario(id: number): Observable<FormularioEventoRequest> {
    return this.apiService.get<ObtenerFormularioResponseDto>('evento/trabajar-evento/0').pipe(
      map((response) => ObtenerFormularioResponseMapper.toModel(response, id))
    );
  }

  editarFormulario(request: EditarFormularioRequest): Observable<void> {

    const body = EditarFormularioRequestMapper.toDto(request);

    return this.apiService.put<void>(`evento/trabajar-evento/${request.id}`, body);
  }

}
