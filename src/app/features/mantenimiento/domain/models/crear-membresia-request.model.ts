export interface CrearNuevaMembresiaRequest {
  idBeneficioGeneral: number; // grupo (Beneficios, Beneficios 2, etc.)
  nombreMembresia: string;    // "Esta es una nueva membresia"
  tipoMembresia: string;      // "Membresía"
  beneficios: {
    idBeneficio: number;      // Ingreso libre, Piscina, etc.
    frecuencia: string;       // "1 vez al mes" por defecto
  }[];
}
