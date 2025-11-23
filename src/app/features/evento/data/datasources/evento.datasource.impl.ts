

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

        for (let i = 0; i < 10; i++) {
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

}
