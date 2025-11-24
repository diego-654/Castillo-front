

export interface ListarBeneficiosResponse {
  beneficios: Beneficios[];
  datosBeneficioMembresia: DatosBeneficioMembresia[];
}

export interface Beneficios {
  id: number;
  nombreBeneficio: string;
  membresia: Membresia[];
}

export interface Membresia {
  id: number;
  nombreMembresia: string;
}

export interface DatosBeneficioMembresia {
  id: number;
  nombreBeneficio: string;
  tipoBeneficio: string;
  datosMembresia: DatosMembresia[];
}

export interface DatosMembresia {
  id: number;
  nombreMembresia: string;
  tipoMembresia: string;
}
