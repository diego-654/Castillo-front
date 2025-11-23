

import { Injectable } from "@angular/core";
import { SocioDatasource } from "@features/socio/domain/datasources/socio.datasource";
import { ListaMiembrosActivosRequest } from "@features/socio/domain/models/lista-miembros-activos-request.model";
import { ListaMiembrosActivos, ListaMiembrosActivosResponse } from "@features/socio/domain/models/lista-miembros-activos-response.model";
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

}
