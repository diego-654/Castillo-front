
export interface EventoFormularioResponse {
  readonly listaEventos: EventosFormulario[];
}

export interface EventosFormulario {
  readonly id: number;
  readonly nombre: string;
}
