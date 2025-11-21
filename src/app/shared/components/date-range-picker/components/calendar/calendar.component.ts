import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  Pipe,
  PipeTransform,
  signal,
  SimpleChanges,
} from '@angular/core';

@Pipe({ name: 'twoDigit', standalone: true })
export class TwoDigitPipe implements PipeTransform {
  transform(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, TwoDigitPipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  @Input() value: Date | null = null;

  @Output() valueChange = new EventEmitter<Date | null>();

  month = signal<number | null>(null);
  year = signal<number | null>(null);

  // month = signal<number | null>(new Date().getMonth() + 1);
  // year = signal<number | null>(new Date().getFullYear());

  days: Day[] = [];
  diaSeleccionado = signal<Date | null>(null);

  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.setMonthAndYear();
      this.generateCalendar();

      this.diaSeleccionado.set(this.value);
    }
  }

  /**
   * Establece los valores de mes y año según la fecha actual o un valor proporcionado.
   *
   * - Si tanto el mes como el año son nulos y no hay ningún valor, se inicializan
   * el mes y el año con la fecha actual.
   * - Si se proporciona un valor, se extraen el mes y el año del valor
   * y se establecen según corresponda.
   *
   * @remarks
   * El mes se establece con un índice basado en 1 (p. ej., enero es 1, diciembre es 12).
   */
  setMonthAndYear() {
    if (this.month() === null && this.year() === null && !this.value) {
      this.month.set(new Date().getMonth() + 1);
      this.year.set(new Date().getFullYear());
      return;
    }

    if (this.value) {
      this.month.set(this.value.getMonth() + 1);
      this.year.set(this.value.getFullYear());
    }
  }

  generateCalendar() {
    if (!this.month() || !this.year()) return;
    const adjustedMonth = this.month()! - 1;
    const firstDay = new Date(this.year()!, adjustedMonth, 1).getDay();
    const lastDate = new Date(this.year()!, adjustedMonth + 1, 0).getDate();
    const prevMonthLastDate = new Date(
      this.year()!,
      adjustedMonth,
      0
    ).getDate();

    this.days = [];

    // Días del mes anterior
    for (let i = 0; i < firstDay; i++) {
      const date = new Date(
        this.year()!,
        adjustedMonth - 1,
        prevMonthLastDate - (firstDay - 1 - i)
      );
      this.days.push({
        date,
        isToday: false,
        prevOrNext: 'prev',
        firstNext: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(this.year()!, adjustedMonth, i);
      const today = new Date();
      this.days.push({
        date,
        isToday: date.toDateString() === today.toDateString(),
        prevOrNext: null,
        firstNext: false,
      });
    }

    // Días del mes siguiente
    let firstNext = true;
    let nextMonthDay = 1;
    while (this.days.length % 7 !== 0) {
      const date = new Date(this.year()!, adjustedMonth + 1, nextMonthDay++);
      this.days.push({
        date,
        isToday: false,
        prevOrNext: 'next',
        firstNext,
      });
      firstNext = false;
    }
  }

  toggleDay(dia: Day) {
    const selected = dia.date;
    if (
      this.diaSeleccionado() &&
      this.diaSeleccionado()!.toDateString() === selected.toDateString()
    ) {
      this.diaSeleccionado.set(null);
      this.valueChange.emit(null);
    } else {
      this.diaSeleccionado.set(selected);
      this.valueChange.emit(selected);
    }
  }

  mesYanio = computed(() => {
    if (!this.month() || !this.year()) return '';
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    return `${meses[this.month()! - 1]} ${this.year()}`;
  });

  goToPreviusMonth() {
    if (this.month() === null || this.year() === null) return;
    if (this.month() === 1) {
      this.year.update((y) => y! - 1);
      this.month.set(12);
    } else {
      this.month.update((m) => m! - 1);
    }
    this.generateCalendar();
  }

  goToNextMonth() {
    if (this.month() === null || this.year() === null) return;

    if (this.month() === 12) {
      this.year.update((y) => y! + 1);
      this.month.set(1);
    } else {
      this.month.update((m) => m! + 1);
    }
    this.generateCalendar();
  }
}

interface Day {
  date: Date;
  isToday: boolean;
  prevOrNext: 'prev' | 'next' | null;
  firstNext: boolean;
}
