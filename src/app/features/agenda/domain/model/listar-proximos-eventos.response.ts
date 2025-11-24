


export interface ListarProximosEventosResponse {
  proximosEventos: ProximosEvento[];
}

export interface ProximosEvento {
  id: number;
  img: string;
  nombre: string;
  horaOrFecha: string;
  tipo: string;
}
