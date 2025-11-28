import { parseDate } from '@core/functions/parse-date';
import { ConsultaRucResponse } from '../../domain/models/consulta-ruc-response.model';
import { ConsultaRucResponseDto } from '../dto/consulta-ruc-response.dto';

export class ConsultaRucResponseMapper {
  static toModel(dto: ConsultaRucResponseDto): ConsultaRucResponse {
    console.log(dto);

    return {
      id: dto.data.id,
      nombre: dto.data.nombre,
      documento: dto.data.documento,
      tipo: dto.data.tipo,
    };
  }
}

