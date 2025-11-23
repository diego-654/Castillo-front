

export interface FormularioEventoRequest {
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
  readonly label?: string;
  readonly labelExtra?: string;
  readonly formControlName?: string;
  readonly type: TipoInputType;
}

export enum TipoInputType {
  TEXT,
  NUMBER,
  DATE,
  BOOLEAN,
}


export interface OptionSelect {
  readonly id: number;
  readonly nombre: string;
}
