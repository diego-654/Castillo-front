import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { EventosFormulario } from '@features/recoleccion-datos/domain/models/evento-formulario-response.model';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  router = inject(Router);

  eventoFormulario = input.required<EventosFormulario>();

  toggleCard(card: EventosFormulario) {
    this.router.navigate(['recoleccion-datos/formulario', card.id]);
  }
}

