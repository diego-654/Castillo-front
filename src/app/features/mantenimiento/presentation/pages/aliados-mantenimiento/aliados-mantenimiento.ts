import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';
import { FormularioAliado } from '../../components/formulario-aliado/formulario-aliado';
import { UtilService } from '@shared/components/services/util/util.service';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { Column } from '../../data/aliados-data';
import { AliadoData } from '@features/mantenimiento/domain/models/listar-aliado-response.model';
import { AliadosColumns } from '../../data/aliados-data';
import { DialogService } from '@shared/components/plugins/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aliados-mantenimiento',
  imports: [ButtonComponent, CommonModule, PaginadoTablaComponent],
  templateUrl: './aliados-mantenimiento.html',
  styleUrl: './aliados-mantenimiento.scss',
})
export default class AliadosMantenimiento {

  columns = signal<Column[]>(AliadosColumns);
  data = signal<AliadoData[]>([]);

  //** Inject repository */
  readonly aliadoRepository = inject(MantenimientoRepository);
  dialogService = inject(DialogService);
  utilService = inject(UtilService);
  router = inject(Router);

  //** filtros */
  selectedItem = signal<AliadoData | null>(null);
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

    this.aliadoRepository
      .listarAliados({
        paginacion: {
          paginaNro: this.page(),
          paginaTamanio: this.itemsPerPage(),
        },
      })
      .subscribe({
        next: (response) => {
          this.data.set(response.lista);
          this.totalItems.set(response.paginacion.paginasTotal);
          this.utilService.dismissLoader();
        },
        error: (error) => {
          this.utilService.dismissLoader();
        },
      });
  }

  formularioAliado(aliadoId: number | null = null) {
    this.dialogService.open(FormularioAliado, {
      width: '100%',
      maxWidth: '530px',
      data: { aliadoId },
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

  IrDetalleUsuario(id: number) {
    this.router.navigate(['/mantenimiento', 'detalle', id]);
  }


}
