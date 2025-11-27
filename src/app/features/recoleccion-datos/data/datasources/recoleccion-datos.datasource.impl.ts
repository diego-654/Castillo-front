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
import { ObtenerFormularioRespuestasResponseDto } from "../dto/obtener-formulario-respuestas-response.dto";
import { ObtenerFormularioRespuestasResponseMapper } from "../mapper/obtener-formulario-respuestas-response.mapper";
import { ObtenerFormularioResponseDto } from "@features/evento/data/dto/obtener-formulario-response.dto";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosDatasourceImpl implements RecoleccionDatosDatasource {

  apiService = inject(ApiService);

  getFormularioCliente(request: number): Observable<FormularioClienteResponse> {

    return this.apiService.get<ObtenerFormularioResponseDto>('evento/trabajar-evento/0').pipe(
      map((response) => ObtenerFormularioRespuestasResponseMapper.toModel(response, request))
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
    return timer(200).pipe(
      map(() => ({
        id: 1,
        lista: [
          {
            typeFormulario: 'Información Personal',
            campos: {
              lista: [
                {
                  label: 'Nombres',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                  respuesta: 'Juan Perez',
                },
                {
                  label: 'Apellidos',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                  respuesta: 'Perez',
                },
                {
                  label: 'Edad',
                  type: TipoInputType.NUMBER,
                  isRequired: true,
                  respuesta: '30',
                },
                {
                  label: 'Fecha de nacimiento',
                  type: TipoInputType.DATE,
                  isRequired: true,
                  respuesta: new Date(),
                },
                {
                  label: 'Ciudad',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                  respuesta: 'Madrid',
                },
                {
                  label: 'Fecha de finalizacion',
                  type: TipoInputType.DATE,
                  isRequired: true,
                  respuesta: new Date(),
                },
              ],
            },
          },
          {
            typeFormulario: 'Información de contacto',
            campos: {
              lista: [
                {
                  label: 'Correo electrónico',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                  respuesta: 'juanperez@gmail.com',
                },
                {
                  label: 'Número de celular',
                  type: TipoInputType.NUMBER,
                  isRequired: true,
                  respuesta: '123456789',
                },
              ],
            },
          },
          {
            typeFormulario: 'Interés en Membresía',
            campos: {
              lista: [
                {
                  label: '¿Estás interesad@ en una membresía?',
                  type: TipoInputType.BOOLEAN,
                  isRequired: true,
                  respuesta: 1,
                },
              ],
            },
          },
          {
            campos: {
              lista: [
                {
                  type: TipoInputType.BOOLEAN,
                  label: 'Acepto que me contacten por Whatsapp y Correo Electronico',
                  extras: 'Acepto términos y condiciones por la empresa Castillo de Chancay con la finalidad de recibir información, promociones, contenido educativo y beneficios relacionados con sus servicios, y autorizo el uso de mis datos de acuerdo a la Declaración de privacidad.',
                  isRequired: true,
                  respuesta: 'true',
                }
              ]
            }
          }
        ],
      }))
    );

  }

}
