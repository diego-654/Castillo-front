import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { EventosFormulario } from '@features/recoleccion-datos/domain/models/evento-formulario-response.model';
import { ReportesDisponibles } from '@features/reportes/domain/models/reportes-disponibles-response.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  router = inject(Router);

  reportDisponibles = input.required<ReportesDisponibles>();

  toggleCard(card: ReportesDisponibles) {

  }
}

