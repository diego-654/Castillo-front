


import { Observable } from "rxjs";
import { ListaAgendaResponse } from "../model/lista-agenda-response.model";
import { ListarProximosEventosResponse } from "../model/listar-proximos-eventos.response";
import { ListarProximosCumpleaniosResponse } from "../model/listar-proximos-cumpleanios-response.model";
import { ListarPreReservasResponse } from "../model/listar-pre-reservas.response.model";
import { ListarReservasResponse } from "../model/listar-reservas.response.model";

export abstract class AgendaDatasource {

  abstract listarAgenda(): Observable<ListaAgendaResponse[]>;
  abstract listarEventos(): Observable<ListarProximosEventosResponse>;
  abstract listarCumpleanios(): Observable<ListarProximosCumpleaniosResponse>;
  abstract listarPreReservas(): Observable<ListarPreReservasResponse>;
  abstract listarReservas(): Observable<ListarReservasResponse>;
}
