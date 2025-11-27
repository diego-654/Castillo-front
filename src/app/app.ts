import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderProviderComponent } from '@shared/components/plugins/loader';
import { SnackbarProviderComponent } from '@shared/components/plugins/snackbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderProviderComponent, SnackbarProviderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('castillo');
}
