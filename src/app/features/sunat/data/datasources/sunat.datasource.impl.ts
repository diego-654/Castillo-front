import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { ConsultaDniRequest } from '@features/sunat/domain/models/consulta-dni-request.model';
import { ConsultaDniResponse } from '@features/sunat/domain/models/consulta-dni-response.model';
import { map, Observable, timer } from 'rxjs';
import { SunatDatasource } from '../../domain/datasources/sunat.datasource';
import { ConsultaRucRequest } from '../../domain/models/consulta-ruc-request.model';
import { ConsultaRucResponse } from '../../domain/models/consulta-ruc-response.model';
import { ConsultaRucResponseDto } from '../dto/consulta-ruc-response.dto';
import { ConsultaRucResponseMapper } from '../mappers/consulta-ruc-response.mapper';
import { ConsultaRucRequestMapper } from '../mappers/consulta-ruc-request.mapper';

@Injectable({ providedIn: 'root' })
export class SunatDatasourceImpl implements SunatDatasource {
  private api = inject(ApiService);
  private timer = timer;

  consultaRuc(request: ConsultaRucRequest): Observable<ConsultaRucResponse> {

    const body = ConsultaRucRequestMapper.toDto(request);

    return this.api
      .post<ConsultaRucResponseDto>(`interesado/trabajar-cliente/0`, body)
      .pipe(map(ConsultaRucResponseMapper.toModel));
  }

  consultaDni(request: ConsultaDniRequest): Observable<ConsultaDniResponse> {
    const params = new HttpParams().set('dni', request.dni);

    return this.timer(200).pipe(
      map(() => ({
        dni: request.dni,
        nombre: 'Nombre',
      } as ConsultaDniResponse))
    );
  }


}
