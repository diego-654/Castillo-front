import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { RecoleccionDatosRepository } from '@features/recoleccion-datos/domain/repositories/recoleccion-datos.repository';
import { RecoleccionDatosRepositoryImpl } from '@features/recoleccion-datos/data/repositories/recoleccion-datos.repository.impl';
import { RecoleccionDatosDatasource } from '@features/recoleccion-datos/domain/datasources/recoleccion-datos.datasources';
import { RecoleccionDatosDatasourceImpl } from '@features/recoleccion-datos/data/datasources/recoleccion-datos.datasource.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    {provide: RecoleccionDatosRepository, useClass: RecoleccionDatosRepositoryImpl},
    {provide: RecoleccionDatosDatasource, useClass: RecoleccionDatosDatasourceImpl},
  ]
};

