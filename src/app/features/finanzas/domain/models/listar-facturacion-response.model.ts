export  interface ListarFacturacionResponse {
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
  lista: FacturacionData[];
}

export interface FacturacionData {
  readonly id : number;
  readonly nombre: string;
  readonly factura: string;
  readonly membresia: string;
  readonly fecha: string;
}
