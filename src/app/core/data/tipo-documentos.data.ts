export const tiposDocumento: Array<{
  value: TipoDocumento;
  label: string;
}> = [
  {
    value: 'dni',
    label: 'DNI',
  },
  {
    value: 'ruc',
    label: 'RUC',
  },
  {
    value: 'carnetExtranjeria',
    label: 'CARNET DE EXTRANJERÍA',
  },
];

export type TipoDocumento = 'dni' | 'ruc' | 'carnetExtranjeria';
