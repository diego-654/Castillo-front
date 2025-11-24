import { Component, inject, signal } from '@angular/core';
import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-aliados-mantenimiento',
  imports: [
    ButtonComponent,
  ],
  templateUrl: './aliados-mantenimiento.html',
  styleUrl: './aliados-mantenimiento.scss',
})
export default class AliadosMantenimiento {

  

}
