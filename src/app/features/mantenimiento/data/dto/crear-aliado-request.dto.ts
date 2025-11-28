

export interface CrearAliadoRequestDto {
  readonly ruc: string;
  readonly nombre: string;
  readonly fecha_inicio: Date;
  readonly representante: string;
  readonly celular: string;
  readonly email: string;
  readonly direccion: string;
  readonly tipo_aliado: number;
}

