import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-interesados-layout',
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './interesados-layout.html',
  styleUrl: './interesados-layout.scss',
})
export class InteresadosLayout {
  router = inject(Router);

  tabs = signal([
    {
      label: 'Datos Obtenidos',
      route: '/interesados/datos-obtenidos',
    },
    {
      label: 'Formulario',
      route: '/interesados/formulario',
    },
    {
      label: 'Historial de Formulario',
      route: '/interesados/historial-formulario',
    },
  ]);
}
