import { Component, EventEmitter, input, Output } from '@angular/core';
import { Snackbar } from '../../interfaces/snackbar.interface';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss',
})
export class SnackbarComponent {
  @Output() close = new EventEmitter<void>();

  snackbar = input.required<Snackbar>();

  onClose() {
    this.close.emit();
  }
}
