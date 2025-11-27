import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-detalle-aliado',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-detalle-aliado.html',
  styleUrl: './layout-detalle-aliado.scss',
})
export class LayoutDetalleAliado {
  router = inject(Router);

  atras() {
    this.router.navigate(['/mantenimiento/aliados']);
  }

}
