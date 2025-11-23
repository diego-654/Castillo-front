import { InteresadosColumnName } from "./interesados-column-name.model";

export interface ListarInteresadosRequest {
  paginacion: {
    paginaNro: number;
    paginaTamanio: number;
  };
}
