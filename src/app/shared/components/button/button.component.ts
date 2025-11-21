import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  text = input<string>('');
  type = input<'primary' | 'secondary' | 'tertiary' | 'text'>('primary');
  size = input<'small' | 'medium' | 'large'>('medium');

  leftIcon = input<string | null>(null);
  iconRight = input<string | null>(null);
}
