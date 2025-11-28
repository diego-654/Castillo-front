import {
  FormularioEventoRequest,
  FormularioClienteRequestItem,
  FormularioClienteRequestCampo,
  TipoInputType,
} from '@features/evento/domain/models/formulario-evento-request.model';
import {
  ObtenerFormularioResponseDto,
  Datum,
  JPregunta,
  Lista,
} from '../dto/obtener-formulario-response.dto';
import { parseDate } from '@core/functions/parse-date';

export class ObtenerFormularioResponseMapper {

  static toModel(
    response: ObtenerFormularioResponseDto,
    id: number
  ): FormularioEventoRequest {
    if (!response.data || response.data.length === 0) {
      return {
        lista: [],
        nombreEncuesta: '',
        fechaInicio: null,
        fechaFin: null
      };
    }

    const dto: Datum | undefined = response.data.find((item) => item.id === id);

    if (!dto) {
      return {
        lista: [],
        nombreEncuesta: '',
        fechaInicio: null,
        fechaFin: null,
      };
    }

    return {
      nombreEncuesta: dto.titulo,
      fechaInicio: parseDate(dto.fecha_inicio),
      fechaFin: parseDate(dto.fecha_fin),
      // 👇 aquí usamos arrow function
      lista: dto.jPreguntas.map((pregunta) =>
        this.mapPregunta(pregunta)
      ),
    };
  }

  private static mapPregunta(pregunta: JPregunta): FormularioClienteRequestItem {
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

  private static mapCampo(campo: Lista): FormularioClienteRequestCampo {
    return {
      label: campo.label,
      extras: campo.extras,
      isRequired: campo.isRequired,
      isVisible: campo.isVisible,
      isCampoNuevo: campo.isCampoNuevo,
      // casteamos el number del backend al enum del front (si aplica)
      type: campo.type as TipoInputType,
    };
  }
}
