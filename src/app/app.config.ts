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
import { EventoDatasourceImpl } from '@features/evento/data/datasources/evento.datasource.impl';
import { EventoRepositoryImpl } from '@features/evento/data/repositories/evento.repository.impl';
import { EventoDatasource } from '@features/evento/domain/datasources/evento.datasource';
import { EventoRepository } from '@features/evento/domain/repositories/evento.repository';
import { SocioDatasourceImpl } from '@features/socio/data/datasources/socio.datasource.impl';
import { SocioRepositoryImpl } from '@features/socio/data/repositories/socio.repository.impl';
import { SocioDatasource } from '@features/socio/domain/datasources/socio.datasource';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { InteresadosRepositoryImpl } from '@features/interesados/data/repositories/interesados.repository.impl';
import { InteresadosRepository } from '@features/interesados/domain/repositories/interesados.repository';
import { InteresadosDataSource } from '@features/interesados/domain/datasources/interesados.datasource';
import { InteresadosDataSourcesImp } from '@features/interesados/data/datasources/interesados.datasources.imp';
import { FinanzasDatasourceImpl } from '@features/finanzas/data/datasources/finanza.datasource.impl';
import { FinanzasRepositoryImpl } from '@features/finanzas/data/repositories/finanza.repository.impl';
import { FinanzasDatasource } from '@features/finanzas/domain/datasources/finanzas.datasource';
import { FinanzasRepository } from '@features/finanzas/domain/repositories/finanzas.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    {provide: RecoleccionDatosRepository, useClass: RecoleccionDatosRepositoryImpl},
    {provide: RecoleccionDatosDatasource, useClass: RecoleccionDatosDatasourceImpl},
    {provide: EventoRepository, useClass: EventoRepositoryImpl},
    {provide: EventoDatasource, useClass: EventoDatasourceImpl},
    {provide: SocioRepository, useClass: SocioRepositoryImpl},
    {provide: SocioDatasource, useClass: SocioDatasourceImpl},
    {provide: InteresadosRepository, useClass: InteresadosRepositoryImpl},
    {provide: InteresadosDataSource, useClass: InteresadosDataSourcesImp},
    {provide: FinanzasRepository, useClass: FinanzasRepositoryImpl},
    {provide: FinanzasDatasource, useClass: FinanzasDatasourceImpl},
  ]
};

