import { FinanzasLayout } from './layout/finanzas-layout/finanzas-layout';



export const FINANZAS_ROUTES = {
  path: 'finanzas',
  component: FinanzasLayout,
  children: [
    {
      path: 'facturacion',
      loadComponent: () =>
        import('@features/finanzas/presentation/pages/facturacion/facturacion'),
    },
    {
      path: '**',
      redirectTo: 'notificaciones',
    },
  ],
};
