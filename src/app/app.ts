import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderProviderComponent } from '@shared/components/plugins/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderProviderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('castillo');
}
