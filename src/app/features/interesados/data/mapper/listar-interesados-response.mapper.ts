import { InteresadoData, ListarInteresadosResponse } from "@features/interesados/domain/models/listar-interesados-response.model";
import { Datum, ListarInteresadosResponseDto } from "../dto/listar-interesados-response.dto";



export class ListarInteresadosResponseMapper {

  static toModel(request: ListarInteresadosResponseDto): ListarInteresadosResponse {
    return {
      paginacion: {
        paginaNro: 0,
        paginasTotal: 0
      },

      lista: request.data.map((item: Datum): InteresadoData => ({
        id: item.id,
        nombre: item.nombres,
        telefono: item.telefono,
        trabajador: item.nombres + ' ' + item.apellidos,
        fecharegistro: item.fecha_registro,
        evento: item.evento,
      })),
    };
  }
}
