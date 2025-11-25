import { CustomColumn } from "@core/classes/column.model";
import { ConcesionarioColumnName } from "@features/mantenimiento/domain/models/concesionario-column-name.model";

export type Column = CustomColumn<
  ConcesionarioColumnName
>;
export type Columns = Column[];

export const ConcesionariosColumns: Columns = [
  {
    name: 'servicio',
    label: 'Servicio',
    minWidth: 200,

  },
  {
    name: 'proveedor',
    label: 'Proveedor',
    minWidth: 260,
  },
  {
    name: 'nombreEmpresa',
    label: 'Nombre de la empresa',
    minWidth: 310,
  },
  {
    name: 'estado',
    label: 'Estado',
    minWidth: 180,
  },
  {
    name: 'acciones',
    label: 'Acciones',
    minWidth: 150,
  },
];
