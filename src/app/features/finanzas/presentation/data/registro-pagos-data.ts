import { CustomColumn } from "@core/classes/column.model";
import { RegistroPagosColumnName } from "@features/finanzas/domain/models/registro-pagos-column-name.model";

export type Column = CustomColumn<
  RegistroPagosColumnName
>;
export type Columns = Column[];

export const RegistroPagosColumns: Columns = [
  {
    name: 'nombre',
    label: 'Nombre ',
    minWidth: 310,

  },
  {
    name: 'metodo',
    label: 'Método',
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
