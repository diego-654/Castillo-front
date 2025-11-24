

import { Injectable } from "@angular/core";
import { EventoDatasource } from "@features/evento/domain/datasources/evento.datasource";
import { FormularioEventoRequest } from "@features/evento/domain/models/formulario-evento-request.model";
import { ListarHistorialFormularioRequest } from "@features/evento/domain/models/listar-historial-formulario-request.model";
import { HistorialFormularioData, ListarHistorialFormularioResponse } from "@features/evento/domain/models/listar-historial-formulario-response.model";
import { map, Observable, timer } from "rxjs";


@Injectable({ providedIn: 'root' })
export class EventoDatasourceImpl implements EventoDatasource {

  guardarFormulario(formulario: FormularioEventoRequest): Observable<void> {
    return timer(200).pipe(
      map(() => {
        console.log('guardar formulario');
      })
    );
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
  eliminarHistorialFormulario(id: number): Observable<void> {
    return timer(1000).pipe(
      map(() => {
        console.log('eliminar historial formulario');
      })
    );
  }

  obtenerFormulario(id: number): Observable<FormularioEventoRequest> {
    return timer(200).pipe(
      map(() => ({
        id: 1,
        nombreEncuesta: 'Encuesta 1',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        lista: [
          {
            typeFormulario: 'Información Personal',
            campos: {
              lista: [
                {
                  label: 'Nombres',
                  type: 1,
                  isRequired: true,
                },
                {
                  label: 'Apellidos',
                  type: 1,
                  isRequired: true,
                },
                {
                  label: 'Edad',
                  type: 1,
                  isRequired: true,
                },
                {
                  label: 'Fecha de nacimiento',
                  type: 2,
                  isRequired: true,
                },
                {
                  label: 'Ciudad',
                  type: 1,
                  isRequired: true,
                },
                {
                  label: 'Fecha de finalizacion',
                  type: 2,
                  isRequired: true,
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
                  type: 1,
                  isRequired: true,
                },
                {
                  label: 'Número de celular',
                  type: 1,
                  isRequired: true,
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
                  type: 1,
                  isRequired: true,
                },
              ],
            },
          },
          {
            campos: {
              lista: [
                {
                  type: 1,
                  label: 'Acepto que me contacten por Whatsapp y Correo Electronico',
                  extras: 'Acepto términos y condiciones por la empresa Castillo de Chancay con la finalidad de recibir información, promociones, contenido educativo y beneficios relacionados con sus servicios, y autorizo el uso de mis datos de acuerdo a la Declaración de privacidad.',
                  isRequired: true,
                }
              ]
            }
          }
        ],
      }))
    );
  }

}
