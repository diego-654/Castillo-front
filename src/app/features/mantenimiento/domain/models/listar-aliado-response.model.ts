export interface ListarAliadoResponse {
  paginacion: {
    paginaNro: number;
    paginasTotal: number;
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
