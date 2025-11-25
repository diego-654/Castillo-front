// 👇 Modelo de request propuesto
export interface ActualizarBeneficiosMembresiaRequest {
  idBeneficioGeneral: number; // grupo (Beneficios, Beneficios 2, etc.)
  idMembresia: number;        // Medieval, Real, etc.
  beneficios: {
    idBeneficio: number;      // Ingreso libre, Piscina, etc.
    valor: boolean;           // checkbox
    frecuencia: string;       // "1 vez al mes", "10% de descuento", etc. (opcional)
  }[];
}
