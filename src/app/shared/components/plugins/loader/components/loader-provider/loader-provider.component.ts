import { Component, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-provider',
  standalone: true,
  imports: [],
  templateUrl: './loader-provider.component.html',
  styleUrl: './loader-provider.component.scss',
})
export class LoaderProviderComponent {
  loaderService = inject(LoaderService);
}
