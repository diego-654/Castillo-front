

export interface ListaMiembrosActivosResponse {
  readonly lista: ListaMiembrosActivos[];
}

export interface ListaMiembrosActivos {
  readonly id: number;
  readonly estado: string;
  readonly estadoId: number;
  readonly nombre: string;
  readonly apellidos: string;
  readonly email: string;
  readonly celular: string;
  readonly membresia: string;
  readonly fechaInicio: string;
}
