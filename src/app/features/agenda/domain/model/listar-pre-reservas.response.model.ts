


export interface ListarPreReservasResponse {
  preReservas: PreReserva[];

}

export interface PreReserva {
  id: number;
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  fechaConfirmacion: string;
}
