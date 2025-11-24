import { LayoutRecoleccionDatos } from './components/layout-recoleccion-datos/layout-recoleccion-datos';


export const RECOLECCION_DATOS_ROUTES = {
  path: 'recoleccion-datos',
  component: LayoutRecoleccionDatos,
  children: [

    {
      path: '',
      loadComponent: () =>
        import(
          '@features/recoleccion-datos/presentation/pages/recoleccion-datos/recoleccion-datos'
        ),
    },
    {
      path: 'formulario/editar/:id',
      loadComponent: () =>
        import(
          '@features/recoleccion-datos/presentation/pages/formulario-registro-cliente/formulario-registro-cliente'
        ),
    },
    {
      path: 'formulario/:id',
      loadComponent: () =>
        import(
          '@features/recoleccion-datos/presentation/pages/formulario-registro-cliente/formulario-registro-cliente'
        ),
    },
    {
      path: '**',
      redirectTo: '',
    }
  ]
};
