import { CrearNuevaMembresiaRequest } from "./crear-membresia-request.model";

export interface EditarMembresiaRequest extends CrearNuevaMembresiaRequest {
  id: number;
}
