import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  input,
  output,
  signal,
  SimpleChanges
} from '@angular/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { TwoDigitPipe } from '../../pipes/two-digits.pipe';

@Component({
  selector: 'app-day-picker',
  imports: [CommonModule, TwoDigitPipe, SvgIconComponent],
  templateUrl: './day-picker.component.html',
  styleUrl: './day-picker.component.scss',
})
export class DayPickerComponent {
  value = input.required<Date | null>();
  month = input.required<number>();
  year = input.required<number>();

  valueChange = output<Date | null>();
  monthChange = output<number>();
  yearChange = output<number>();

  onMonthClick = output<void>();

  internalMonth = signal<number>(1);
  internalYear = signal<number>(1);

  internalValue = signal<Date | null>(null);

  weekDays = ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

  // 👇 NUEVOS INPUTS PARA EL RANGO
  rangeStart = input<Date | null>(null);
  rangeEnd = input<Date | null>(null);


  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.internalValue.set(this.value());
    }
    if (changes['month']) {
      this.internalMonth.set(this.month());
    }
    if (changes['year']) {
      this.internalYear.set(this.year());
    }

    // 👇 NUEVO: si cambia el rango inicial, muevo el mes/año del calendario
    if (changes['rangeStart'] && this.rangeStart()) {
      const d = this.rangeStart()!;
      this.internalMonth.set(d.getMonth() + 1);
      this.internalYear.set(d.getFullYear());
    }
  }


  get days(): Day[] {
    const adjustedMonth = this.internalMonth() - 1;
    const firstDay = new Date(this.internalYear(), adjustedMonth, 1).getDay();
    const lastDate = new Date(
      this.internalYear(),
      adjustedMonth + 1,
      0
    ).getDate();
    const prevMonthLastDate = new Date(
      this.internalYear(),
      adjustedMonth,
      0
    ).getDate();

    const days: Day[] = [];

    // Días del mes anterior
    for (let i = 0; i < firstDay; i++) {
      const date = new Date(
        this.internalYear(),
        adjustedMonth - 1,
        prevMonthLastDate - (firstDay - 1 - i)
      );
      days.push({
        date,
        isToday: false,
        prevOrNext: 'prev',
      });
    }

    // Días del mes actual
    for (let i = 1; i <= lastDate; i++) {
      const date = new Date(this.internalYear(), adjustedMonth, i);
      const today = new Date();
      days.push({
        date,
        isToday: date.toDateString() === today.toDateString(),
        prevOrNext: null,
      });
    }

    // Días del mes siguiente
    let nextMonthDay = 1;
    while (days.length % 7 !== 0) {
      const date = new Date(
        this.internalYear(),
        adjustedMonth + 1,
        nextMonthDay++
      );
      days.push({
        date,
        isToday: false,
        prevOrNext: 'next',
      });
    }

    return days;
  }

  private sameDate(a: Date | null | undefined, b: Date | null | undefined): boolean {
    if (!a || !b) return false;
    return a.toDateString() === b.toDateString();
  }

  isInRange(date: Date): boolean {
    const start = this.rangeStart();
    const end = this.rangeEnd();
    if (!start || !end) return false;

    // Normalizar a medianoche para evitar problemas de horas
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const s = new Date(start);
    s.setHours(0, 0, 0, 0);
    const e = new Date(end);
    e.setHours(0, 0, 0, 0);

    return d >= s && d <= e;
  }

  isRangeStart(date: Date): boolean {
    return this.sameDate(date, this.rangeStart());
  }

  isRangeEnd(date: Date): boolean {
    return this.sameDate(date, this.rangeEnd());
  }


  toggleDay(dia: Day) {
    const selected = dia.date;
    if (
      this.internalValue() &&
      this.internalValue()!.toDateString() === selected.toDateString()
    ) {
      this.internalValue.set(null);
      this.valueChange.emit(null);
    } else {
      this.internalValue.set(selected);
      this.valueChange.emit(selected);
    }
  }

  mesYanio = computed(() => {
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
    return `${meses[this.internalMonth() - 1]} ${this.internalYear()}`;
  });

  goToPreviusMonth() {
    if (this.internalMonth() === 1) {
      this.internalYear.update((y) => y - 1);
      this.internalMonth.set(12);
    } else {
      this.internalMonth.update((m) => m - 1);
    }
    this.monthChange.emit(this.internalMonth());
  }

  goToNextMonth() {
    if (this.internalMonth() === 12) {
      this.internalYear.update((y) => y + 1);
      this.internalMonth.set(1);
    } else {
      this.internalMonth.update((m) => m + 1);
    }
    this.monthChange.emit(this.internalMonth());
  }

  handleMonthClick() {
    this.onMonthClick.emit();
  }
}

interface Day {
  date: Date;
  isToday: boolean;
  prevOrNext: 'prev' | 'next' | null;
}
