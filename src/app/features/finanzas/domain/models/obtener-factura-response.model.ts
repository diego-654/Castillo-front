import { CrearFacturaRequest } from "./crear-factura-request.model";

export interface ObtenerFacturaResponse extends CrearFacturaRequest{
  id: number;
}
