import { ObtenerFormularioRespuestasResponse } from "@features/recoleccion-datos/domain/models/obtener-formulario-respuestas-response.molde";
import { Datum, ObtenerFormularioRespuestasResponseDto } from "../dto/obtener-formulario-respuestas-response.dto";




export class ObtenerFormularioRespuestasResponseMapper {

  static toModel(
    response: ObtenerFormularioRespuestasResponseDto,
    id: number,
  ): ObtenerFormularioRespuestasResponse {

    if (!response.data) {

      return {
        id: 0,
        lista: []
      };
    }

    const dto: Datum | undefined = response.data.find((item) => item.id === id);

    if (!dto) {
      return {
        lista: [],
        id: 0,
      };
    }

    return {
      id: dto.id,
      lista: dto.jRespuestas.map((respuesta) => ({
        typeFormulario: respuesta.typeFormulario,
        campos: {
          lista: respuesta.campos.lista.map((campo) => ({
            label: campo.label,
            extras: campo.extras,
            isRequired: campo.isRequired,
            isVisible: campo.isVisible,
            isCampoNuevo: campo.isCampoNuevo,
            type: campo.type,
            respuesta: campo.respuesta,
          })),
        },
      })),
    };
  }

}
