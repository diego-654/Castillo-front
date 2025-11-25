import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObtenerDatosMiembroResponse } from '@features/socio/domain/models/obtener-datos-miembro.response.model';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { ButtonComponent } from '@shared/components/button/button.component';
import { InputComponent } from '@shared/components/input/input.component';
import { DialogService } from '@shared/components/plugins/dialog/services/dialog.service';
import { UtilService } from '@shared/components/services/util/util.service';
import { firstValueFrom } from 'rxjs';
import { FormularioBeneficiario } from '../../components/formulario-beneficiario/formulario-beneficiario';
import { FormularioInvitado } from '../../components/formulario-invitado/formulario-invitado';

@Component({
  selector: 'app-detalle-socio-general',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './detalle-socio-general.html',
  styleUrl: './detalle-socio-general.scss',
})
export default class DetalleSocioGeneral {

  utilservice = inject(UtilService);
  socioRepository = inject(SocioRepository);
  route = inject(ActivatedRoute);
  socioDetalle = signal<ObtenerDatosMiembroResponse | null>(null);
  dialogService = inject(DialogService);


  socioId = signal<number>(0);

  ngOnInit() {
    this.obtenerIdSocio();
  }

  async obtenerIdSocio() {
    this.utilservice.showLoader();
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.socioId.set(id);
    this.obtenerDatosMiembro();
  }

  async obtenerDatosMiembro() {
    const res = await firstValueFrom(
      this.socioRepository.obtenerDatosMiembro(this.socioId())
    );
    this.socioDetalle.set(res);
    this.utilservice.dismissLoader();
  }

  openFormularioBeneficiario() {
    this.dialogService.open(FormularioBeneficiario, {
      width: '100%',
      maxWidth: '530px',
    });
  }

  openFormularioInvitado() {
    this.dialogService.open(FormularioInvitado, {
      width: '100%',
      maxWidth: '530px',
    });
  }

}
