import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading = signal(false);

  constructor() {}

  showLoader() {
    this.isLoading.set(true);
  }

  dismissLoader() {
    this.isLoading.set(false);
  }
}
