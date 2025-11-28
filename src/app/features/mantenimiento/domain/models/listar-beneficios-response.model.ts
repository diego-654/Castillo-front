export interface ListarBeneficiosResponse {
  beneficios: Beneficios[];
  datosBeneficioMembresia: DatosBeneficioMembresia[];
}

export interface Beneficios {
  id: number;
  idBeneficioGeneral: number;   // 👈 NUEVO: relación con DatosBeneficioMembresia.id
  nombreBeneficio: string;
  membresia: Membresia[];
}

export interface Membresia {
  id: number;
  nombreMembresia: string;
}

export interface DatosBeneficioMembresia {
  id: number;                    // 👈 este id ahora es “id del bloque general”
  nombreBeneficio: string;       // ej: "Beneficios", "Beneficios 2"
  tipoBeneficio: string;
  datosMembresia: DatosMembresia[];
}

export interface DatosMembresia {
  id: number;
  nombreMembresia: string;
  tipoMembresia: string;
}
