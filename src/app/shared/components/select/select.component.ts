import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ContentChildren,
  ElementRef,
  forwardRef,
  Host,
  Input,
  input,
  Optional,
  output,
  QueryList,
  signal,
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
import { ChipComponent } from '@shared/components/chip/chip.component';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { isEqual } from 'lodash';
import { NgClickOutsideDirective } from 'ng-click-outside2';
import { Subscription } from 'rxjs';
import { OptionComponent } from './components/option/option.component';
export { OptionComponent };

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    ChipComponent,
    FormsModule,
    NgClickOutsideDirective,
    SvgIconComponent,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T> implements ControlValueAccessor {
  @ContentChildren(OptionComponent)
  optionComponents!: QueryList<OptionComponent>;
  options = signal<Option[]>([]);
  placeholder = input<string>('');
  multi = input<boolean>(false);
  label = input<string | null>(null);
  errors = input<{ [key: string]: string }>({});

  formControlName = input<string | null>(null);
  formControl = input<FormControl<T | null> | null>(null);

  readonly = input<boolean>(false);
  size = input<'small' | 'medium' | 'large'>('medium');

  @Input() value: any = null;
  disabled = signal<boolean>(false);
  valueChange = output<any>();

  searcheable = input<boolean>(false);

  @ViewChild('overlayTemplate') overlayTemplate?: TemplateRef<any>;
  @ViewChild('trigger', { static: false }) trigger!: ElementRef;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  overlayRef: OverlayRef | undefined;

  resizeObserver: ResizeObserver | null = null;

  private subscription!: Subscription;
  public Array = Array;

  get innerErrors(): { [key: string]: string } {
    return {
      required: 'Este campo es requerido',
      email: 'Debe ser formato email',
      ...this.errors(),
    };
  }

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer
  ) {}

  onChange: any = () => {};
  onTouched: any = () => {};

  get control(): FormControl<T | null> {
    if (this.formControl()) {
      return this.formControl()!;
    }

    if (this.formControlName()) {
      return this.controlContainer?.control?.get(
        this.formControlName()!
      ) as FormControl<T | null>;
    }

    return this.controlContainer?.control as FormControl<T | null>;
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

  ngAfterContentInit(): void {
    this.updateOptions();

    // Escuchar cambios en las opciones
    this.subscription = this.optionComponents.changes.subscribe(() => {
      this.updateOptions();
    });
  }

  ngAfterViewInit() {
    this.observeInputChanges();
  }

  updateOptions(): void {
    this.options.set(
      this.optionComponents.map((option) => ({
        label: option.getLabel(),
        value: option.value(),
      }))
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.resizeObserver?.disconnect();
    window.removeEventListener('scroll', this.updateOverlayPosition, true);
    this.overlayRef?.dispose();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  optionSelected() {
    const option = this.options().find((o) => {
      if (typeof this.value === 'object' && typeof o.value === 'object') {
        return isEqual(o.value, this.value);
      }

      return o.value == this.value;
    });
    return option;
  }

  optionsSelected() {
    if (Array.isArray(this.value)) {
      return this.options().filter((o) => {
        return (this.value as T[]).includes(o.value);
      });
    }
    return [];
  }

  handleSelectOption(option: Option) {
    if (this.multi() && Array.isArray(this.value)) {
      const currentValue: T[] = this.value;
      const newValue = currentValue.includes(option.value)
        ? currentValue.filter((v: any) => v !== option.value)
        : [...currentValue, option.value];
      this.value = newValue;
      this.onChange(newValue);
      this.valueChange.emit(newValue);
    } else {
      if (this.value !== option.value) {
        this.value = option.value;
        this.onChange(option.value);
        this.valueChange.emit(option.value);
      }

      this.closeOverlay();
      this.tab2?.nativeElement.focus();
    }
  }

  removeOption(option: Option) {
    if (Array.isArray(this.value)) {
      const newValue = this.value.filter((v: any) => v !== option.value);
      this.value = newValue;
      this.onChange(newValue);
      this.valueChange.emit(newValue);
    }
  }

  openOverlay() {
    if (!this.trigger) return;

    if (this.disabled() || this.readonly()) return;
    if (this.overlayRef && this.overlayRef!.hasAttached()) return;

    this.hoveredItem.set(null);

    // 🔹 Crear el overlay
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        backdropClass: 'cdk-overlay-transparent-backdrop',
        positionStrategy: this.overlay
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
          .withPush(true),
      });
    }

    this.searchValue.set('');
    // 🔹 Focus al input de búsqueda
    setTimeout(() => {
      this.tab3?.nativeElement.focus();
      this.searchInput?.nativeElement.focus();
    }, 100);

    // 🔹 Añadir el overlay al DOM
    if (!this.overlayRef.hasAttached() && this.overlayTemplate) {
      this.overlayRef.attach(
        new TemplatePortal(this.overlayTemplate, this.viewContainerRef)
      );
    }

    // 🔹 Actualizar posición del overlay
    this.updateOverlayPosition();
  }

  closeOverlay() {
    if (!this.overlayRef || !this.overlayRef.hasAttached()) return;

    this.overlayRef.detach();
    this.onTouched();
  }

  observeInputChanges() {
    const inputElement = this.trigger.nativeElement;

    // 🔹 Escuchar cambios de tamaño con ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      this.updateOverlayPosition();
    });
    this.resizeObserver.observe(inputElement);

    // 🔹 Escuchar scroll en la ventana
    window.addEventListener('scroll', this.updateOverlayPosition, true);
  }

  updateOverlayPosition = () => {
    if (this.overlayRef) {
      const inputWidth = this.trigger.nativeElement.offsetWidth;
      this.overlayRef.updatePosition();
      this.overlayRef.overlayElement.style.width = `${inputWidth}px`;
    }
  };

  get isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  searchValue = signal<string>('');

  filteredOptions = computed(() => {
    const searchValue = this.searchValue();
    if (searchValue) {
      return this.options().filter((o) => {
        return o.label.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    return this.options();
  });

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      console.log('tab');
      // Si tab2 tiene focus
      if (!this.tab2?.nativeElement.matches(':focus')) {
        event.preventDefault();
        this.closeOverlay();
        this.tab2?.nativeElement.focus();
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.hoverNextItem();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.hoverPreviousItem();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.hoveredItem()) {
        this.handleSelectOption(this.hoveredItem()!);
        this.tab2?.nativeElement.focus();
      }
    }
  }

  @ViewChild('tab2') tab2?: ElementRef<HTMLInputElement>;
  @ViewChild('tab1') tab1?: ElementRef<HTMLInputElement>;
  @ViewChild('tab3') tab3?: ElementRef<HTMLInputElement>;

  public hoveredItem = signal<Option | null>(null);

  public onHoverItem(option: Option | null) {
    this.hoveredItem.set(option);
  }

  private hoverNextItem() {
    // si no hay productos, no se hace hover ningún producto
    if (this.options().length === 0) {
      this.hoveredItem.set(null);
      return;
    }

    let nextIndex = 0;

    if (this.hoveredItem()) {
      const currentIndex = this.options().findIndex((p) => {
        return isEqual(p, this.hoveredItem());
      });
      nextIndex = (currentIndex + 1) % this.options().length;
    }

    this.hoveredItem.set(this.options()[nextIndex]);

    this.scrollToItem(nextIndex);
  }

  private hoverPreviousItem() {
    // si no hay productos, no se hace hover ningún producto
    if (this.options().length === 0) {
      this.hoveredItem.set(null);
      return;
    }

    let nextIndex = 0;
    if (this.hoveredItem()) {
      const currentIndex = this.options().findIndex(
        (p) => p === this.hoveredItem()
      );
      nextIndex =
        (currentIndex - 1 + this.options().length) % this.options().length;
    }

    this.hoveredItem.set(this.options()[nextIndex]);

    this.scrollToItem(nextIndex);
  }

  @ViewChild('scrollContainer')
  private scrollContainer?: ElementRef<HTMLDivElement>;

  // Scrollea el elemento en la posición indicada
  private scrollToItem(index: number) {
    const container = this.scrollContainer?.nativeElement;
    const rows: NodeListOf<HTMLElement> | undefined =
      container?.querySelectorAll('.option');

    if (rows && rows[index]) {
      const row = rows[index];
      const offsetTop = row.offsetTop - 56;

      container?.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }
}

export interface Option {
  label: string;
  value: any;
}
