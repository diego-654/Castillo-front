

export interface FormularioClienteResponse {
  readonly id: number;
  readonly lista: FormularioClienteResponseInputs[];
}

export interface FormularioClienteResponseInputs {
  readonly typeFormulario?: string;
  readonly campos: ListTypeInputs;
}

export interface ListTypeInputs {
  readonly lista: TipoInput[];
}

export interface TipoInput {
  readonly label: string;
  readonly extras?: string;
  readonly isRequired: boolean;
  readonly type: TipoInputType;
}

export enum TipoInputType {
  TEXT,
  NUMBER,
  DATE,
  BOOLEAN
}
