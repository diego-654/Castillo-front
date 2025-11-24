import { Component, inject, signal } from '@angular/core';
import { WeekAgenda } from '../../components/week-agenda/week-agenda';
import { DayPickerComponent } from '@shared/components/date-picker/components/day-picker/day-picker.component';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ProximosEvento } from '@features/agenda/domain/model/listar-proximos-eventos.response';
import { AgendaRepository } from '@features/agenda/domain/repositories/agenda.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { Cumpleanio } from '@features/agenda/domain/model/listar-proximos-cumpleanios-response.model';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PreReserva } from '@features/agenda/domain/model/listar-pre-reservas.response.model';
import { Reserva } from '@features/agenda/domain/model/listar-reservas.response.model';

@Component({
  selector: 'app-agenda',
  imports: [WeekAgenda, ButtonComponent, DayPickerComponent, CommonModule],
  templateUrl: './agenda.html',
  styleUrl: './agenda.scss',
})
export default class Agenda {

  //!! DATOS DEL DAY PICKER
  start = signal<Date | null>(null);
  end = signal<Date | null>(null);
  value = signal<Date>(new Date());
  month = signal<number>(new Date().getMonth() + 1);
  year = signal<number>(new Date().getFullYear());

  //!! INJECS
  agendaRepository = inject(AgendaRepository);
  utilService = inject(UtilService);
  router = inject(Router);

  //!! DATOS DE LA LISTA DE EVENTOS
  listaProximosEventos = signal<ProximosEvento[]>([]);
  listaProximosCumpleanios = signal<Cumpleanio[]>([]);
  listaPreReservas = signal<PreReserva[]>([]);
  listaReservas = signal<Reserva[]>([]);

  //! TABS
  selectedTabIndex = signal<number>(0);
  tabs = signal([
    {
      label: 'Pre-Reserva',
      index: 0,
      icon: 'pre-reserva.svg',
    },
    {
      label: 'Reserva',
      index: 1,
      icon: 'reserva.svg',
    }
  ]);

  ngOnInit() {
    this.cargarEventos();
    this.cargarCumpleanios();
    this.cargarPreReservas();
    this.cargarReservas();
  }

  async cargarEventos() {
    this.utilService.showLoader();
    const res = await firstValueFrom(
      this.agendaRepository.listarEventos()
    );
    this.listaProximosEventos.set(res.proximosEventos);
    this.utilService.dismissLoader();
  }

  async cargarCumpleanios() {
    this.utilService.showLoader();
    const res = await firstValueFrom(
      this.agendaRepository.listarCumpleanios()
    );
    this.listaProximosCumpleanios.set(res.cumpleanios);
    this.utilService.dismissLoader();
  }
  async cargarPreReservas() {
    this.utilService.showLoader();
    const res = await firstValueFrom(
      this.agendaRepository.listarPreReservas()
    );
    this.listaPreReservas.set(res.preReservas);
    this.utilService.dismissLoader();
  }

  async cargarReservas() {
    this.utilService.showLoader();
    const res = await firstValueFrom(
      this.agendaRepository.listarReservas()
    );
    this.listaReservas.set(res.reservas);
    this.utilService.dismissLoader();
  }


  onWeekChange(week: { start: Date; end: Date }) {

    this.start.set(week.start);
    this.end.set(week.end);
  }

}
