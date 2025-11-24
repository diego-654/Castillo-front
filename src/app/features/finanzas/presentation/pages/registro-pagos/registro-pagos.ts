import { Component, inject, signal } from '@angular/core';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { Column, RegistroPagosColumns } from '../../data/registro-pagos-data';
import { RegistroPagosData } from '@features/finanzas/domain/models/listar-registro-pagos-response-model';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';

@Component({
  selector: 'app-registro-pagos',
  imports: [SearchInputComponent,ButtonComponent, CommonModule, PaginadoTablaComponent],
  templateUrl: './registro-pagos.html',
  styleUrl: './registro-pagos.scss',
})
export default class RegistroPagos {

  columns = signal<Column[]>(RegistroPagosColumns);

  data = signal<RegistroPagosData[]>([]);
  readonly utilService = inject(UtilService);

  //** Inject repository */
  readonly registroPagosRepository = inject(FinanzasRepository);

  //** filtros */
  selectedItem = signal<RegistroPagosData | null>(null);
  searchInputCheck = signal('');
  searchInputDrag = signal('');

  //** paginacion */
  page = signal<number>(1);
  itemsPerPage = signal<number>(12);
  totalItems = signal<number>(0);
  totalPages = signal<number>(1);


  ngOnInit() {
    this.listar();
  }

  listar() {
    this.data.set([]);
    this.selectedItem.set(null);

    this.utilService.showLoader();

    this.registroPagosRepository
      .listarRegistroPagos({
        paginacion: {
          paginaNro: this.page(),
          paginaTamanio: this.itemsPerPage(),
        },
      }).subscribe({
        next: (response) => {
          this.data.set(response.lista);
          this.totalItems.set(response.paginacion.total);
          this.utilService.dismissLoader();
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
}
