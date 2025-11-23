import { Injectable } from "@angular/core";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";
import { FormularioClienteRequest } from "@features/recoleccion-datos/domain/models/formulario-cliente-request.model";
import { FormularioClienteResponse } from "@features/recoleccion-datos/domain/models/formulario-cliente-response.model";
import { RecoleccionDatosRepository } from "@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosRepositoryImpl implements RecoleccionDatosRepository {

  constructor(private dataSource: RecoleccionDatosDatasource) {
  }

  getFormularioCliente(): Observable<FormularioClienteResponse> {
    return this.dataSource.getFormularioCliente();
  }

  getEventoFormulario(): Observable<EventoFormularioResponse> {
    return this.dataSource.getEventoFormulario();
  }

  guardarFormulario(formulario: FormularioClienteRequest): Observable<void> {
    return this.dataSource.guardarFormulario(formulario);
  }
}
