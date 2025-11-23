import { Injectable } from "@angular/core";
import { InteresadosDataSource } from "@features/interesados/domain/datasources/interesados.datasource";
import { ListarInteresadosRequest } from "@features/interesados/domain/models/listar-interesados-request.model";
import { ListarInteresadosResponse } from "@features/interesados/domain/models/listar-interesados-response.model";
import { InteresadosRepository } from "@features/interesados/domain/repositories/interesados.repository";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class InteresadosRepositoryImpl implements InteresadosRepository {
  constructor(private dataSource: InteresadosDataSource ) { }
  listarInteresados(request: ListarInteresadosRequest): Observable<ListarInteresadosResponse> {
    return this.dataSource.listarInteresados(request);
  }
  eliminarInteresado(id: number): Observable<void> {
    return this.dataSource.eliminarInteresado(id);
  }
}
