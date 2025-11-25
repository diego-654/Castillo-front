import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';
import { Column, ConcesionariosColumns } from '../../data/concesionario-data';
import { ConcesionarioData } from '@features/mantenimiento/domain/models/listar-concesionario-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { DialogService } from '@shared/components/plugins/dialog';
import { UtilService } from '@shared/components/services/util/util.service';
import { FormularioConcesionario } from '../../components/formulario-concesionario/formulario-concesionario';


@Component({
  selector: 'app-concesionarios-mantenimiento',
  imports: [
    CommonModule,
    PaginadoTablaComponent,
    ButtonComponent,
  ],
  templateUrl: './concesionarios-mantenimiento.html',
  styleUrl: './concesionarios-mantenimiento.scss',
})
export default class ConcesionariosMantenimiento {

  columns = signal<Column[]>(ConcesionariosColumns);
  data = signal<ConcesionarioData[]>([]);

  //** Inject repository */
  readonly concesionarioRepository = inject(MantenimientoRepository);
  dialogService = inject(DialogService);
  utilService = inject(UtilService);

  //** filtros */
  selectedItem = signal<ConcesionarioData | null>(null);
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

    this.concesionarioRepository
      .listarConcesionarios({
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

  formularioConcesionario(concesionarioId: number | null = null) {
    this.dialogService.open(FormularioConcesionario, {
      width: '100%',
      maxWidth: '530px',
      data: { concesionarioId: concesionarioId },
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
