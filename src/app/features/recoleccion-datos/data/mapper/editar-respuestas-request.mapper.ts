


import { EditarFormularioClienteRequest } from "@features/recoleccion-datos/domain/models/editar-formulario-cliente-request.model";
import { EditarFormularioClienteRequestDto } from "../dto/editar-formilario-cliente-request.dto";

export class EditarRespuestasRequestMapper {

  static toDto(request: EditarFormularioClienteRequest): EditarFormularioClienteRequestDto {
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
