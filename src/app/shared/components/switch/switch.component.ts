import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent implements ControlValueAccessor {
  public value = input<boolean>(false);
  public label = input<string | null>(null);

  public valueChange = output<boolean>();
  public readonly = input<boolean>(false);
  public disabled = signal<boolean>(false);

  public internalValue = signal<boolean>(false);

  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      if (this.value() != this.internalValue()) {
        this.internalValue.set(this.value());
      }
    }
  }

  writeValue(value: boolean): void {
    this.internalValue.set(value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleClick(): void {
    if (this.disabled() || this.readonly()) return;

    this.internalValue.set(!this.internalValue());
    this.onChange(this.internalValue());
    this.valueChange.emit(this.internalValue());

    this.onTouched();
  }
}
