export interface CrearEventoRequestDto {
  readonly titulo: string;
  readonly fecha_inicio: string;
  readonly fecha_fin: string;
  readonly jPreguntas: JPreguntasLista[];
}



export interface JPreguntasLista {
  readonly typeFormulario?: string;
  readonly campos: Campos;
}

export interface Campos {
  readonly lista: CamposLista[];
}

export interface CamposLista {
  readonly label: string;
  readonly isRequired: boolean;
  readonly isCampoNuevo: boolean;
  readonly isVisible: boolean;
  readonly type: number;
  readonly extras?: string;
}
