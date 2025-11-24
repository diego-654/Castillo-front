import { Injectable } from "@angular/core";
import { AgendaDatasource } from "@features/agenda/domain/datasources/agenda.datasource";
import { ListaAgendaResponse } from "@features/agenda/domain/model/lista-agenda-response.model";
import { ListarPreReservasResponse } from "@features/agenda/domain/model/listar-pre-reservas.response.model";
import { ListarProximosCumpleaniosResponse } from "@features/agenda/domain/model/listar-proximos-cumpleanios-response.model";
import { ListarProximosEventosResponse } from "@features/agenda/domain/model/listar-proximos-eventos.response";
import { ListarReservasResponse } from "@features/agenda/domain/model/listar-reservas.response.model";
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
            img: 'assets/images/uxui.png',
          },
          {
            id: 2,
            // Lunes 17 Nov — 15:00–16:00
            fechaInicio: new Date(2025, 10, 18, 15),
            fechaFin: new Date(2025, 10, 18, 19),
            nombre: 'Llamada con cliente',
            img: 'assets/images/zoom.png',
          },

        ];
      })
    );
  }

  listarEventos(): Observable<ListarProximosEventosResponse> {
    return timer(200).pipe(
      map((): ListarProximosEventosResponse => {
        return {
          proximosEventos: [
            {
              id: 1,
              img: 'assets/images/zoom.png',
              nombre: 'Reunión Zoom',
              horaOrFecha: '10:40 am',
              tipo: 'Evento',
            },
            {
              id: 2,
              img: 'assets/images/uxui.png',
              nombre: 'Presentación UX/UI',
              horaOrFecha: '14:10 pm',
              tipo: 'Evento',
            },
            {
              id: 3,
              img: 'assets/images/pago.png',
              nombre: 'Pago de Juan Perez',
              horaOrFecha: '20 Nov',
              tipo: 'Membresía',
            }
          ],
        };
      })
    );
  }

  listarCumpleanios(): Observable<ListarProximosCumpleaniosResponse> {
    return timer(200).pipe(
      map((): ListarProximosCumpleaniosResponse => {
        return {
          cumpleanios: [
            {
              id: 1,
              img: 'assets/images/pastel.png',
              nombre: 'Juan Carlos Quispe',
              fecha: '18/11/2025',
            },
            {
              id: 2,
              img: 'assets/images/pastel.png',
              nombre: 'Juan Carlos Quispe',
              fecha: '18/11/2025',
            },
            {
              id: 3,
              img: 'assets/images/pastel.png',
              nombre: 'Juan Carlos Quispe',
              fecha: '18/11/2025',
            },
          ],
        };
      })
    );
  }

  listarPreReservas(): Observable<ListarPreReservasResponse> {
    return timer(200).pipe(
      map((): ListarPreReservasResponse => {
        return {
          preReservas: [
            {
              id: 1,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
            {
              id: 2,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
            {
              id: 3,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
          ],
        };
      })
    );
  }

  listarReservas(): Observable<ListarReservasResponse> {
    return timer(200).pipe(
      map((): ListarReservasResponse => {
        return {
          reservas: [
            {
              id: 1,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
            {
              id: 2,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
            {
              id: 3,
              nombre: 'Juan Carlos Quispe',
              fechaInicio: '18/11/2025',
              fechaFin: '18/11/2025',
              fechaConfirmacion: '18/11/2025',
            },
          ],
        };
      })
    );
  }
}
