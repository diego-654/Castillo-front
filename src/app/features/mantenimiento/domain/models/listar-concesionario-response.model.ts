export interface ListarConcesionarioResponse {
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
  lista: ConcesionarioData[];
}

export interface ConcesionarioData {
  readonly id : number;
  readonly servicio: string;
  readonly proveedor: string;
  readonly nombreEmpresa: string;
  readonly estado: string;
}
