import { Component, ElementRef, input } from '@angular/core';

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
})
export class OptionComponent {
  value = input<any>();

  constructor(private el: ElementRef) {}

  getLabel(): string {
    return this.el.nativeElement.textContent.trim();
  }
}
