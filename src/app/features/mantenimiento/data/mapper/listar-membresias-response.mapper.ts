import { ListarBeneficiosResponse } from "@features/mantenimiento/domain/models/listar-beneficios-response.model";
import { ListarMembresiasResponseDto } from "../dto/listar-membresias-response.dto";

export class ListarMembresiasResponseMapper {

  // 👇 OJO: ahora recibe el modelo base y lo enriquece
  static toModel(
    base: ListarBeneficiosResponse,
    dto: ListarMembresiasResponseDto
  ): ListarBeneficiosResponse {

    // 1) Armar las cards de membresía (por grupo) usando id_tipo_beneficio
    const gruposConMembresias = base.datosBeneficioMembresia.map(grupo => {
      // membresías que pertenecen a este grupo
      const membresiasDeEsteGrupo = dto.data.filter(
        m => m.id_tipo_beneficio === grupo.id
      );

      const datosMembresia = membresiasDeEsteGrupo.map(m => ({
        id: m.id,
        nombreMembresia: m.titulo,     // "MEMBRESIA PRUEBA", "Prueba 2", etc.
        tipoMembresia: 'Membresía',
      }));

      return {
        ...grupo,
        datosMembresia,
      };
    });

    // 2) Para cada beneficio, construir su array membresia[]
    const beneficiosConMembresia = base.beneficios.map(beneficio => {
      // Solo considerar membresías del grupo al que pertenece este beneficio
      const membresiasDelMismoGrupo = dto.data.filter(
        m => m.id_tipo_beneficio === beneficio.idBeneficioGeneral
      );

      const membresia = membresiasDelMismoGrupo.map(m => {
        const config = m.listaBeneficios.find(lb => lb.id === beneficio.id);
        const tipoDia = config?.tipoDia ?? '';

        return {
          id: m.id,                   // id de la membresía
          nombreMembresia: tipoDia,   // "1 vez al mes", "4 Por mes", "asd" o ""
          valor: !!tipoDia && tipoDia.trim() !== '', // true si hay valor, false si está vacío
        };
      });

      return {
        ...beneficio,
        membresia,
      };
    });

    return {
      beneficios: beneficiosConMembresia,
      datosBeneficioMembresia: gruposConMembresias,
    };
  }

}
