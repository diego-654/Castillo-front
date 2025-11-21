import { Component, Input, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  value = input<string>('');
  valueChange = output<string>();
  @Input() placeholder: string = '';

  handleInput(event: any) {
    this.valueChange.emit(event.target.value);
  }
}
