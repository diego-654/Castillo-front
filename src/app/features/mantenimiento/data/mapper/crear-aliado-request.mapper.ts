


import { CrearAliadoRequestDto } from "../dto/crear-aliado-request.dto";
import { CrearAliadoRequest } from "@features/mantenimiento/domain/models/crear-aliado-request.model";

export class CrearAliadoRequestMapper {

  static toDto(request: CrearAliadoRequest): CrearAliadoRequestDto {
    return {
      ruc: request.ruc.toString(),
      nombre: request.nombreEmpresa,
      fecha_inicio: request.fechaIncorporacion,
      representante: request.representante,
      celular: request.celular,
      email: request.correo,
      direccion: request.direccion,
      tipo_aliado: 1,
    };
  }

}
