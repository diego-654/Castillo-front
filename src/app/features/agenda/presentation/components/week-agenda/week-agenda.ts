import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { AgendaRepository } from '@features/agenda/domain/repositories/agenda.repository';
import { ListaAgendaResponse } from '@features/agenda/domain/model/lista-agenda-response.model';
import { firstValueFrom } from 'rxjs';

type EventPos = {
  col: number;
  colSpan: number;
  row: number;
  rowSpan: number;
} | null;

@Component({
  selector: 'app-week-agenda',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './week-agenda.html',
  styleUrl: './week-agenda.scss',
})
export class WeekAgenda {

  agendaRepository = inject(AgendaRepository);

  // ❗ Para tus datos de prueba (17–19 noviembre 2025)
  // ponemos la fecha actual en esa semana:
  currentDate = signal<Date>(new Date(2025, 10, 17));
  // cuando pase a real, puedes volver a new Date()

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

  // Output de la semana visible (inicio/fin)
  weekChange = output<{ start: Date; end: Date }>();

  constructor() {

  }

  ngOnInit() {
    this.setWeekDates();
    this.cargarEventos();
  }

  private async cargarEventos() {
    const response = await firstValueFrom(this.agendaRepository.listarAgenda());

    // Normalizar fechas a Date (por si vienen como string)
    const normalizados = response.map(e => ({
      ...e,
      fechaInicio: new Date(e.fechaInicio),
      fechaFin: new Date(e.fechaFin),
    }));

    this.eventos.set(normalizados);
  }

  private getMonday(date: Date): Date {
    const d = new Date(date);
    const day = d.getDay(); // 0-dom, 1-lun, ...
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
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

    // 👇 avisar al padre que cambió la semana
    this.emitWeekChange();
  }


  /** Formato “09 - 15 noviembre” */
  get weekRange() {
    const w = this.weekDates();
    if (!w.length) return '';
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

  /** Calcula posición del evento en la grilla.
   *  Si el evento NO cae en la semana visible → devuelve null.
   */
  getEventPosition(evento: ListaAgendaResponse) {
    const week = this.weekDates();
    if (!week.length) return null;

    const inicio = new Date(evento.fechaInicio);
    const fin = new Date(evento.fechaFin);

    const dayStartIndex = week.findIndex(d =>
      d.toDateString() === inicio.toDateString()
    );
    const dayEndIndex = week.findIndex(d =>
      d.toDateString() === fin.toDateString()
    );

    if (dayStartIndex === -1 || dayEndIndex === -1) return null;

    const hourStart = inicio.getHours();
    const hourEnd = fin.getHours();

    const rowStart = this.hours().findIndex(h => +h.split(':')[0] === hourStart);
    const rowEnd = this.hours().findIndex(h => +h.split(':')[0] === hourEnd);

    if (rowStart === -1) return null;

    const safeRowEnd = rowEnd === -1 ? rowStart + 1 : rowEnd;

    return {
      // col 1 = horas, col 2..8 = días
      col: dayStartIndex + 2,
      colSpan: Math.max(1, (dayEndIndex - dayStartIndex) + 1),
      row: rowStart,
      rowSpan: Math.max(1, safeRowEnd - rowStart || 1),
    };
  }

  private emitWeekChange() {
    const week = this.weekDates();
    if (!week.length) return;

    // Clonamos por si acaso, para no exponer las mismas referencias mutables
    const start = new Date(week[0]);
    const end = new Date(week[6]);

    this.weekChange.emit({ start, end });
  }


}
