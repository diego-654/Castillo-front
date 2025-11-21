

import { Injectable } from "@angular/core";
import { EventoDatasource } from "@features/evento/domain/datasources/evento.datasource";
import { EventoRepository } from "@features/evento/domain/repositories/evento.repository";
import { Observable } from "rxjs";
import { FormularioEventoRequest } from "@features/evento/domain/models/formulario-evento-request.model";

@Injectable({ providedIn: 'root' })
export class EventoRepositoryImpl implements EventoRepository {

  constructor(private dataSource: EventoDatasource) {
  }

  guardarFormulario(formulario: FormularioEventoRequest): Observable<void> {
    return this.dataSource.guardarFormulario(formulario);
  }

}
