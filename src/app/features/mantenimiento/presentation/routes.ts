import LayoutMantenimiento from "./components/layout-mantenimiento/layout-mantenimiento";



export const MANTENIMIENTO_ROUTES = {
  path: 'mantenimiento',
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
    {
      path: '**',
      redirectTo: 'membresias',
    },
  ],
}
