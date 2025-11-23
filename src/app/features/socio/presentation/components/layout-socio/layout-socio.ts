import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-socio',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-socio.html',
  styleUrl: './layout-socio.scss',
})
export class LayoutSocio {
  router = inject(Router);

}
