export interface BaseColumn {
  label: string;
  isVisible: boolean;
  isLocked?: boolean;
  minWidth: number;
  internalWidth?: number;
  realWidth?: number;
  maxWidth?: number;
  alwaysVisible?: boolean;
  isFixed?: boolean;
  left?: number;
  isConfigurable?: boolean;
}

interface SortableColumn<Name extends string> extends BaseColumn {
  name: Name;
  isSortable?: true;
}

interface NonSortableColumn<Name extends string> extends BaseColumn {
  name: Name;
  isSortable?: false;
}

interface SearchableColumn<Name extends string> extends BaseColumn {
  name: Name;
  isSearcheable?: true;
}

interface NonSearchableColumn<Name extends string> extends BaseColumn {
  name: Name;
  isSearcheable?: false;
}

export type CustomColumn<
  ColumnName extends string = string,
  Sortable extends ColumnName = ColumnName,
  Searchable extends ColumnName = ColumnName
> =
  | (SortableColumn<Sortable> & SearchableColumn<Searchable>)
  | (SortableColumn<Sortable> & NonSearchableColumn<ColumnName>)
  | (NonSortableColumn<ColumnName> & SearchableColumn<Searchable>)
  | (NonSortableColumn<ColumnName> & NonSearchableColumn<ColumnName>);


export type GenericColumn = CustomColumn;
export type GenericColumns = GenericColumn[];
