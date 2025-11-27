

export interface GuardarRespuestasRequestDto {

  readonly jRespuestas: JRespuestas[];

}

export interface JRespuestas {
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
  respuesta: string | number | boolean | Date | null;
}
