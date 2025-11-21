import { Injectable } from "@angular/core";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";
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
                  nombre: 'Nombres',
                  type: TipoInputType.TEXT,
                },
                {
                  nombre: 'Apellidos',
                  type: TipoInputType.TEXT,
                },
                {
                  nombre: 'Edad',
                  type: TipoInputType.NUMBER,
                },
                {
                  nombre: 'Fecha de nacimiento',
                  type: TipoInputType.DATE,
                },
                {
                  nombre: 'Ciudad',
                  type: TipoInputType.TEXT,
                },
                {
                  nombre: 'Fecha de finalizacion',
                  type: TipoInputType.DATE,
                },
              ],
            },
          },
          {
            typeFormulario: 'Información de contacto',
            campos: {
              lista: [
                {
                  nombre: 'Correo electrónico',
                  type: TipoInputType.TEXT,
                },
                {
                  nombre: 'Número de celular',
                  type: TipoInputType.NUMBER,
                },
              ],
            },
          },

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

}
