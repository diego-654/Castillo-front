import { Injectable } from '@angular/core';
import { InteresadosDataSource } from '@features/interesados/domain/datasources/interesados.datasource';
import { ListarInteresadosRequest } from '@features/interesados/domain/models/listar-interesados-request.model';
import {
  InteresadoData,
  ListarInteresadosResponse,
} from '@features/interesados/domain/models/listar-interesados-response.model';
import { map, Observable, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InteresadosDataSourcesImp implements InteresadosDataSource {
  listarInteresados(request: ListarInteresadosRequest): Observable<ListarInteresadosResponse> {

    return timer(1000).pipe(
      map((): ListarInteresadosResponse => {
        const lista: InteresadoData[] = [];

        for (let i = 1; i < 10; i++) {
          lista.push({
            id: i,
            nombre: 'Nombre ' + i,
            telefono: '95000000' + i,
            trabajador: 'Trabajador ' + i,
            fecharegistro: '2025-01-0' + i,
            evento: 'Evento ' + i,
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
  eliminarInteresado(id: number): Observable<void> {
    return timer(1000).pipe(
      map(() => {
        console.log('eliminar interesado');
      })
    );
  }
}
