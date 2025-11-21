import { Routes } from '@angular/router';
import { InternalLayout } from './shared/layouts/internal-layout/internal-layout';
import { RECOLECCION_DATOS_ROUTES } from '@features/recoleccion-datos/presentation/routes';

export const routes: Routes = [
  {
    path: '',
    component: InternalLayout,
    children: [
      RECOLECCION_DATOS_ROUTES,
    ],
  }
];

