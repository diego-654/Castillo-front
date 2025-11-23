import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ListaMiembrosActivosRequest } from '@features/socio/domain/models/lista-miembros-activos-request.model';
import { ListaMiembrosActivos } from '@features/socio/domain/models/lista-miembros-activos-response.model';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { DatePickerComponent } from '@shared/components/date-picker/date-picker.component';
import { SearchInputComponent } from '@shared/components/search-input/search-input.component';
import { OptionComponent, SelectComponent } from '@shared/components/select/select.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { CardMiembrosActivos } from '../../components/card-miembros-activos/card-miembros-activos';
import { DialogService } from '@shared/components/plugins/dialog';
import { FormularioSocio } from '../../components/formulario-socio/formulario-socio';

@Component({
  selector: 'app-lista-miembros',
  imports: [
    DatePickerComponent,
    SearchInputComponent,
    SelectComponent,
    OptionComponent,
    ButtonComponent,
    SvgIconComponent,
    CardMiembrosActivos,
  ],
  templateUrl: './lista-miembros.html',
  styleUrl: './lista-miembros.scss',
})
export default class ListaMiembros {

  //injecs
  socioRepository = inject(SocioRepository);
  utilService = inject(UtilService);
  router = inject(Router);
  dialogService = inject(DialogService);


  listaMiembros = signal<ListaMiembrosActivos[]>([]);

  //filtros
  fechaInicio = signal<Date | null>(null);
  fechaFin = signal<Date | null>(null);
  buscador = signal<string>('');
  eventoId = signal<number>(0);

  ngOnInit() {
    this.listarMiembros();
  }


  listarMiembros() {

    this.utilService.showLoader();

    this.listaMiembros.set([]);

    const request: ListaMiembrosActivosRequest = {
      buscador: this.buscador(),
      eventoId: this.eventoId(),
      fechaInicio: this.fechaInicio(),
      fechaFin: this.fechaFin(),
    };

    this.socioRepository.listaMiembrosActivos(request).subscribe({
      next: (res) => {
        this.listaMiembros.set(res.lista);
        this.utilService.dismissLoader();
      },
      error: (error) => {
        // this.utilService.showSnackBar('Error al cargar la lista de socios');
        this.utilService.dismissLoader();
      }
    });

  }

  formularioSocio() {
    this.dialogService.open(FormularioSocio, {
      width: '100%',
      maxWidth: '530px',
    });
  }
}
