import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { AgendaDatasourceImpl } from '@features/agenda/data/datasources/agenda.datasource.impl';
import { AgendaRepositoryImpl } from '@features/agenda/data/repositories/agenda.repository.impl';
import { AgendaDatasource } from '@features/agenda/domain/datasources/agenda.datasource';
import { AgendaRepository } from '@features/agenda/domain/repositories/agenda.repository';
import { MantenimientoRepository } from '@features/mantenimiento/domain/repositories/mantenimiento.repository';
import { MantenimientoRepositoryImpl } from '@features/mantenimiento/data/repositories/mantenimiento.repository.impl';
import { MantenimientoDatasourceImpl } from '@features/mantenimiento/data/datasources/mantenimiento.datasource.impl';
import { MantenimientoDatasource } from '@features/mantenimiento/domain/datasources/mantenimiento.datasource';
import { ReportesDataSourceImpl } from '@features/reportes/data/datasources/reportes.datasource.impl';
import { ReportesRepositoryImpl } from '@features/reportes/data/repositories/reportes.repository.impl';
import { ReportesDataSource } from '@features/reportes/domain/datasources/reportes.datasources';
import { ReportesRepository } from '@features/reportes/domain/repositories/reportes.repository';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from '@core/interceptor/error/error.interceptor';
import { SunatDatasourceImpl } from '@features/sunat/data/datasources/sunat.datasource.impl';
import { SunatRepositoryImpl } from '@features/sunat/data/repositories/sunat.repository.impl';
import { SunatDatasource } from '@features/sunat/domain/datasources/sunat.datasource';
import { SunatRepository } from '@features/sunat/domain/repositories/sunat.repository';

registerLocaleData(localeEsPe);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },  // <-- PARA PIPES DE CURRENCY
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },

    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorInterceptor])
    ),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),

    { provide: RecoleccionDatosRepository, useClass: RecoleccionDatosRepositoryImpl },
    { provide: RecoleccionDatosDatasource, useClass: RecoleccionDatosDatasourceImpl },
    { provide: EventoRepository, useClass: EventoRepositoryImpl },
    { provide: EventoDatasource, useClass: EventoDatasourceImpl },
    { provide: SocioRepository, useClass: SocioRepositoryImpl },
    { provide: SocioDatasource, useClass: SocioDatasourceImpl },
    { provide: InteresadosRepository, useClass: InteresadosRepositoryImpl },
    { provide: InteresadosDataSource, useClass: InteresadosDataSourcesImp },
    { provide: FinanzasRepository, useClass: FinanzasRepositoryImpl },
    { provide: FinanzasDatasource, useClass: FinanzasDatasourceImpl },
    { provide: AgendaRepository, useClass: AgendaRepositoryImpl },
    { provide: AgendaDatasource, useClass: AgendaDatasourceImpl },
    { provide: MantenimientoRepository, useClass: MantenimientoRepositoryImpl },
    { provide: MantenimientoDatasource, useClass: MantenimientoDatasourceImpl },
    { provide: ReportesRepository, useClass: ReportesRepositoryImpl },
    { provide: ReportesDataSource, useClass: ReportesDataSourceImpl },
    { provide: SunatRepository, useClass: SunatRepositoryImpl },
    { provide: SunatDatasource, useClass: SunatDatasourceImpl },
  ]
};

