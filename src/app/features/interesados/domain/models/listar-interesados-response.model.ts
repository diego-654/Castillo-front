export interface ListarInteresadosResponse {
  paginacion: {
    paginaNro: number;
    paginasTotal: number;
  };

  lista: InteresadoData[];
}

export interface InteresadoData {
  readonly id : number;
  readonly nombre: string;
  readonly telefono: string;
  readonly trabajador: string;
  readonly fecharegistro: string;
  readonly evento: string;
}
