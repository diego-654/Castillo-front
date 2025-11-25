import { Injectable } from '@angular/core';
import { MantenimientoDatasource } from '@features/mantenimiento/domain/datasources/mantenimiento.datasource';
import { CrearAliadoRequest } from '@features/mantenimiento/domain/models/crear-aliado-request.model';
import { CrearConcesionarioRequest } from '@features/mantenimiento/domain/models/crear-concesionario-request.model';
import { ListarAliadoRequest } from '@features/mantenimiento/domain/models/listar-aliado-request.model';
import { AliadoData, ListarAliadoResponse } from '@features/mantenimiento/domain/models/listar-aliado-response.model';
import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { ListarConcesionarioRequest } from '@features/mantenimiento/domain/models/listar-concesionario-request.model';
import { ListarConcesionarioResponse, ConcesionarioData } from '@features/mantenimiento/domain/models/listar-concesionario-response.model';
import { map, Observable, timer } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class MantenimientoDatasourceImpl implements MantenimientoDatasource {

  listarBeneficios(): Observable<ListarBeneficiosResponse> {
    return timer(200).pipe(
      map((): ListarBeneficiosResponse => {
        return {
          beneficios: [
            {
              id: 1,
              idBeneficioGeneral: 1, // 👉 pertenece a “Beneficios”
              nombreBeneficio: 'Ingreso Libre (titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
                { id: 2, nombreMembresia: '1 vez al mes', valor: true },   // Real
                { id: 3, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
                { id: 4, nombreMembresia: '1 vez al mes', valor: true },   // Real
              ],
            },
            {
              id: 2,
              idBeneficioGeneral: 1, // 👉 también al bloque 1
              nombreBeneficio: 'Ingreso libre para invitados',
              membresia: [
                { id: 1, nombreMembresia: '1 vez al mes', valor: true },   // Medieval
              ],
            },

            // 👇 Beneficios del bloque 2
            {
              id: 3,
              idBeneficioGeneral: 2, // 👉 pertenece a “Beneficios 2”
              nombreBeneficio: 'Descuento en tiendas',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
            {
              id: 4,
              idBeneficioGeneral: 1, // 👉 también al bloque 2
              nombreBeneficio: 'Ingreso Libre (titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
            {
              id: 5,
              idBeneficioGeneral: 1, // 👉 también al bloque 2
              nombreBeneficio: 'Piscina(Titular + beneficiarios)',
              membresia: [
                { id: 1, nombreMembresia: '10% de descuento', valor: true }, // Medieval
              ],
            },
          ],

          datosBeneficioMembresia: [
            {
              id: 1,
              nombreBeneficio: 'Beneficios',       // Bloque general 1
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                { id: 1, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
                { id: 2, nombreMembresia: 'Real', tipoMembresia: 'Membresía' },
                { id: 3, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
                { id: 4, nombreMembresia: 'Real', tipoMembresia: 'Membresía' },
              ],
            },
            {
              id: 2,
              nombreBeneficio: 'Beneficios 2',     // Bloque general 2
              tipoBeneficio: 'Parque Temático',
              datosMembresia: [
                { id: 1, nombreMembresia: 'Medieval', tipoMembresia: 'Membresía' },
              ],
            }
          ],
        };
      })
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
}
