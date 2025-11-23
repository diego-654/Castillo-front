

export interface FormularioEventoRequest {
  id: number;
  lista: FormularioClienteRequestItem[];
}

export interface FormularioClienteRequestItem {
  typeFormulario?: string;
  campos: {
    lista: FormularioClienteRequestCampo[];
  };
}

export interface FormularioClienteRequestCampo {
  label: string;
  extras?: string;
  isRequired?: boolean;
  type: TipoInputType;
}

export enum TipoInputType {
  TEXT,
  NUMBER,
  DATE,
  BOOLEAN
}
