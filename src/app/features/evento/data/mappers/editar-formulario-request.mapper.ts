import { EditarFormularioRequest } from "@features/evento/domain/models/editar-formulario-request.model";
import { EditarFormularioRequestDto } from "../dto/editar-formulario-request.dto";
import { formatDateApi } from "@core/functions/format-date";
import { FormularioClienteRequestCampo } from "@features/evento/domain/models/formulario-evento-request.model";



export class EditarFormularioRequestMapper {

  static toDto(request: EditarFormularioRequest): EditarFormularioRequestDto {
    return {
      titulo: request.nombreEncuesta,
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
      isVisible: campo.isVisible,
      isCampoNuevo: campo.isCampoNuevo,
      type: campo.type, // enum numérico → encaja con "number"
      extras: campo.extras,
    };
  }

}
