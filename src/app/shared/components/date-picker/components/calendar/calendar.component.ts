import { CommonModule } from '@angular/common';
import { Component, input, output, signal, SimpleChanges } from '@angular/core';
import { DayPickerComponent } from '../day-picker/day-picker.component';
import {
  MonthPickerComponent,
  MonthPickerValue,
} from '../month-picker/month-picker.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, DayPickerComponent, MonthPickerComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  value = input<Date | null>(null);

  valueChange = output<Date | null>();

  mode = signal<'day' | 'month' | 'year'>('day');

  month = signal<number>(new Date().getMonth() + 1);
  year = signal<number>(new Date().getFullYear());

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.internalValue.set(this.value()!);
    }
  }

  internalValue = signal<Date | null>(null);

  handleChangeDayPicker(value: Date | null): void {
    this.internalValue.set(value);
    this.valueChange.emit(value);
  }

  handleChangeMode(value: 'day' | 'month' | 'year') {
    this.mode.set(value);
  }

  handleChangeMonthPicker(value: MonthPickerValue) {
    this.month.set(value.month);
    this.year.set(value.year);

    this.mode.set('day');
  }
}
