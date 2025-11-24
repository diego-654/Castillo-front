import LayoutAgenda from './components/layout-agenda/layout-agenda';



export const AGENDA_ROUTES = {
  path: 'agenda',
  component: LayoutAgenda,
  children: [
    {
      path: '',
      loadComponent: () =>
        import(
          '@features/agenda/presentation/pages/agenda/agenda'
        ),
    },
    {
      path: '**',
      redirectTo: '',
    }
  ]
};



