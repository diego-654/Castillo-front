import { InteresadosLayout } from './layout/interesados-layout/interesados-layout';

export const INTERESADOS_ROUTES = {
  path: 'interesados',
  component: InteresadosLayout,
  children: [
    {
      path: 'datos-obtenidos',
      loadComponent: () =>
        import('@features/interesados/presentation/pages/datos-obtenidos/datos-obtenidos'),
    },
    {
      path: '**',
      redirectTo: 'datos-obtenidos',
    },
  ],
};
