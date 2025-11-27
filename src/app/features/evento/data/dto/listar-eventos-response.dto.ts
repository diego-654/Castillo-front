export interface ListarEventosResponseDto {
  readonly estado: boolean;
  readonly icono: string;
  readonly message: string;
  readonly data: Datum[];
}

export interface Datum {
  readonly id: number;
  readonly titulo: string;
  readonly fecha_inicio: string;
  readonly fecha_fin: string;
  readonly fecha: string;
  readonly jPreguntas: JPregunta[];
  readonly usuario: number;
}

export interface JPregunta {
  readonly campos: Campos;
  readonly typeFormulario?: string;
}

export interface Campos {
  readonly lista: Lista[];
}

export interface Lista {
  readonly type: number;
  readonly label: string;
  readonly isRequired: boolean;
  readonly extras?: string;
}
