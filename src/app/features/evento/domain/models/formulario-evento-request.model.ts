

export interface FormularioEventoRequest {
  readonly id: number;
  readonly lista: FormularioClienteResponseInputs[];
}

export interface FormularioClienteResponseInputs {
  readonly typeFormulario: string;
  readonly campos: ListTypeInputs;
}

export interface ListTypeInputs {
  readonly lista: TipoInput[];
}

export interface TipoInput {
  readonly nombre: string;
  readonly type: TipoInputType;
}

export enum TipoInputType {
  TEXT,
  NUMBER,
  DATE,
}


export interface OptionSelect {
  readonly id: number;
  readonly nombre: string;
}
