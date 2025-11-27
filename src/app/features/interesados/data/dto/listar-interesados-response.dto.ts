export interface ListarInteresadosResponseDto {
  readonly estado: boolean;
  readonly icono: string;
  readonly message: string;
  readonly data: Datum[];
}

export interface Datum {
  readonly id: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly edad: number;
  readonly fecha_nacimiento: Date;
  readonly ciudad: string;
  readonly fecha_finalizacion: Date;
  readonly email: string;
  readonly telefono: string;
  readonly interesado_membresia: boolean;
  readonly contacto_wsp: boolean;
  readonly jRespuestas: JRespuesta[];
  readonly jOtros: JOtros;
  readonly fecha_registro: string;
  readonly id_evento: number;
  readonly evento: string;
}

export interface JOtros {
}

export interface JRespuesta {
  readonly campos: Campos;
  readonly typeFormulario?: string;
}

export interface Campos {
  readonly lista: Lista[];
}

export interface Lista {
  readonly type: number;
  readonly label: string;
  readonly respuesta: boolean | number | string;
  readonly isRequired: boolean;
  readonly extras?: string;
}
