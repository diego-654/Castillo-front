import { Component, inject } from '@angular/core';
import { FormularioClienteResponse } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';
import { RecoleccionDatosRepository } from '@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository';
import { UtilService } from '@shared/components/services/util/util.service';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-formulario-registro-cliente',
  imports: [SvgIconComponent],
  templateUrl: './formulario-registro-cliente.html',
  styleUrl: './formulario-registro-cliente.scss',
})
export default class FormularioRegistroCliente {

  readonly recoleccionDatosRepository = inject(RecoleccionDatosRepository);
  readonly utilService = inject(UtilService);

  formulario: FormularioClienteResponse | null = null;

  ngOnInit() {
    this.obtenerFormularioCliente();
  }

  async obtenerFormularioCliente() {
    try {
      this.utilService.showLoader();
      const res = await firstValueFrom(
        this.recoleccionDatosRepository.getFormularioCliente()
      );
      this.formulario = res;
      this.utilService.dismissLoader();
    } catch (error) {
      this.utilService.dismissLoader();
      console.log(error);
    }
  }


}
