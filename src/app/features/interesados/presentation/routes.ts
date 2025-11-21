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
      path: 'formulario',
      loadComponent: () => import('@features/interesados/presentation/pages/formulario/formulario'),
    },
    {
      path: 'historial-formulario',
      loadComponent: () =>
        import(
          '@features/interesados/presentation/pages/historial-formulario/historial-formulario'
        ),
    },
    {
      path: '**',
      redirectTo: 'datos-obtenidos',
    },
  ],
};
