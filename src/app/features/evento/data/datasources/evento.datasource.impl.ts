

import { Injectable } from "@angular/core";
import { EventoDatasource } from "@features/evento/domain/datasources/evento.datasource";
import { FormularioEventoRequest } from "@features/evento/domain/models/formulario-evento-request.model";
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

}
