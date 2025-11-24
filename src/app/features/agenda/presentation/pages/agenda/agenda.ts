import { Component } from '@angular/core';
import { WeekAgenda } from '../../components/week-agenda/week-agenda';

@Component({
  selector: 'app-agenda',
  imports: [WeekAgenda],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export default class Agenda {

}
