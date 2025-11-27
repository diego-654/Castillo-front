


import { GuardarRespuestasRequestDto } from "../dto/guardar-respuestas-request.dto";
import { FormularioClienteRequest } from "@features/recoleccion-datos/domain/models/formulario-cliente-request.model";

export class GuardarRespuestasRequestMapper {

  static toDto(request: FormularioClienteRequest): GuardarRespuestasRequestDto {
    return {
      jRespuestas: request.lista.map((item) => ({
        typeFormulario: item.typeFormulario,
        campos: {
          lista: item.campos.lista.map((campo) => ({
            label: campo.label,
            extras: campo.extras,
            isRequired: campo.isRequired,
            type: campo.type,
            respuesta: campo.respuesta,
          })),
        },
      })),
    };
  }
}
