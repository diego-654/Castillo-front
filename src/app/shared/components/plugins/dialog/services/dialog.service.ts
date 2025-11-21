import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogConfig } from '../config/dialog-config';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { DialogRef } from '../ref/dialog-ref';
import {
  DIALOG_CHILD_COMPONENT,
  DIALOG_CONFIG,
  DIALOG_DATA,
} from '../token/dialog-token';

@Injectable({ providedIn: 'root' })
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: DialogConfig<D>
  ): DialogRef<T, R> {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: config?.hasBackdrop ?? true,
      backdropClass: config?.backdropClass ?? 'cdk-overlay-dark-backdrop',
      panelClass: config?.panelClass ?? 'custom-dialog-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.buildPositionStrategy(config),
    });

    // ✅ Crear el overlay
    const overlayRef = this.overlay.create(overlayConfig);

    const dialogRef = new DialogRef<T, R>();

    // ✅ Cerrar con ESC si está permitido
    overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape' && !config?.disableClose) {
        dialogRef.close(undefined as any);
      }
    });

    // ✅ Cerrar con clic en el fondo si está permitido
    if (!config?.disableClose) {
      overlayRef
        .backdropClick()
        .subscribe(() => dialogRef.close(undefined as any));
    }

    const injector = this.createInjector(dialogRef, component, config);

    // ✅ Crear el contenedor
    const containerPortal = new ComponentPortal(DialogContainerComponent);
    const containerRef = overlayRef.attach(
      new ComponentPortal(DialogContainerComponent, null, injector)
    );

    // ✅ Crear el componente hijo
    const contentRef = containerRef.instance.viewContainerRef.createComponent(
      component,
      {
        injector,
      }
    );

    dialogRef.onCloseFn = () => {
      overlayRef.dispose();
    };
    dialogRef.componentInstance = contentRef.instance;
    return dialogRef;
  }

  private createInjector<D>(
    dialogRef: DialogRef<any>,
    childComponent: any,
    config?: DialogConfig<D>
  ): Injector {
    return Injector.create({
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_CHILD_COMPONENT, useValue: childComponent },
        { provide: DIALOG_CONFIG, useValue: config },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
      parent: this.injector,
    });
  }

  private buildPositionStrategy(
    config?: DialogConfig
  ): OverlayConfig['positionStrategy'] {
    const strategy = this.overlay.position().global();

    if (config?.position?.top) strategy.top(config?.position.top);
    else strategy.centerVertically();

    if (config?.position?.left) strategy.left(config?.position.left);
    else strategy.centerHorizontally();

    if (config?.position?.right) strategy.right(config?.position.right);
    if (config?.position?.bottom) strategy.bottom(config?.position.bottom);

    return strategy;
  }
}

export declare interface ComponentType<T> {
  new (...args: any[]): T;
}
