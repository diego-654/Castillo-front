

export interface EditarMembresiaRequestDto {
  readonly titulo: string;
  readonly listaBeneficios: ListaBeneficios[];
}

export interface ListaBeneficios {
  readonly id: number;
  readonly tipoDia: string;
}

