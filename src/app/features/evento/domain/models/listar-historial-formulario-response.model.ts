export interface ListarHistorialFormularioResponse {
  // paginacion: {
  //   paginaNro: number;
  //   paginasTotal: number;
  // };

  lista: HistorialFormularioData[];
}

export interface HistorialFormularioData {
  readonly id: number;
  readonly nombreEncuesta: string;
  readonly fechaInicio: string;
  readonly fechaFin: string;
}
