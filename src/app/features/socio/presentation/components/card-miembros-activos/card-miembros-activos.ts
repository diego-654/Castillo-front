import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ListaMiembrosActivos } from '@features/socio/domain/models/lista-miembros-activos-response.model';

@Component({
  selector: 'app-card-miembros-activos',
  imports: [CommonModule],
  templateUrl: './card-miembros-activos.html',
  styleUrl: './card-miembros-activos.scss',
})
export class CardMiembrosActivos {

  listaMiembrosActivos = input.required<ListaMiembrosActivos[]>();

}
