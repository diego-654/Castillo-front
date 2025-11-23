

export interface ObtenerDatosMembresiaResponse {

  readonly id: number;
  readonly tipoPlan: string;
  readonly montoMensual: number;
  readonly fechaInicio: string;
  readonly fechaVencimiento: string;
  readonly renovacionAutomatica: boolean;

}
