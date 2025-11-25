import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ListaMiembrosActivos } from '@features/socio/domain/models/lista-miembros-activos-response.model';

@Component({
  selector: 'app-card-miembros-activos',
  imports: [CommonModule],
  templateUrl: './card-miembros-activos.html',
  styleUrl: './card-miembros-activos.scss',
})
export class CardMiembrosActivos {
  router = inject(Router);


  listaMiembrosActivos = input.required<ListaMiembrosActivos[]>();

  irAlDetalle(id: number) {
    this.router.navigate(['/socios', id, 'general']);
  }


}
