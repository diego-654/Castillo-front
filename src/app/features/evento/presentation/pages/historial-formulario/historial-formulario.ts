import { Component, inject, signal } from '@angular/core';
import { Column, HistorialFormularioColumns } from '../../data/historial-formulario-data';
import { CommonModule } from '@angular/common';
import { HistorialFormularioData } from '@features/evento/domain/models/listar-historial-formulario-response.model';
import { UtilService } from '@shared/components/services/util/util.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { PaginadoTablaComponent } from '@shared/components/paginado-tabla/paginado-tabla.component';
import { EventoRepository } from '@features/evento/domain/repositories/evento.repository';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-formulario',
  imports: [CommonModule, ButtonComponent, PaginadoTablaComponent],
  templateUrl: './historial-formulario.html',
  styleUrl: './historial-formulario.scss',
})
export default class HistorialFormulario {
  columns = signal<Column[]>(HistorialFormularioColumns);

  data = signal<HistorialFormularioData[]>([]);
  readonly utilService = inject(UtilService);
  router = inject(Router);

  //** Inject repository */
  readonly historialRepository = inject(EventoRepository);

  //** filtros */
  selectedItem = signal<HistorialFormularioData | null>(null);
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

    this.historialRepository
      .listarHistorialFormulario2(
      //   {
      //   paginacion: {
      //     paginaNro: this.page(),
      //     paginaTamanio: this.itemsPerPage(),
      //   },
      // }
    ).subscribe({
      next: (response) => {
        this.data.set(response.lista);
        // this.totalItems.set(response.paginacion.total);
        console.log(response);

        console.log(this.data());

        this.utilService.dismissLoader();
      },
      error: (error) => {
        this.utilService.dismissLoader();
      },
    })
  }
  async eliminarHistorial(row: HistorialFormularioData) {
    this.utilService.confirmarEliminar((result) => {
      if (result) {
        this.historialRepository.eliminarHistorialFormulario(row.id).subscribe({
          next: (response) => {
            this.utilService.openSnackBar('Historial eliminado', 'success');
            this.resetListar();

          },
          error: (error) => {
            this.utilService.dismissLoader();
            this.utilService.openSnackBar('Error al eliminar historial', 'error');
          },
        })
      }
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

    this.router.navigate(['/eventos/formulario', id]);
  }

}
