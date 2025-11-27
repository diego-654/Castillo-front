import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/services/api/api.service';
import { InteresadosDataSource } from '@features/interesados/domain/datasources/interesados.datasource';
import { ListarInteresadosRequest } from '@features/interesados/domain/models/listar-interesados-request.model';
import {
  InteresadoData,
  ListarInteresadosResponse,
} from '@features/interesados/domain/models/listar-interesados-response.model';
import { map, Observable, timer } from 'rxjs';
import { ListarInteresadosResponseDto } from '../dto/listar-interesados-response.dto';
import { ListarInteresadosResponseMapper } from '../mapper/listar-interesados-response.mapper';

@Injectable({ providedIn: 'root' })
export class InteresadosDataSourcesImp implements InteresadosDataSource {

  apiService = inject(ApiService);

  listarInteresados(request: ListarInteresadosRequest): Observable<ListarInteresadosResponse> {

    return this.apiService.get<ListarInteresadosResponseDto>('evento/trabajar-respuesta-evento/0').pipe(
      map((response) => ListarInteresadosResponseMapper.toModel(response))
    );

  }

  eliminarInteresado(id: number): Observable<void> {

    return this.apiService.delete<void>(`evento/trabajar-respuesta-evento/${id}`);

  }
}
