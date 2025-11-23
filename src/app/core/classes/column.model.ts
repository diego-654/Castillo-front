export interface BaseColumn {
  label: string;
  minWidth: number;
  maxWidth?: number;
}

export type CustomColumn<ColumnName extends string = string> = BaseColumn & {
  name: ColumnName;
};

export type GenericColumn = CustomColumn;
export type GenericColumns = GenericColumn[];
