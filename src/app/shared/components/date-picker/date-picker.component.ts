import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  Host,
  input,
  Optional,
  output,
  signal,
  SimpleChanges,
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
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
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TwoDigitPipe } from './pipes/two-digits.pipe';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent,
    FormsModule,
    NgClickOutsideDirective,
    SvgIconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
})
export class DatePickerComponent implements ControlValueAccessor {
  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) { }

  private twoDigitPipe = new TwoDigitPipe();

  @ViewChild('overlayTemplate') overlayTemplate?: TemplateRef<any>;
  @ViewChild('trigger') trigger?: ElementRef;

  valueChange = output<Date | null>();
  value = input<Date | null>(null);
  label = input<string | null>(null);

  resizeObserver: ResizeObserver | null = null;

  overlayRef?: OverlayRef;
  internalValue = signal<Date | null>(null);

  size = input<'small' | 'medium' | 'large'>('medium');
  type = input<'primary' | 'secondary' | 'tertiary'>('primary');

  placeholder = input<string>('Selecciona');

  disabled = signal<boolean>(false);
  readonly = input<boolean>(false);

  formControlName = input<string | null>(null);
  formControl = input<FormControl<Date | null> | null>(null);
  errors = input<{ [key: string]: string }>({});

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && this.value() != this.internalValue()) {
      this.internalValue.set(this.value());
    }
  }

  ngAfterViewInit() {
    this.observeInputChanges();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('scroll', this.updateOverlayPosition, true);
    this.overlayRef?.dispose();
  }

  formatedValue = computed(() => {
    if (!this.internalValue()) return '';
    const day = new Date(this.internalValue()!);
    const month = day.getMonth() + 1;
    const year = day.getFullYear();

    return `${this.twoDigitPipe.transform(
      day.getDate()
    )}/${this.twoDigitPipe.transform(month)}/${year}`;
  });

  handleValueChange(fecha: Date | null) {
    this.internalValue.set(fecha);
    this.onChange(fecha);
    this.valueChange.emit(fecha);
    setTimeout(() => {
      this.closeOverlay();
    });
  }

  openOverlay() {
    if (!this.trigger) return;
    if (this.disabled() || this.readonly()) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger.nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4, // Mueve el overlay arriba
        },
      ])
      .withFlexibleDimensions(false)
      .withGrowAfterOpen(true)
      .withPush(true);

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        positionStrategy,
      });
    }

    if (!this.overlayRef.hasAttached() && this.overlayTemplate) {
      this.overlayRef.attach(
        new TemplatePortal(this.overlayTemplate, this.viewContainerRef)
      );
    }

    this.updateOverlayPosition();
  }

  closeOverlay() {
    this.overlayRef?.detach();
    this.onTouched();
  }

  updateOverlayPosition = () => {
    if (this.overlayRef) {
      const inputWidth = this.trigger?.nativeElement.offsetWidth;
      this.overlayRef.updatePosition();
      this.overlayRef.overlayElement.style.width = `${inputWidth}px`;
    }
  };

  observeInputChanges() {
    const inputElement = this.trigger?.nativeElement;

    // 🔹 Escuchar cambios de tamaño con ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverlayPosition();
    });
    this.resizeObserver.observe(inputElement);

    // 🔹 Escuchar scroll en la ventana
    window.addEventListener('scroll', this.updateOverlayPosition, true);
  }

  handleClickOverlay(event: Event) {
    event.stopPropagation();
  }

  //** ControlValueAccessor */

  writeValue(value: Date | null): void {
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

  onChange: Function = () => { };

  onTouched: Function = () => { };

  get control(): FormControl<Date | null> {
    if (this.formControl()) {
      return this.formControl()!;
    }

    if (this.formControlName()) {
      return this.controlContainer?.control?.get(
        this.formControlName()!
      ) as FormControl<Date | null>;
    }

    return this.controlContainer?.control as FormControl<Date | null>;
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

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }
}
