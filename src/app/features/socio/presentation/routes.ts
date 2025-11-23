import { DetalleSocioLayout } from "./components/detalle-socio-layout/detalle-socio-layout";
import { LayoutSocio } from "./components/layout-socio/layout-socio";


export const SOCIOS_ROUTES = {
  path: 'socios',
  component: LayoutSocio,
  children: [
    {
      path: '',
      loadComponent: () =>
        import(
          '@features/socio/presentation/pages/lista-miembros/lista-miembros'
        ),
    },
    {
      path: ':id',
      component: DetalleSocioLayout,
      children: [
        {
          path: 'general',
          loadComponent: () =>
            import('@features/socio/presentation/pages/detalle-socio-general/detalle-socio-general')
        },
        {
          path: 'membresia',
          loadComponent: () =>
            import('@features/socio/presentation/pages/detalle-socio-membresia/detalle-socio-membresia')
        },
        {
          path: 'pagos',
          loadComponent: () =>
            import('@features/socio/presentation/pages/detalle-socio-pagos/detalle-socio-pagos')
        },
        { path: '**', redirectTo: 'general' }
      ]
    },
    {
      path: '**',
      redirectTo: '',
    }
  ],

}

