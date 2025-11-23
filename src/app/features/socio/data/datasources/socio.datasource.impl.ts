

import { Injectable } from "@angular/core";
import { SocioDatasource } from "@features/socio/domain/datasources/socio.datasource";
import { CrearMiembroRequest } from "@features/socio/domain/models/crear-miembro.request.model";
import { ListaMiembrosActivosRequest } from "@features/socio/domain/models/lista-miembros-activos-request.model";
import { ListaMiembrosActivos, ListaMiembrosActivosResponse } from "@features/socio/domain/models/lista-miembros-activos-response.model";
import { ListarMembresiasResponse } from "@features/socio/domain/models/listar-membresias-response.model";
import { ObtenerDatosMembresiaResponse } from "@features/socio/domain/models/obtener-datos-membresia.response";
import { ObtenerDatosMiembroResponse } from "@features/socio/domain/models/obtener-datos-miembro.response.model";
import { ObtenerDatosPagosResponse } from "@features/socio/domain/models/obtener-datos-pagos.respone";
import { map, Observable, timer } from "rxjs";


@Injectable({ providedIn: 'root' })
export class SocioDatasourceImpl implements SocioDatasource {

  listaMiembrosActivos(request: ListaMiembrosActivosRequest): Observable<ListaMiembrosActivosResponse> {
    return timer(200).pipe(
      map(() => {
        const lista: ListaMiembrosActivos[] = [];
        const count = 10;
        for (let i = 1; i <= count; i++) {
          lista.push({
            id: i,
            estado: 'Activo',
            estadoId: 1,
            nombre: `Juan ${i}`,
            apellidos: 'Perez',
            email: `juan${i}@gmail.com`,
            celular: `12345678${i}`,
            membresia: 'Premium',
            fechaInicio: '14/02/2024',
          });
        }
        return { lista };
      })
    );
  }

  crearMiembro(request: CrearMiembroRequest): Observable<void> {
    return timer(200).pipe(
      map(() => {
        console.log("crear miembro", request);
      })
    );
  }

  listarMembresias(): Observable<ListarMembresiasResponse> {
    return timer(200).pipe(
      map(() => ({
        lista: [
          {
            id: 1,
            nombre: 'Premium',
          },
          {
            id: 2,
            nombre: 'Basic',
          },
          {
            id: 3,
            nombre: 'VIP',
          },
        ],
      }))
    );
  }

  obtenerDatosMiembro( request: number): Observable<ObtenerDatosMiembroResponse> {
    return timer(200).pipe(
      map(() => ({
        id: 1,

        //info personal
        nombre: 'Juan Perez',
        apellidos: 'Perez',
        fechaNacimiento: '31/11/1990',
        edad: 30,
        estadoCivil: 'Soltero',

        //info de contacto
        email: 'juanperez@gmail.com',
        celular: '123456789',
        direccion: 'Av. de la Constitución, 100',

        //lista beneficios
        listaBeneficios: [
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
        ],

        //lista invitados
        listaInvitados: [
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
          {
            nombreApellido: 'Juan Perez',
            dni: '123456789',
            parentesco: 'Soltero',
          },
        ],
      }))
    );
  }

  obtenerDatosMembresia( request: number): Observable<ObtenerDatosMembresiaResponse> {
    return timer(200).pipe(
      map(() => ({
        id: 1,
        tipoPlan: 'Medieval',
        montoMensual: 1000,
        fechaInicio: '31/12/2022',
        fechaVencimiento: '31/12/2022',
        renovacionAutomatica: true,
      }))
    );
  }

  obtenerDatosPagos( request: number): Observable<ObtenerDatosPagosResponse> {
    return timer(200).pipe(
      map(() => ({
        id: 1,
        plan: 'Medieval',
        monto: 1000,
        proximoPago: '31/12/2022',
        historialPagos: [
          {
            id: 1,
            fecha: '31/12/2022',
            descripcion: 'Pago de la membresia',
            formaPago: 'Efectivo',
            total: 1000,
          },
          {
            id: 2,
            fecha: '31/12/2022',
            descripcion: 'Pago de la membresia',
            formaPago: 'Efectivo',
            total: 1000,
          },
        ],
      }))
    );
  }
}
