import { LayoutReportes } from "./layout/layout-reportes/layout-reportes";


export const REPORTES_ROUTES = {
  path: 'reportes',
  component: LayoutReportes,
  children: [
    {
      path: '',
      loadComponent: () =>
        import(
          '@features/reportes/presentation/pages/reportes/reportes'
        ),
    },
    {
      path: '**',
      redirectTo: '',
    }
  ]
}
