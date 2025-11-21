import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  text = input.required<string>();
  onClose = output<void>();
  color = input<'primary' | 'green' | 'blue' | 'red' | 'gray'>('primary');
  closeEnabled = input<boolean>(false);

  handleClose(event: Event) {
    event.stopPropagation();

    this.onClose.emit();
  }
}
