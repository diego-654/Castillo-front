export const INTERESADOS_ROUTES = {
  path: 'interesados',
  // component: Interesados,
  children: [
    {
      path: '',
      loadComponent: () =>
        import(
          '@features/interesados/presentation/pages/interesados/interesados'
        ),
    }
  ]
};
