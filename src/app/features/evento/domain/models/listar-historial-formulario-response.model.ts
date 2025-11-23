export  interface ListarHistorialFormularioResponse {
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
  lista: HistorialFormularioData[];
}

export interface HistorialFormularioData {
  readonly id : number;
  readonly nombreEncuesta: string;
  readonly fechaInicio: string;
  readonly fechaFin: string;
}
