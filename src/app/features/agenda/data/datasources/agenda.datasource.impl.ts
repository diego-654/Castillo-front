import { Injectable } from "@angular/core";
import { AgendaDatasource } from "@features/agenda/domain/datasources/agenda.datasource";
import { ListaAgendaResponse } from "@features/agenda/domain/model/lista-agenda-response.model";
import { map, Observable, timer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AgendaDatasourceImpl implements AgendaDatasource {

  listarAgenda(): Observable<ListaAgendaResponse[]> {
    return timer(200).pipe(
      map((): ListaAgendaResponse[] => {
        return [
          {
            id: 1,
            // Lunes 17 Nov — 08:00–10:00
            fechaInicio: new Date(2025, 10, 17, 8),
            fechaFin: new Date(2025, 10, 18, 10),
            nombre: 'Reunión de planificación',
            img: 'assets/icons/calendar/agenda-1.svg',
          },
          {
            id: 2,
            // Lunes 17 Nov — 15:00–16:00
            fechaInicio: new Date(2025, 10, 18, 15),
            fechaFin: new Date(2025, 10, 19, 16),
            nombre: 'Llamada con cliente',
            img: 'assets/icons/calendar/agenda-2.svg',
          },

        ];
      })
    );
  }

}
