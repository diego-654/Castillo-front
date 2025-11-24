


import { Observable } from "rxjs";
import { ListarBeneficiosResponse } from "../models/listar-beneficios-response.model";

export abstract class MantenimientoRepository {

  abstract listarBeneficios(): Observable<ListarBeneficiosResponse>;
}
