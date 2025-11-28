import { Observable } from 'rxjs';
import { ConsultaDniRequest } from '../models/consulta-dni-request.model';
import { ConsultaDniResponse } from '../models/consulta-dni-response.model';
import { ConsultaRucRequest } from '../models/consulta-ruc-request.model';
import { ConsultaRucResponse } from '../models/consulta-ruc-response.model';

export abstract class SunatDatasource {
  abstract consultaRuc(
    request: ConsultaRucRequest
  ): Observable<ConsultaRucResponse>;

  abstract consultaDni(
    request: ConsultaDniRequest
  ): Observable<ConsultaDniResponse>;

}
