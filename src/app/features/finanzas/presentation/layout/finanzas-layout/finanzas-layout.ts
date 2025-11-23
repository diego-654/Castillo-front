import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-finanzas-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './finanzas-layout.html',
  styleUrl: './finanzas-layout.scss',
})
export class FinanzasLayout {
  router = inject(Router);
  tabs = signal([
    {
      label: 'Notificaciones',
      route: '/finanzas/notificaciones',
      icon: 'notification.svg',
    },
    {
      label: 'Facturación',
      route: '/finanzas/facturacion',
      icon: 'note.svg',
    },
    {
      label: 'Registro de Pagos',
      route: '/finanzas/pagos',
      icon: 'credit-card.svg',
    },
  ]);
}
