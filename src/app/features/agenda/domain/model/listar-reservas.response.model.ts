


export interface ListarReservasResponse {
  reservas: Reserva[];

}

export interface Reserva {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  fechaConfirmacion: string;
}
