import { LayoutDetalleAliado } from "./components/layout-detalle-aliado/layout-detalle-aliado";
import LayoutMantenimiento from "./components/layout-mantenimiento/layout-mantenimiento";



export const MANTENIMIENTO_ROUTES = {
  path: 'mantenimiento',
  children: [
    {
      path: '',
      component: LayoutMantenimiento,
      children: [
        {
          path: 'membresias',
          loadComponent: () =>
            import('@features/mantenimiento/presentation/pages/membresias-mantenimiento/membresias-mantenimiento'),
        },
        {
          path: 'aliados',
          loadComponent: () =>
            import('@features/mantenimiento/presentation/pages/aliados-mantenimiento/aliados-mantenimiento'),
        },
        {
          path: 'concesionarios',
          loadComponent: () =>
            import('@features/mantenimiento/presentation/pages/concesionarios-mantenimiento/concesionarios-mantenimiento'),
        },

      ]
    },
    {
      path: 'detalle',
      component: LayoutDetalleAliado,
      children: [
        {
          path: ':id',
          loadComponent: () =>
            import('@features/mantenimiento/presentation/pages/detalle-usuario/detalle-usuario'),
        }
      ]
    },
    {
      path: '**',
      redirectTo: 'membresias',
    },
  ],
}
