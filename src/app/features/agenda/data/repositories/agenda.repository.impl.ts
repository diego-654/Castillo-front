


import { Injectable } from "@angular/core";
import { AgendaDatasource } from "@features/agenda/domain/datasources/agenda.datasource";
import { AgendaRepository } from "@features/agenda/domain/repositories/agenda.repository";
import { Observable } from "rxjs";
import { ListaAgendaResponse } from "@features/agenda/domain/model/lista-agenda-response.model";

@Injectable({ providedIn: 'root' })
export class AgendaRepositoryImpl implements AgendaRepository {

  constructor(private dataSource: AgendaDatasource) {
  }

  listarAgenda(): Observable<ListaAgendaResponse[]> {
    return this.dataSource.listarAgenda();
  }

}
