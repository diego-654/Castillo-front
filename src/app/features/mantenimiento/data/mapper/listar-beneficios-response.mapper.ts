import { ListarBeneficiosResponse } from '@features/mantenimiento/domain/models/listar-beneficios-response.model';
import { ListarBeneficiosResponseDto } from '../dto/listar-beneficios-response.dto';

export class ListarBeneficiosResponseMapper {

  static toModel(dto: ListarBeneficiosResponseDto): ListarBeneficiosResponse {
    // 1) Mapear los grupos (data[]) → datosBeneficioMembresia
    const datosBeneficioMembresia = dto.data.map(grupo => ({
      id: grupo.id,
      nombreBeneficio: grupo.titulo,     // ej. "Beneficios", "Beneficios 2"
      tipoBeneficio: 'Parque Temático',  // por ahora fijo, como en tu mock
      datosMembresia: []                 // cuando el back mande esto, aquí lo mapeas
    }));

    // 2) Mapear los beneficios dentro de cada grupo
    const beneficios = dto.data.flatMap(grupo =>
      grupo.beneficios.map(beneficio => ({
        id: beneficio.id,
        idBeneficioGeneral: grupo.id,    // relación con el grupo
        nombreBeneficio: beneficio.titulo,
        membresia: [] as {
          id: number;
          nombreMembresia: string;
          valor: boolean;
        }[]                               // de momento vacío (lo rellenas cuando el back mande las reglas por membresía)
      }))
    );

    return {
      beneficios,
      datosBeneficioMembresia,
    };
  }

}
