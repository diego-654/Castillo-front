import { Injectable, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
// import { PopUpConfirmacionComponent } from '@shared/components';
import { LoaderService } from '../../plugins/loader';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  // private _snackBarService = inject(SnackbarService);
  private _loaderService = inject(LoaderService);
  private _dialog = inject(MatDialog);

  // openSnackBar(message: string, type: 'success' | 'error' | 'info' = 'info') {
  //   this._snackBarService.show(message, type);
  // }

  showLoader() {
    this._loaderService.showLoader();
  }

  dismissLoader() {
    this._loaderService.dismissLoader();
  }


  // confirmarEliminar(callback: (result: any) => void) {
  //   const dialogRef = this._dialog.open(PopUpConfirmacionComponent, {
  //     width: '477px',
  //     maxWidth: '100%',
  //     maxHeight: '100%',
  //     autoFocus: false,
  //     restoreFocus: false,

  //     data: {
  //       title: 'Eliminar registro',
  //       subTitle:
  //         '¿Estas seguro que deseas eliminar el registro seleccionado? No se podrá recuperar dicha información.',
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       callback(result);
  //     }
  //   });
  // }



  getAllErrors(form: FormGroup | FormArray, fieldPath = ''): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      const newPath = fieldPath ? `${fieldPath}.${key}` : key;

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getAllErrors(control, newPath);
      } else if (control?.errors) {
        console.log(`Error en ${newPath}:`, control.errors);
      }
    });
  }

  descargarBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  imprimirBlob(blob: Blob) {
    // 1. Crear URL desde el blob
    const fileURL = URL.createObjectURL(blob);

    // 2. Abrir en una nueva ventana
    const printWindow = window.open(fileURL);

    if (printWindow) {
      // 3. Cuando cargue, enfocar e imprimir
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        // (Opcional) Revocar URL tras un pequeño retardo
        setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
      };
    }
  }

  imprimirHtml(html: string) {
    // 1. Abrimos una ventana en blanco
    const printWindow = window.open(
      '',
      '_blank',
      'top=0,left=0,height=100%,width=auto'
    );

    if (!printWindow) {
      console.error('No se pudo abrir la ventana de impresión');
      return;
    }

    // 2. Escribimos un documento HTML completo (incluyendo <head> si quieres estilos globales)
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();

    // 3. Esperamos a que esté cargado y lanzamos el diálogo de impresión
    printWindow.focus();
    printWindow.onload = () => {
      printWindow.print();
      // Opcional: cerrar la ventana después de imprimir
      printWindow.close();
    };
  }
}
