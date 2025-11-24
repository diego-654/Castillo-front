import { Component, computed, inject, signal } from '@angular/core';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { SelectComponent } from '@shared/components/select/select.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InteresadoData } from '@features/interesados/domain/models/listar-interesados-response.model';
import { Column, InteresadosColumns } from '../../data/interesados-columns';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';
import { CommonModule } from '@angular/common';
import { UtilService } from '../../../../../shared/components/services/util/util.service';
import { InteresadosRepository } from '@features/interesados/domain/repositories/interesados.repository';
import { Router } from '@angular/router';


@Component({
  selector: 'app-datos-obtenidos',
  imports: [SearchInputComponent, SelectComponent, ButtonComponent, PaginadoTablaComponent, CommonModule],
  templateUrl: './datos-obtenidos.html',
  styleUrl: './datos-obtenidos.scss',
})
export default class DatosObtenidos {
  columns = signal<Column[]>(InteresadosColumns);

  data = signal<InteresadoData[]>([]);
  readonly utilService = inject(UtilService);
  router = inject(Router);


  //** paginacion */
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);
  totalItems = signal<number>(0);
  totalPages = signal<number>(1);

  //** Inject repository */
  readonly interesadosRepository = inject(InteresadosRepository);

  //** filtos */
  selectedItem = signal<InteresadoData | null>(null);

  searchInputCheck = signal('');
  searchInputDrag = signal('');


  ngOnInit() {
    this.listar();
  }

  listar() {
    this.data.set([]);
    this.selectedItem.set(null);

    this.utilService.showLoader();
    this.interesadosRepository
      .listarInteresados({
        paginacion: {
          paginaNro: this.page(),
          paginaTamanio: this.itemsPerPage(),
        },
      }).subscribe({
        next: (response) => {
          this.data.set(response.lista);
          this.totalItems.set(response.paginacion.total);
          this.totalPages.set(response.paginacion.paginasTotal);
          this.utilService.dismissLoader();
        },
        error: (error) => {
          this.utilService.dismissLoader();
        },
      })
  }
    async eliminarDatoObtenido(row: InteresadoData) {
        this.interesadosRepository.eliminarInteresado(row.id).subscribe({
          next: (response) => {
            this.resetListar();
          },
          error: (error) => {
            this.utilService.dismissLoader();
          },
        })
    }

        resetListar() {
    this.page.set(1);
    this.listar();
  }

  onPageChange(newPage: number) {
    this.page.set(newPage);
    this.listar();
  }

  irEditFormulario(id: number) {

    if (!id) {
      console.error("No hay ID para editar");
      return;
    }

    this.router.navigate(['/recoleccion-datos/formulario/editar', id]);
  }
}
