import { ConsultaRucRequest } from "@features/sunat/domain/models/consulta-ruc-request.model";
import { ConsultaRucRequestDto } from "../dto/consulta-ruc-request.dto";

export class ConsultaRucRequestMapper {
  static toDto(request: ConsultaRucRequest): ConsultaRucRequestDto {
    return {
      documento: request.ruc.toString(),
      tipo: 'RUC',
    };
  }
}

