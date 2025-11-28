



import { EditarMembresiaRequestDto } from "../dto/editar-membresia-request.dto";
import { EditarMembresiaRequest } from "@features/mantenimiento/domain/models/editar-membresia-request.model";

export class EditarMembresiaRequestMapper {

  static toDto(request: EditarMembresiaRequest): EditarMembresiaRequestDto {
    return {
      titulo: request.nombreMembresia,
      listaBeneficios: request.beneficios.map((item) => ({
        id: item.idBeneficio,
        tipoDia: item.frecuencia,
      })),
    };
  }

}
