


import { Injectable } from "@angular/core";
import { MantenimientoDatasource } from "@features/mantenimiento/domain/datasources/mantenimiento.datasource";
import { ListarBeneficiosResponse } from "@features/mantenimiento/domain/models/listar-beneficios-response.model";
import { MantenimientoRepository } from "@features/mantenimiento/domain/repositories/mantenimiento.repository";
import { map, Observable, timer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MantenimientoRepositoryImpl implements MantenimientoRepository {

  constructor(private dataSource: MantenimientoDatasource) {
  }

  listarBeneficios(): Observable<ListarBeneficiosResponse> {
    return this.dataSource.listarBeneficios();
  }

}
