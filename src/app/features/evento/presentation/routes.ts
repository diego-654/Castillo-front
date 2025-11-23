import LayoutEvento from './components/layout-evento/layout-evento';


export const EVENTOS_ROUTES = {
  path: 'eventos',
  component: LayoutEvento,
  children: [
    {
      path: 'formulario',
      loadComponent: () =>
        import(
          '@features/evento/presentation/pages/formulario/formulario'
        ),
    },
    {
      path: 'historial',
      loadComponent: () =>
        import(
          '@features/evento/presentation/pages/historial-formulario/historial-formulario'
        ),
    },
    {
      path: '**',
      redirectTo: 'formulario',
    }
  ]
};
