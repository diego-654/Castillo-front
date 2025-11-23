import { InjectionToken } from '@angular/core';

/**
 * Token que representa el componente hijo que se va a renderizar dentro del DialogWrapper.
 * Es inyectado dinámicamente y renderizado con `ComponentFactoryResolver` o `ComponentPortal`.
 *
 * Ej: TablaEjemplo2Component, ConfirmDialogComponent, etc.
 */
export const DIALOG_CHILD_COMPONENT = new InjectionToken<any>(
  'DIALOG_CHILD_COMPONENT'
);

/**
 * Token que contiene toda la configuración personalizada del diálogo (como ancho, alto, clases CSS, posición, etc).
 * Se define en la llamada a `dialogService.open()` y se puede inyectar si necesitas leerla desde dentro del wrapper o del componente hijo.
 *
 * Ejemplo de uso típico:
 *  - config.width
 *  - config.disableClose
 */
export const DIALOG_CONFIG = new InjectionToken<any>('DIALOG_CONFIG');

/**
 * Token que representa los datos (inputs) que se le pasan al componente hijo dentro del diálogo.
 * Similar a los `@Input()` pero inyectables.
 *
 * Se accede desde el componente hijo usando:
 * `const data = inject<DialogDataInput>(DIALOG_DATA);`
 */
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
