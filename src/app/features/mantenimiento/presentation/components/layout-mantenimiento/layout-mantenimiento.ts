import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-layout-mantenimiento',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout-mantenimiento.html',
  styleUrl: './layout-mantenimiento.scss',
})
export default class LayoutMantenimiento {
  router = inject(Router);
  tabs = signal([
    {
      label: 'Membresias',
      route: '/mantenimiento/membresias',
      icon: 'credit-card.svg',
    },
    {
      label: 'Aliados',
      route: '/mantenimiento/aliados',
      icon: 'user-group.svg',
    },
    {
      label: 'Concesionarios',
      route: '/mantenimiento/concesionarios',
      icon: 'box.svg',
    },

  ]);
}
