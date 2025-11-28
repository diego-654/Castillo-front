export interface ConsultaRucResponseDto {
  readonly estado: boolean;
  readonly icono: string;
  readonly message: string;
  readonly data: Data;
}

export interface Data {
  readonly id: number;
  readonly nombre: string;
  readonly documento: string;
  readonly tipo: string;
}
