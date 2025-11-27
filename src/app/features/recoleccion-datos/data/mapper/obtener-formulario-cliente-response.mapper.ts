import { ObtenerFormularioRespuestasResponse } from '@features/recoleccion-datos/domain/models/obtener-formulario-respuestas-response.molde';

import {
  Datum,
  JPregunta,
  Lista,
  ObtenerFormularioClienteResponseDto
} from '../dto/obtener-formulario-cliente-response.dto';
import { FormularioClienteResponse, FormularioClienteResponseInputs, TipoInput, TipoInputType } from '@features/recoleccion-datos/domain/models/formulario-cliente-response.model';

export class ObtenerFormularioClienteResponseMapper {

  static toModel(
    response: ObtenerFormularioClienteResponseDto,
    id: number
  ): FormularioClienteResponse {
    if (!response.data || response.data.length === 0) {
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
      lista: dto.jPreguntas.map((pregunta) =>
        this.mapPregunta(pregunta)
      ),
    };
  }

  private static mapPregunta(pregunta: JPregunta): FormularioClienteResponseInputs {
    return {
      typeFormulario: pregunta.typeFormulario,
      campos: {
        // 👇 otra arrow function
        lista: pregunta.campos.lista.map((campo) =>
          this.mapCampo(campo)
        ),
      },
    };
  }

  private static mapCampo(campo: Lista): TipoInput {
    return {
      label: campo.label,
      extras: campo.extras,
      isRequired: campo.isRequired,
      // casteamos el number del backend al enum del front (si aplica)
      type: campo.type as TipoInputType,
    };
  }
}
