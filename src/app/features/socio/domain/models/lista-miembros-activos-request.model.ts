export interface ListaMiembrosActivosRequest {
  buscador: string;
  eventoId: number | null;
  fechaInicio: Date | null;
  fechaFin: Date | null;
}
