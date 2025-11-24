export  interface ListarRegistroPagosResponse {
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
  lista: RegistroPagosData[];
}

export interface RegistroPagosData {
  readonly id : number;
  readonly nombre: string;
  readonly metodo: string;
  readonly membresia: string;
  readonly fecha: string;
}
