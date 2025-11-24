import { Component, signal } from '@angular/core';
import { WeekAgenda } from '../../components/week-agenda/week-agenda';
import { CalendarComponent } from '@shared/components/date-picker/components/calendar/calendar.component';
import { DayPickerComponent } from '@shared/components/date-picker/components/day-picker/day-picker.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-agenda',
  imports: [WeekAgenda, CalendarComponent, DayPickerComponent, CommonModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export default class Agenda {


  start = signal<Date | null>(null);
  end = signal<Date | null>(null);
  value = signal<Date>(new Date());
  month = signal<number>(new Date().getMonth() + 1);
  year = signal<number>(new Date().getFullYear());

  onWeekChange(week: { start: Date; end: Date }) {

    this.start.set(week.start);
    this.end.set(week.end);
  }

}
