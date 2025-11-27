

import { Injectable } from "@angular/core";
import { EventoDatasource } from "@features/evento/domain/datasources/evento.datasource";
import { EventoRepository } from "@features/evento/domain/repositories/evento.repository";
import { Observable } from "rxjs";
import { FormularioEventoRequest } from "@features/evento/domain/models/formulario-evento-request.model";
import { ListarHistorialFormularioRequest } from "@features/evento/domain/models/listar-historial-formulario-request.model";
import { ListarHistorialFormularioResponse } from "@features/evento/domain/models/listar-historial-formulario-response.model";
import { ObtenerFormularioResponse } from "@features/evento/domain/models/obtener-formulario.response.model";
import { EditarFormularioRequest } from "@features/evento/domain/models/editar-formulario-request.model";

@Injectable({ providedIn: 'root' })
export class EventoRepositoryImpl implements EventoRepository {

  constructor(private dataSource: EventoDatasource) {
  }

  guardarFormulario(formulario: FormularioEventoRequest): Observable<void> {
    return this.dataSource.guardarFormulario(formulario);
  }
  listarHistorialFormulario(request: ListarHistorialFormularioRequest): Observable<ListarHistorialFormularioResponse> {
    return this.dataSource.listarHistorialFormulario(request);
  }
  eliminarHistorialFormulario(id: number): Observable<void> {
    return this.dataSource.eliminarHistorialFormulario(id);
  }

  obtenerFormulario(id: number): Observable<ObtenerFormularioResponse> {
    return this.dataSource.obtenerFormulario(id);
  }

  listarHistorialFormulario2(): Observable<ListarHistorialFormularioResponse> {
    return this.dataSource.listarHistorialFormulario2();
  }

  editarFormulario(request: EditarFormularioRequest): Observable<void> {
    return this.dataSource.editarFormulario(request);
  }

}
