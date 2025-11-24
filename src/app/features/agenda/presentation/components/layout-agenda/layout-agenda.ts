import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';


@Component({
  selector: 'app-layout-agenda',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './layout-agenda.html',
  styleUrl: './layout-agenda.scss',
})
export default class LayoutAgenda {
  router = inject(Router);

}
