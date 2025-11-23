import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-evento',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-evento.html',
  styleUrl: './layout-evento.scss',
})
export default class LayoutEvento {
  router = inject(Router);


  tabs = signal([
    {
      label: 'Formulario',
      route: '/eventos/formulario',
      icon: 'credit-card.svg',
    },
    {
      label: 'Historial',
      route: '/eventos/historial',
      icon: 'credit-card.svg',
    },
  ]);
}
