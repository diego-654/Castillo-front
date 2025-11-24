


import { Observable } from "rxjs";
import { ListaAgendaResponse } from "../model/lista-agenda-response.model";

export abstract class AgendaRepository {

  abstract listarAgenda(): Observable<ListaAgendaResponse[]>;
}
