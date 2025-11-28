export interface ListarBeneficiosResponseDto {
  readonly estado: boolean;
  readonly icono: string;
  readonly message: string;
  readonly data: Datum[];
}

export interface Datum {
  readonly id: number;
  readonly titulo: string;
  readonly beneficios: Beneficio[];
}

export interface Beneficio {
  readonly id: number;
  readonly titulo: string;
}
