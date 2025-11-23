export const estadosData = [
  {
    value: null,
    label: 'Todos',
  },
  {
    value: true,
    label: 'Activo',
  },
  {
    value: false,
    label: 'Inactivo',
  },
];

export interface Estado {
  value: boolean | null;
  label: string;
}
