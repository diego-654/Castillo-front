import { HistorialFormularioData, ListarHistorialFormularioResponse } from "@features/evento/domain/models/listar-historial-formulario-response.model";
import { ListarEventosResponseDto } from "../dto/listar-eventos-response.dto";


export class ListarEventosResponseMapper {

  static toModel(request: ListarEventosResponseDto): ListarHistorialFormularioResponse {
    return {
      lista: request.data.map((item) => ({
        id: item.id,
        nombreEncuesta: item.titulo,
        fechaInicio: item.fecha_inicio,
        fechaFin: item.fecha_fin,
      })),
    };
  }
}
