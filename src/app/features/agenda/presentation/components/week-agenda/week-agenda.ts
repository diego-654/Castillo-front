import { CommonModule } from '@angular/common';
import { Component, signal, inject } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AgendaRepository } from '@features/agenda/domain/repositories/agenda.repository';
import { ListaAgendaResponse } from '@features/agenda/domain/model/lista-agenda-response.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-week-agenda',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './week-agenda.html',
  styleUrl: './week-agenda.scss',
})
export class WeekAgenda {

  agendaRepository = inject(AgendaRepository);

  currentDate = signal<Date>(new Date());

  dayNames = signal([
    'Lunes', 'Martes', 'Miércoles', 'Jueves',
    'Viernes', 'Sábado', 'Domingo'
  ]);

  hours = signal([
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00', '19:00', '20:00'
  ]);

  weekDates = signal<Date[]>([]);
  eventos = signal<ListaAgendaResponse[]>([]);

  constructor() {
    this.setWeekDates();
    this.cargarEventos();
  }

  private async cargarEventos() {
    const response = await firstValueFrom(this.agendaRepository.listarAgenda());
    this.eventos.set(response);
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  private setWeekDates() {
    const monday = this.getMonday(this.currentDate());
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      week.push(d);
    }
    this.weekDates.set(week);
  }

  /** Formato “09 – 15 Enero” */
  get weekRange() {
    const w = this.weekDates();
    const month = w[0].toLocaleString('es-ES', { month: 'long' });
    return `${w[0].getDate()} - ${w[6].getDate()} ${month}`;
  }

  semanaAnterior() {
    const d = new Date(this.currentDate());
    d.setDate(d.getDate() - 7);
    this.currentDate.set(d);
    this.setWeekDates();
  }

  semanaSiguiente() {
    const d = new Date(this.currentDate());
    d.setDate(d.getDate() + 7);
    this.currentDate.set(d);
    this.setWeekDates();
  }

  /** 🔥 FILTRA LOS EVENTOS DE UNA CELDA */
  eventosEnCelda(dayIndex: number, hour: string) {
    const dayDate = this.weekDates()[dayIndex];

    return this.eventos().filter(event => {
      const inicio = new Date(event.fechaInicio);
      const fin = new Date(event.fechaFin);

      const eventoEsEseDia =
        inicio.toDateString() === dayDate.toDateString();

      const eventoEsEsaHora =
        inicio.getHours() === Number(hour.split(':')[0]);

      return eventoEsEseDia && eventoEsEsaHora;
    });
  }

  getEventPosition(evento: ListaAgendaResponse) {
    const week = this.weekDates();

    const dayStartIndex = week.findIndex(d =>
      d.toDateString() === evento.fechaInicio.toDateString()
    );

    const dayEndIndex = week.findIndex(d =>
      d.toDateString() === evento.fechaFin.toDateString()
    );

    // Horas en formato 08:00 → 8
    const hourStart = evento.fechaInicio.getHours();
    const hourEnd = evento.fechaFin.getHours();

    const rowStart = this.hours().findIndex(h => +h.split(':')[0] === hourStart);
    const rowEnd = this.hours().findIndex(h => +h.split(':')[0] === hourEnd);

    return {
      col: dayStartIndex + 1,       // +1 porque col 0 es la columna de horas
      colSpan: (dayEndIndex - dayStartIndex) + 1,
      row: rowStart,
      rowSpan: (rowEnd - rowStart) + 1
    };
  }

}
