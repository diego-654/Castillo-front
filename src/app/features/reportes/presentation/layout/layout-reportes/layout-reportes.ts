import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-reportes',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './layout-reportes.html',
  styleUrl: './layout-reportes.scss',
})
export class LayoutReportes {
  router = inject(Router);
}
