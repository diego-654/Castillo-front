export interface ListarMembresiasResponseDto {
  readonly estado: boolean;
  readonly icono: string;
  readonly message: string;
  readonly data: MembresiaDto[];
}

export interface MembresiaDto {
  readonly id: number;
  readonly titulo: string;
  readonly id_tipo_beneficio: number;
  readonly listaBeneficios: MembresiaBeneficioDto[];
}

export interface MembresiaBeneficioDto {
  readonly id: number;     // id del beneficio (1..11, 12..16, etc.)
  readonly tipoDia: string; // "1 vez al mes", "4 Por mes", "asd", o ""
}
