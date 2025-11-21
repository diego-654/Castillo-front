import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Host,
  Input,
  Optional,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { parseNumber } from '@core/functions/parse-number';
import { validatorsErrors } from '@core/validators/validator-errors';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';

@Component({
  selector: 'app-input-number',
  standalone: true,
  imports: [CommonModule, FormsModule, SvgIconComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent implements ControlValueAccessor {
  @ViewChild('inputElement') inputElement?: ElementRef<HTMLInputElement>;

  label = input<string>();
  value = input<number | null>();
  formControlName = input<string | null>(null);
  formControl = input<FormControl<number | null> | null>(null);
  placeholder = input<string>('');
  errors = input<{ [key: string]: string }>({});
  disabled: boolean = false;
  name = input<string>('');
  readonly = input<boolean>(false);
  autofocus = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');
  leftIcon = input<string>();
  rightIcon = input<string>();

  textInputValue: string = '';

  @Input()
  numberFormat?: {
    maxIntegerDigits?: number;
    maxDecimalDigits?: number;
    padDecimals?: boolean;
  };

  internalValue = signal<number | null>(null);

  //** Outputs */
  blur = output<void>();
  valueChange = output<number | null>();
  debounceChange = output<void>();

  private debounceTimer?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      const newValue = changes['value'].currentValue;

      if (newValue != this.internalValue()) {
        this.setearTextInputValue(newValue);
        this.internalValue.set(newValue);
      }
    }

    if (changes['validarNumber']) {
      this.setearTextInputValue(this.internalValue());
    }
  }

  ngOnDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }

  ngAfterViewInit() {
    if (this.autofocus()) {
      setTimeout(() => this.inputElement?.nativeElement.focus(), 0);
    }
  }

  constructor(
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  // Function to call when the value changes
  onChange: Function = () => {};

  // Function to call when the input is touched
  onTouched: Function = () => {};

  get control(): FormControl<number | null> {
    if (this.formControl()) {
      return this.formControl()!;
    }

    if (this.formControlName()) {
      return this.controlContainer?.control?.get(
        this.formControlName()!
      ) as FormControl<number>;
    }

    return this.controlContainer?.control as FormControl<number>;
  }

  writeValue(value: number | null): void {
    //se ejecuta cada vez que se hace setea o se hace patch en el form
    this.internalValue.set(value);
    this.setearTextInputValue(value);
  }

  setearTextInputValue(value: number | null) {
    // console.log('setearTextInputValue', value);
    if (value != null) {
      const newValue = this.formatearNumero(value.toString());
      this.textInputValue = newValue;
    } else {
      this.textInputValue = value ?? '';
    }

    // console.log({ internalValue: this.internalValue });
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // console.log({ value });
    this.emitirCambios(value);

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.debounceChange.emit();
    }, 500);
  }

  emitirCambios(valueText: string) {
    const oldValue: string = this.textInputValue;

    if (parseNumber(valueText) !== parseNumber(oldValue)) {
      this.internalValue.set(parseNumber(valueText));
      this.onChange(parseNumber(valueText));
      this.valueChange.emit(parseNumber(valueText));
    }

    this.textInputValue = valueText;
  }

  keyPressed(event: KeyboardEvent) {
    // console.log('type', this.type());
    const input = this.inputElement?.nativeElement;
    if (!input) return;
    let value = input.value;

    const cursorPos = input.selectionStart ?? value.length; // Posición del cursor

    const key = event.key;

    // esto es para permitir el ctrl+c y el ctrl+v
    if (event.ctrlKey || event.metaKey) {
      return;
    }

    // Permitir el signo '-' solo al inicio y que no se repita
    if (key === '-') {
      if (cursorPos === 0 && !value.includes('-')) {
        return;
      } else {
        event.preventDefault();
        return;
      }
    }

    //No permitir tecla espacio
    if (key === ' ') {
      event.preventDefault();
      return;
    }

    // Permitir teclas de control (Backspace, Supr, flechas, Tab, etc.)
    if (
      ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)
    ) {
      return;
    }

    // Validar solo números y punto decimal
    if (!/[\d.]/.test(key)) {
      event.preventDefault();
      return;
    }

    // Comprobar si ya existe un punto decimal en el valor actual
    const hasDot = value.includes('.');
    const dotIndex = value.indexOf('.');

    // Si ya hay un punto y se intenta ingresar otro, prevenirlo
    if (key === '.' && hasDot) {
      event.preventDefault();
      return;
    }

    if (this.maxDecimales !== undefined || this.maxEnteros !== undefined) {
      // Si maxdecimales es 0, no permitir el punto decimal
      if (this.maxDecimales === 0 && key === '.') {
        event.preventDefault();
        return;
      }

      // Separar enteros y decimales
      let [enteros, decimales] = value.replace('-', '').split('.');
      enteros = enteros ?? '';
      decimales = decimales ?? '';

      // Restricción de enteros (Solo si el cursor está en los enteros o no hay punto aún)
      // if (
      //   this.maxEnteros !== undefined &&
      //   (!hasDot || cursorPos <= dotIndex) &&
      //   enteros.length >= this.maxEnteros &&
      //   key !== '.'
      // ) {
      //   event.preventDefault();
      //   return;
      // }

      if (this.maxEnteros !== undefined && (!hasDot || cursorPos <= dotIndex)) {
        const selectionStart = input.selectionStart ?? 0;
        const selectionEnd = input.selectionEnd ?? 0;

        const selectedLength = selectionEnd - selectionStart;
        const remainingEnteros = enteros.length - selectedLength;

        if (remainingEnteros >= this.maxEnteros && key !== '.') {
          event.preventDefault();
          return;
        }
      }

      // Restricción de decimales (Solo si el cursor está después del punto)
      if (
        this.maxDecimales !== undefined &&
        hasDot &&
        cursorPos > dotIndex &&
        decimales.length >= this.maxDecimales
      ) {
        event.preventDefault();
        return;
      }
    }
  }

  handleBlur(): void {
    if (this.readonly() || this.disabled) return;

    let value: string = this.textInputValue;

    const newValue = this.formatearNumero(value);

    this.emitirCambios(newValue);

    this.onTouched();

    this.blur.emit();
  }

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  handleWrapperClick() {
    if (this.readonly() || this.disabled) return;

    this.inputElement?.nativeElement.focus();
  }

  public focus() {
    if (this.inputElement) {
      const nativeInput = this.inputElement.nativeElement;
      nativeInput.focus();
      nativeInput.select(); // Selecciona todo el texto
    }
  }

  get maxDecimales() {
    return this.numberFormat?.maxDecimalDigits;
  }

  get completeDecimals() {
    return this.numberFormat?.padDecimals ?? false;
  }

  get maxEnteros() {
    return this.numberFormat?.maxIntegerDigits;
  }

  formatearNumero(value: string): string {
    // console.log('formatearNumero', value);
    let newValue: string = value;

    newValue = newValue.toString();
    newValue = newValue.replace(/\s/g, '');

    //valirdar que el newValue no sea un número
    if (isNaN(parseFloat(newValue))) {
      newValue = '';
    }

    if (newValue !== '') {
      if (newValue === '-') {
        newValue = '';
      } else if (newValue === '.') {
        newValue = '';
      } else {
        const partes = newValue.split('.');

        let parteEntera = partes[0] || '';
        let parteDecimal = partes[1] || '';

        // console.log({ parteEntera, parteDecimal });
        if (
          this.maxDecimales != undefined &&
          this.maxDecimales > 0 &&
          this.completeDecimals
        ) {
          //agregar 0s a la parte decimal hasta completar maxDecimales
          parteDecimal = parteDecimal
            .padEnd(this.maxDecimales, '0')
            .slice(0, this.maxDecimales);
        }

        // si no hay decimales, no agregar punto
        const dot = parteDecimal.length > 0 ? '.' : '';

        newValue = `${parteEntera}${dot}${parteDecimal}`;
      }
    }
    return newValue;
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
