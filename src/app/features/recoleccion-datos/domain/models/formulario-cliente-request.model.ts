import { TipoInputType } from "./formulario-cliente-response.model";


export interface FormularioClienteRequest {
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
  isRequired: boolean;
  type: TipoInputType;
  respuesta: string | number | boolean | Date | null;
}
