import { Routes } from '@angular/router';
import { InternalLayout } from './shared/layouts/internal-layout/internal-layout';
import { RECOLECCION_DATOS_ROUTES } from '@features/recoleccion-datos/presentation/routes';
import { INTERESADOS_ROUTES } from '@features/interesados/presentation/routes';
import { EVENTOS_ROUTES } from '@features/evento/presentation/routes';

export const routes: Routes = [
  {
    path: '',
    component: InternalLayout,
    children: [
      RECOLECCION_DATOS_ROUTES,
      INTERESADOS_ROUTES,
      EVENTOS_ROUTES,
    ],
  },

];

