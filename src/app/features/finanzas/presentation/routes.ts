import { FinanzasLayout } from './layout/finanzas-layout/finanzas-layout';

export const FINANZAS_ROUTES = {
  path: 'finanzas',
  component: FinanzasLayout,
  children: [
    {
      path: 'notificaciones',
      loadComponent: () =>
        import('@features/finanzas/presentation/pages/notificaciones/notificaciones'),
    },

    {
      path: 'facturacion',
      loadComponent: () => import('@features/finanzas/presentation/pages/facturacion/facturacion'),
    },
    {
      path: 'registro-pagos',
      loadComponent: () =>
        import('@features/finanzas/presentation/pages/registro-pagos/registro-pagos'),
    },
    {
      path: '**',
      redirectTo: 'notificaciones',
    },
  ],
};
