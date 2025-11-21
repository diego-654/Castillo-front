import { Injectable } from "@angular/core";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { FormularioClienteResponse } from "@features/recoleccion-datos/domain/models/formulario-cliente-response.model";
import { map, Observable, timer } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosDatasourceImpl implements RecoleccionDatosDatasource {


  getFormularioCliente(): Observable<FormularioClienteResponse> {
    return timer(1000).pipe(
      map(() => ({
        id: 1,
        lista: [
          {
            typeFormulario: 'Información Personal',
            campos: {
              lista: [
                {
                  nombre: 'Nombres',
                  type: 'text',
                },
                {
                  nombre: 'Apellidos',
                  type: 'text',
                },
                {
                  nombre: 'Edad',
                  type: 'number',
                },
                {
                  nombre: 'Fecha de nacimiento',
                  type: 'date',
                },
                {
                  nombre: 'Ciudad',
                  type: 'text',
                }
              ],
            },
          },
          {
            typeFormulario: 'Información de contacto',
            campos: {
              lista: [
                {
                  nombre: 'Correo electrónico',
                  type: 'email',
                },
                {
                  nombre: 'Número de celular',
                  type: 'tel',
                },
              ],
            },
          },
          {
            typeFormulario: 'Interés de Membresía',
            campos: {
              lista: [
                {
                  nombre: '¿Estás interesad@ en una membresía?',
                  type: 'select',
                  optionsSelect: [
                    {
                      id: 1,
                      nombre: 'Si',
                    },
                    {
                      id: 2,
                      nombre: 'No',
                    },
                  ],
                }
              ]
            }
          },
        ],
      }))
    );
  }
}
