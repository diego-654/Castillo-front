

export interface ObtenerDatosPagosResponse {

  readonly id: number;
  readonly plan: string;
  readonly monto: number;
  readonly proximoPago: string;

  readonly historialPagos: ObtenerDatosPagosHistorial[];

}

export interface ObtenerDatosPagosHistorial {
  readonly id: number;
  readonly fecha: string;
  readonly descripcion: string;
  readonly formaPago: string;
  readonly total: number;

}
