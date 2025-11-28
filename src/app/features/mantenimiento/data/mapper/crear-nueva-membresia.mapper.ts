

import { CrearNuevaMembresiaRequestDto } from "../dto/crear-nueva-membresia-request.dto";
import { CrearNuevaMembresiaRequest } from "@features/mantenimiento/domain/models/crear-membresia-request.model";

export class CrearNuevaMembresiaRequestMapper {

  static toDto(request: CrearNuevaMembresiaRequest): CrearNuevaMembresiaRequestDto {
    return {
      titulo: request.nombreMembresia,
      listaBeneficios: request.beneficios.map((item) => ({
        id: item.idBeneficio,
        tipoDia: item.frecuencia,
      })),
    };
  }

}
