import { inject, Injectable } from "@angular/core";
import { ApiService } from "@core/services/api/api.service";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";
import { FormularioClienteRequest } from "@features/recoleccion-datos/domain/models/formulario-cliente-request.model";
import { FormularioClienteResponse, TipoInputType } from "@features/recoleccion-datos/domain/models/formulario-cliente-response.model";
import { ObtenerFormularioRespuestasResponse } from "@features/recoleccion-datos/domain/models/obtener-formulario-respuestas-response.molde";
import { map, Observable, timer } from "rxjs";
import { ObtenerFormulariosResponseDto } from "../dto/obtener-formularios.response.dto";
import { ObtenerFormulariosResponseMapper } from "../mapper/obtener-formularios-response.mapper";
import { GuardarRespuestasRequestMapper } from "../mapper/guardar-respuestas-request.mapper";
import { ObtenerFormularioClienteResponseDto } from "../dto/obtener-formulario-cliente-response.dto";
import { ObtenerFormularioClienteResponseMapper } from "../mapper/obtener-formulario-cliente-response.mapper";
import { ObtenerFormularioResponseDto } from "@features/evento/data/dto/obtener-formulario-response.dto";
import { ObtenerFormularioRespuestasResponseDto } from "../dto/obtener-formulario-respuestas-response.dto";
import { ObtenerFormularioRespuestasResponseMapper } from "../mapper/obtener-formulario-respuestas-response.mapper";
import { EditarFormularioClienteRequest } from "@features/recoleccion-datos/domain/models/editar-formulario-cliente-request.model";
import { EditarRespuestasRequestMapper } from "../mapper/editar-respuestas-request.mapper";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosDatasourceImpl implements RecoleccionDatosDatasource {

  apiService = inject(ApiService);

  getFormularioCliente(request: number): Observable<FormularioClienteResponse> {

    return this.apiService.get<ObtenerFormularioResponseDto>('evento/trabajar-evento/0').pipe(
      map((response) => ObtenerFormularioClienteResponseMapper.toModel(response, request))
    );

  }

  getEventoFormulario(): Observable<EventoFormularioResponse> {
    return this.apiService.get<ObtenerFormulariosResponseDto>('evento/trabajar-evento/0').pipe(
      map((response) => ObtenerFormulariosResponseMapper.toModel(response))
    );
  }

  guardarFormulario(formulario: FormularioClienteRequest): Observable<void> {
    const body = GuardarRespuestasRequestMapper.toDto(formulario);
    return this.apiService.post<void>(`evento/trabajar-respuesta-evento/${formulario.id}`, body);
  }

  obtenerFormularioRespuestas(id: number): Observable<ObtenerFormularioRespuestasResponse> {

    return this.apiService.get<ObtenerFormularioRespuestasResponseDto>(`evento/trabajar-respuesta-evento/${id}`).pipe(
      map((response) => ObtenerFormularioRespuestasResponseMapper.toModel(response, id))
    );
  }

  editarFormularioCliente(request: EditarFormularioClienteRequest): Observable<void> {

    const body = EditarRespuestasRequestMapper.toDto(request);

    return this.apiService.put<void>(`evento/trabajar-respuesta-evento/${request.id}`, body);
  }

}
