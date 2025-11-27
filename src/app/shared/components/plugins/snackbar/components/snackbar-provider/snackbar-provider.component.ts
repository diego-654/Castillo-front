import { Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-snackbar-provider',
  standalone: true,
  imports: [SnackbarComponent],
  templateUrl: './snackbar-provider.component.html',
  styleUrl: './snackbar-provider.component.scss',
})
export class SnackbarProviderComponent {
  snackbarService = inject(SnackbarService);
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Mueve el snackbars-container al body
    this.renderer.appendChild(document.body, this.el.nativeElement);
  }
}
