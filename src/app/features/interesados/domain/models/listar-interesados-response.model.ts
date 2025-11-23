export interface ListarInteresadosResponse {
  paginacion: {
    paginaNro: number;
    paginaTamanio: number;
    total: number;
    paginasTotal: number;
  };
  orden:{
    ordenCampo: string;
    ordenDireccion: 'DESC' | 'ASC';
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
