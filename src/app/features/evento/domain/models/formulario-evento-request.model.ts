

export interface FormularioEventoRequest {
  lista: FormularioClienteRequestItem[];
  nombreEncuesta: string;
  fechaInicio: Date | null;
  fechaFin: Date | null;
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
  isRequired: boolean;
  type: TipoInputType;
}

export enum TipoInputType {
  TEXT,
  NUMBER,
  DATE,
  BOOLEAN
}
