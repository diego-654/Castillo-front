export interface ListarAliadoResponse {
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
  lista: AliadoData[];
}

export interface AliadoData {
  readonly id : number;
  readonly nombre: string;
  readonly tipo: string;
  readonly nombreEmpresa: string;
  readonly fecha: Date;
}
