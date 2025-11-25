import { CustomColumn } from "@core/classes/column.model";
import { AliadoColumnName } from "@features/mantenimiento/domain/models/aliado-column-name.model";

export type Column = CustomColumn<
  AliadoColumnName
>;
export type Columns = Column[];

export const AliadosColumns: Columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    minWidth: 310,

  },
  {
    name: 'tipo',
    label: 'Tipo',
    minWidth: 150,
  },
  {
    name: 'nombreEmpresa',
    label: 'Nombre de la empresa',
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
