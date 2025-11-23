

export interface ListarMembresiasResponse {
  readonly lista: ListarMembresias[];
}

export interface ListarMembresias {
  readonly id: number;
  readonly nombre: string;
}
