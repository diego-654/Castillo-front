import { CustomColumn } from "@core/classes/column.model";
import { InteresadosColumnName } from "@features/interesados/domain/models/interesados-column-name.model";


export type Column = CustomColumn<
  InteresadosColumnName
>;
export type Columns = Column[];

export const InteresadosColumns: Columns = [
  {
    name: 'nombre',
    label: 'Nombre',
    minWidth: 210,

  },
  {
    name: 'telefono',
    label: 'Telefono',
    minWidth: 150,
  },
  {
    name: 'trabajador',
    label: 'Trabajador',
    minWidth: 150,
  },
  {
    name: 'fecharegistro',
    label: 'Fecha de registro',
    minWidth: 180,
  },
  {
    name: 'evento',
    label: 'Evento',
    minWidth: 200,
  },
  {
    name: 'acciones',
    label: 'Acciones',
    minWidth: 150,
  },
];
