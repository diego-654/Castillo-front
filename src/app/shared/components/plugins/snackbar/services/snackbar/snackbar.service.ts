import { Injectable, signal } from '@angular/core';
import { generateRandomString } from '../../functions/generate-random-string';
import { Snackbar } from '../../interfaces/snackbar.interface';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  snackbars = signal<Snackbar[]>([]);

  show(
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
    autoClose = true
  ) {
    const id = generateRandomString(30);

    this.snackbars.update((value: Snackbar[]) => {
      return [
        ...value,
        {
          id: id,
          message: message,
          type: type,
        },
      ];
    });

    if (autoClose) {
      setTimeout(() => {
        this.close(id);
      }, 3000);
    }
  }

  close(id: string) {
    this.snackbars.update((snackbars: Snackbar[]) => {
      return snackbars.filter((snackbar) => snackbar.id !== id);
    });
  }
}
