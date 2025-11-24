


import { Injectable } from "@angular/core";
import { AgendaDatasource } from "@features/agenda/domain/datasources/agenda.datasource";
import { AgendaRepository } from "@features/agenda/domain/repositories/agenda.repository";
import { Observable } from "rxjs";
import { ListaAgendaResponse } from "@features/agenda/domain/model/lista-agenda-response.model";
import { ListarProximosEventosResponse } from "@features/agenda/domain/model/listar-proximos-eventos.response";
import { ListarProximosCumpleaniosResponse } from "@features/agenda/domain/model/listar-proximos-cumpleanios-response.model";
import { ListarPreReservasResponse } from "@features/agenda/domain/model/listar-pre-reservas.response.model";
import { ListarReservasResponse } from "@features/agenda/domain/model/listar-reservas.response.model";

@Injectable({ providedIn: 'root' })
export class AgendaRepositoryImpl implements AgendaRepository {

  constructor(private dataSource: AgendaDatasource) {
  }

  listarAgenda(): Observable<ListaAgendaResponse[]> {
    return this.dataSource.listarAgenda();
  }

  listarEventos(): Observable<ListarProximosEventosResponse> {
    return this.dataSource.listarEventos();
  }

  listarCumpleanios(): Observable<ListarProximosCumpleaniosResponse> {
    return this.dataSource.listarCumpleanios();
  }
  listarPreReservas(): Observable<ListarPreReservasResponse> {
    return this.dataSource.listarPreReservas();
  }

  listarReservas(): Observable<ListarReservasResponse> {
    return this.dataSource.listarReservas();
  }

}
