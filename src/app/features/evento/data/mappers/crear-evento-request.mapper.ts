import { formatDateApi } from '@core/functions/format-date';
import {
  FormularioEventoRequest,
  FormularioClienteRequestCampo,
} from '../../domain/models/formulario-evento-request.model';
import { CrearEventoRequestDto } from '../dto/crear-evento-request.dto';

export class CrearEventoRequestMapper {

  static toDto(request: FormularioEventoRequest): CrearEventoRequestDto {
    return {
      titulo: request.nombreEncuesta,
      // Si solo quieres fecha (YYYY-MM-DD) cambia a .toISOString().slice(0, 10)
      fecha_inicio: formatDateApi(request.fechaInicio),
      fecha_fin: formatDateApi(request.fechaFin),
      jPreguntas:
        request.lista.map((item) => ({
          typeFormulario: item.typeFormulario,
          campos: {
            lista: item.campos.lista.map((campo) =>
              this.mapCampo(campo)
            ),
          },
        })),

    };
  }

  private static mapCampo(
    campo: FormularioClienteRequestCampo
  ): {
    label: string;
    isRequired: boolean;
    isCampoNuevo: boolean;
    isVisible: boolean;
    type: number;
    extras?: string;
  } {
    return {
      label: campo.label,
      isRequired: campo.isRequired,
      isCampoNuevo: campo.isCampoNuevo,
      isVisible: campo.isVisible,
      type: campo.type, // enum numérico → encaja con "number"
      extras: campo.extras,
    };
  }


}
