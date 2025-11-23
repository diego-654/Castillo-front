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
      path: '**',
      redirectTo: '',
    }
  ],

}
