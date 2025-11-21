import { Component, inject, signal } from '@angular/core';
import { Card } from '../../components/card/card';
import { RecoleccionDatosRepository } from '@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository';
import { EventosFormulario } from '@features/recoleccion-datos/domain/models/evento-formulario-response.model';
import { firstValueFrom } from 'rxjs';
import { UtilService } from '@shared/components/services/util/util.service';



@Component({
  selector: 'app-recoleccion-datos',
  imports: [Card],
  templateUrl: './recoleccion-datos.html',
  styleUrl: './recoleccion-datos.scss',
})
export default class RecoleccionDatos {

  readonly recoleccionDatosRepository = inject(RecoleccionDatosRepository);
  readonly utilService = inject(UtilService);

  eventosFormulario = signal<EventosFormulario[]>([]);

  ngOnInit() {
    this.listarEventosFormulario();
  }

  async listarEventosFormulario() {
    this.utilService.showLoader();
    try {
      const res = await firstValueFrom(
        this.recoleccionDatosRepository.getEventoFormulario()
      );
      this.eventosFormulario.set(res.listaEventos);
      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.dismissLoader();
    }

  }
}
