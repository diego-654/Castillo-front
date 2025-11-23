import { Injectable } from "@angular/core";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";
import { FormularioClienteRequest } from "@features/recoleccion-datos/domain/models/formulario-cliente-request.model";
import { FormularioClienteResponse, TipoInputType } from "@features/recoleccion-datos/domain/models/formulario-cliente-response.model";
import { map, Observable, timer } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosDatasourceImpl implements RecoleccionDatosDatasource {


  getFormularioCliente(): Observable<FormularioClienteResponse> {
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
                },
                {
                  label: 'Apellidos',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                },
                {
                  label: 'Edad',
                  type: TipoInputType.NUMBER,
                  isRequired: true,
                },
                {
                  label: 'Fecha de nacimiento',
                  type: TipoInputType.DATE,
                  isRequired: true,
                },
                {
                  label: 'Ciudad',
                  type: TipoInputType.TEXT,
                  isRequired: true,
                },
                {
                  label: 'Fecha de finalizacion',
                  type: TipoInputType.DATE,
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
                  type: TipoInputType.TEXT,
                  isRequired: true,
                },
                {
                  label: 'Número de celular',
                  type: TipoInputType.NUMBER,
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
                  type: TipoInputType.BOOLEAN,
                  isRequired: true,
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
                }
              ]
            }
          }
        ],
      }))
    );
  }


  getEventoFormulario(): Observable<EventoFormularioResponse> {
    return timer(200).pipe(
      map(() => ({
        listaEventos: [
          {
            id: 1,
            nombre: 'Feria Congreso 2025 -Noviembre',
          },
          {
            id: 2,
            nombre: 'Feria Costa Verde 2025 -Noviembre',
          },
          {
            id: 3,
            nombre: 'Feria Hotel R & R 2025-Noviembre',
          },
        ],
      }))
    );
  }


  guardarFormulario(formulario: FormularioClienteRequest): Observable<void> {
    return timer(200).pipe(
      map(() => {
        console.log("guardar formulario", formulario);
      })
    );
  }

}
