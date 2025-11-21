import { CommonModule } from '@angular/common';
import { Component, input, output, signal, SimpleChanges } from '@angular/core';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-month-picker',
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './month-picker.component.html',
  styleUrl: './month-picker.component.scss',
})
export class MonthPickerComponent {
  monthNames = signal<string[]>([
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]);

  value = input.required<MonthPickerValue>();
  internalValue = signal<MonthPickerValue>({
    month: 1,
    year: 1,
  });
  valueChange = output<MonthPickerValue>();

  month = input.required<number>();
  year = input.required<number>();
  monthChange = output<number>();
  yearChange = output<number>();

  internalYear = signal<number>(1);
  internalMonth = signal<number>(1);

  onYearClick = output<void>();

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
  }

  goToPreviusYear() {
    this.internalYear.update((y) => y! - 1);
  }

  goToNextYear() {
    this.internalYear.update((y) => y! + 1);
  }

  selectMonth(month: number) {
    this.internalMonth.set(month);
    this.valueChange.emit({
      month: this.internalMonth(),
      year: this.internalYear(),
    });
  }
}

export interface MonthPickerValue {
  month: number;
  year: number;
}
