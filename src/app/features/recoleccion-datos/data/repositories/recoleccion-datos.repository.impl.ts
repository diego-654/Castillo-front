import { Injectable } from "@angular/core";
import { RecoleccionDatosDatasource } from "@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources";
import { EditarFormularioClienteRequest } from "@features/recoleccion-datos/domain/models/editar-formulario-cliente-request.model";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";
import { FormularioClienteRequest } from "@features/recoleccion-datos/domain/models/formulario-cliente-request.model";
import { FormularioClienteResponse } from "@features/recoleccion-datos/domain/models/formulario-cliente-response.model";
import { ObtenerFormularioRespuestasResponse } from "@features/recoleccion-datos/domain/models/obtener-formulario-respuestas-response.molde";
import { RecoleccionDatosRepository } from "@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RecoleccionDatosRepositoryImpl implements RecoleccionDatosRepository {

  constructor(private dataSource: RecoleccionDatosDatasource) {
  }

  getFormularioCliente(request: number): Observable<FormularioClienteResponse> {
    return this.dataSource.getFormularioCliente(request);
  }

  getEventoFormulario(): Observable<EventoFormularioResponse> {
    return this.dataSource.getEventoFormulario();
  }

  guardarFormulario(formulario: FormularioClienteRequest): Observable<void> {
    return this.dataSource.guardarFormulario(formulario);
  }

  obtenerFormularioRespuestas(id: number): Observable<ObtenerFormularioRespuestasResponse> {
    return this.dataSource.obtenerFormularioRespuestas(id);
  }

  editarFormularioCliente(request: EditarFormularioClienteRequest): Observable<void> {
    return this.dataSource.editarFormularioCliente(request);
  }

}
