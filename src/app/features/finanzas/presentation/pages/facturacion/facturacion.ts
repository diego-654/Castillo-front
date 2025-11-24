import { Component, inject, signal } from '@angular/core';
import { Column, FacturacionColumns } from '../../data/facturacion-data';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';
import { FacturacionData } from '@features/finanzas/domain/models/listar-facturacion-response.model';
import { UtilService } from '@shared/components/services/util/util.service';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { DialogService } from '@shared/components/plugins/dialog';
import { FormularioFactura } from '../../components/formulario-factura/formulario-factura';

@Component({
  selector: 'app-facturacion',
  imports: [CommonModule, ButtonComponent, PaginadoTablaComponent, SearchInputComponent],
  templateUrl: './facturacion.html',
  styleUrl: './facturacion.scss',
})
export default class Facturacion {
  columns = signal<Column[]>(FacturacionColumns);

  data = signal<FacturacionData[]>([]);
  readonly utilService = inject(UtilService);

  //** Inject repository */
  readonly facturacionRepository = inject(FinanzasRepository);
  dialogService = inject(DialogService);

  //** filtros */
  selectedItem = signal<FacturacionData | null>(null);
  searchInputCheck = signal('');
  searchInputDrag = signal('');

  //** Paginacion */
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

    this.facturacionRepository
      .listarFacturacion({
        paginacion: {
          paginaNro: this.page(),
          paginaTamanio: this.itemsPerPage(),
        },
      })
      .subscribe({
        next: (response) => {
          this.data.set(response.lista);
          this.totalItems.set(response.paginacion.total);
          this.utilService.dismissLoader();
        },
        error: (error) => {
          this.utilService.dismissLoader();
        },
      });
  }

  formularioFactura(facturaId: number | null = null) {
    this.dialogService.open(FormularioFactura, {
      width: '560px',
      maxWidth: '450px',
      data: { facturaId },
    });
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
