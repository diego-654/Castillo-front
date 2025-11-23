import { CustomColumn } from "@core/classes/column.model";
import { FacturacionColumnName } from "@features/finanzas/domain/models/facturacion-column-column-name.model";


export type Column = CustomColumn<
  FacturacionColumnName
>;
export type Columns = Column[];

export const FacturacionColumns: Columns = [
  {
    name: 'nombre',
    label: 'Nombre ',
    minWidth: 310,

  },
  {
    name: 'factura',
    label: 'Factura',
    minWidth: 150,
  },
  {
    name: 'membresia',
    label: 'Membresia',
    minWidth: 310,
  },
  {
    name: 'fecha',
    label: 'Fecha',
    minWidth: 180,
  },
  {
    name: 'acciones',
    label: 'Acciones',
    minWidth: 150,
  },
];
