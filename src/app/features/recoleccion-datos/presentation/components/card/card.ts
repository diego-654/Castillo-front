import { Component, inject, input } from '@angular/core';
import { CardData } from '../../data/card-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  router = inject(Router);


  card = input.required<CardData>();

  toggleCard(card: CardData) {
    this.router.navigate([card.url]);
  }
}

