import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-layout-recoleccion-datos',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-recoleccion-datos.html',
  styleUrl: './layout-recoleccion-datos.scss',
})
export class LayoutRecoleccionDatos {
  router = inject(Router);

}
