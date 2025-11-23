import { CustomColumn } from "@core/classes/column.model";
import { HistorialFormularioColumnName } from "@features/evento/domain/models/historial-formulario-column-name.model";


export type Column = CustomColumn<
  HistorialFormularioColumnName
>;
export type Columns = Column[];

export const HistorialFormularioColumns: Columns = [
  {
    name: 'nombreEncuesta',
    label: 'Nombre de la encuesta',
    minWidth: 490,

  },
  {
    name: 'fechaInicio',
    label: 'Fecha Inicio',
    minWidth: 200,
  },
  {
    name: 'fechaFin',
    label: 'Fecha Fin',
    minWidth: 200,
  },
  {
    name: 'acciones',
    label: 'Acciones',
    minWidth: 200,
  },
];
