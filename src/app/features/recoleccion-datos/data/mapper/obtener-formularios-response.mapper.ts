


import { ObtenerFormulariosResponseDto } from "../dto/obtener-formularios.response.dto";
import { EventoFormularioResponse } from "@features/recoleccion-datos/domain/models/evento-formulario-response.model";

export class ObtenerFormulariosResponseMapper {

  static toModel(request: ObtenerFormulariosResponseDto): EventoFormularioResponse {
    return {
      listaEventos: request.data.map((item) => ({
        id: item.id,
        nombre: item.titulo,
      })),
    }
  }

}
