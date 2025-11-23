import { CommonModule } from '@angular/common';
import {
  Component,
  forwardRef,
  Host,
  input,
  Optional,
  output,
  signal,
  SimpleChanges,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { validatorsErrors } from '@core/validators/validator-errors';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
})
export class TextAreaComponent implements ControlValueAccessor {
  label = input<string>();
  value = input<string>();
  placeholder = input<string>('');
  formControlName = input<string | null>(null);
  formControl = input<FormControl<string> | null>(null);
  errors = input<{ [key: string]: string }>({});
  disabled = signal<boolean>(false);
  name = input<string>('');
  readonly = input<boolean>(false);
  rows = input<number>(4);

  type = input<'primary' | 'secondary'>('primary');

  maxLength = input<number>();
  internalValue = signal<string>('');

  //** Outputs */
  blur = output<void>();
  valueChange = output<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      const newValue = changes['value'].currentValue;

      if (newValue != this.internalValue()) {
        this.internalValue.set(newValue);
      }
    }
  }

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) { }

  // Function to call when the value changes
  onChange: Function = () => { };

  // Function to call when the input is touched
  onTouched: Function = () => { };

  get control(): FormControl<string> {
    if (this.formControl()) {
      return this.formControl()!;
    }

    if (this.formControlName()) {
      return this.controlContainer?.control?.get(
        this.formControlName()!
      ) as FormControl<string>;
    }

    return this.controlContainer?.control as FormControl<string>;
  }

  writeValue(value: string): void {
    //se ejecuta cada vez que se hace setea o se hace patch en el form
    this.internalValue.set(value);
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    this.emitirCambios(value);
  }

  emitirCambios(valueText: string) {
    this.internalValue.set(valueText);
    this.onChange(valueText);
    this.valueChange.emit(valueText);
  }

  handleBlur(): void {
    if (this.readonly() || this.disabled()) return;

    this.onTouched();

    this.blur.emit();
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  get innerErrors(): { [key: string]: string } {
    return { ...validatorsErrors(this.control), ...this.errors() };
  }

  get errorMessage(): string | null {
    const control = this.control;
    if (control && control.touched && control.errors) {
      for (const errorKey of Object.keys(control.errors)) {
        if (this.innerErrors[errorKey]) {
          return this.innerErrors[errorKey];
        }
      }
    }
    return null;
  }
}
