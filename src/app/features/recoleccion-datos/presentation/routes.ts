

export const RECOLECCION_DATOS_ROUTES = {
  path: 'recoleccion-datos',
  // component: RecoleccionDatos,
  children: [
    {
      path: '',
      loadComponent: () =>
        import(
          '@features/recoleccion-datos/presentation/pages/recoleccion-datos/recoleccion-datos'
        ),
    }
  ]
};
