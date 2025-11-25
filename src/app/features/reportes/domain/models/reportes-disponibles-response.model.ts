export interface ReportesDisponiblesResponse {
  readonly listaReportes: ReportesDisponibles[];
}

export interface ReportesDisponibles {
  readonly id: number;
  readonly nombre: string;
}
