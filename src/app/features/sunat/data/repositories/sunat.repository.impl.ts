import { inject, Injectable } from '@angular/core';
import { ConsultaDniRequest } from '@features/sunat/domain/models/consulta-dni-request.model';
import { ConsultaDniResponse } from '@features/sunat/domain/models/consulta-dni-response.model';
import { Observable } from 'rxjs';
import { SunatDatasource } from '../../domain/datasources/sunat.datasource';
import { ConsultaRucRequest } from '../../domain/models/consulta-ruc-request.model';
import { ConsultaRucResponse } from '../../domain/models/consulta-ruc-response.model';
import { SunatRepository } from '../../domain/repositories/sunat.repository';

@Injectable({ providedIn: 'root' })
export class SunatRepositoryImpl implements SunatRepository {
  dataSource = inject(SunatDatasource);

  consultaRuc(request: ConsultaRucRequest): Observable<ConsultaRucResponse> {
    return this.dataSource.consultaRuc(request);
  }

  consultaDni(request: ConsultaDniRequest): Observable<ConsultaDniResponse> {
    return this.dataSource.consultaDni(request);
  }

}
